import { useState } from "react";
import ImageField from "./ImageField";
import AdminIcon from "./Adminicon";

function Row({ field, wide = false, children }) {
  return (
    <div className={"field" + (wide ? " field--wide" : "")}>
      <label className="field__label" htmlFor={`f-${field.name}`}>
        {field.label}
        {field.required && <span className="field__req" aria-hidden="true"> *</span>}
      </label>
      {children}
      {field.help && <small className="field__help">{field.help}</small>}
    </div>
  );
}

function SubInput({ sub, value, onChange }) {
  const common = { value: value ?? "", onChange: (e) => onChange(e.target.value), "aria-label": sub.label };
  if (sub.type === "textarea") return <textarea rows={2} {...common} />;
  if (sub.type === "number") return <input type="number" {...common} />;
  return <input type="text" {...common} />;
}

function RowTools({ index, count, onMove, onRemove }) {
  return (
    <div className="rowtools">
      <button type="button" className="iconbtn iconbtn--sm" aria-label="Move up" disabled={index === 0} onClick={() => onMove(index, -1)}>
        <AdminIcon name="up" size={16} />
      </button>
      <button type="button" className="iconbtn iconbtn--sm" aria-label="Move down" disabled={index === count - 1} onClick={() => onMove(index, 1)}>
        <AdminIcon name="down" size={16} />
      </button>
      <button type="button" className="iconbtn iconbtn--sm iconbtn--danger" aria-label="Remove" onClick={() => onRemove(index)}>
        <AdminIcon name="trash" size={16} />
      </button>
    </div>
  );
}

const move = (list, i, dir) => {
  const next = [...list];
  const j = i + dir;
  [next[i], next[j]] = [next[j], next[i]];
  return next;
};

function ListEditor({ field, value, set }) {
  const [focusIndex, setFocusIndex] = useState(-1);
  const items = value || [];
  return (
    <div className="field field--wide">
      <span className="field__label">{field.label}</span>
      <div className="listeditor">
        {items.map((item, i) => (
          <div className="listrow" key={i}>
            <span className="listrow__n">{i + 1}</span>
            <input
              type="text"
              aria-label={`${field.label} ${i + 1}`}
              value={item}
              autoFocus={i === focusIndex}
              onChange={(e) => set(items.map((v, j) => (j === i ? e.target.value : v)))}
            />
            <RowTools index={i} count={items.length} onMove={(idx, d) => set(move(items, idx, d))} onRemove={(idx) => set(items.filter((_, j) => j !== idx))} />
          </div>
        ))}
        {items.length === 0 && <p className="listeditor__empty">Nothing added yet.</p>}
        <button type="button" className="abtn abtn--ghost abtn--sm" onClick={() => { setFocusIndex(items.length); set([...items, ""]); }}>
          <AdminIcon name="plus" size={16} /> Add item
        </button>
      </div>
      {field.help && <small className="field__help">{field.help}</small>}
    </div>
  );
}

function ObjectsEditor({ field, value, set }) {
  const items = value || [];
  return (
    <div className="field field--wide">
      <span className="field__label">{field.label}</span>
      <div className="listeditor">
        {items.map((item, i) => (
          <div className="objcard" key={i}>
            <div className="objcard__head">
              <span className="listrow__n">{i + 1}</span>
              <RowTools index={i} count={items.length} onMove={(idx, d) => set(move(items, idx, d))} onRemove={(idx) => set(items.filter((_, j) => j !== idx))} />
            </div>
            <div className="objcard__fields">
              {field.subfields.map((sub) => (
                <label key={sub.name} className={sub.type === "textarea" ? "is-wide" : ""}>
                  <span>{sub.label}</span>
                  <SubInput sub={sub} value={item[sub.name]} onChange={(v) => set(items.map((o, j) => (j === i ? { ...o, [sub.name]: v } : o)))} />
                </label>
              ))}
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="listeditor__empty">Nothing added yet.</p>}
        <button type="button" className="abtn abtn--ghost abtn--sm" onClick={() => set([...items, {}])}>
          <AdminIcon name="plus" size={16} /> Add row
        </button>
      </div>
      {field.help && <small className="field__help">{field.help}</small>}
    </div>
  );
}

export default function FieldControl({ field, values, onChange }) {
  const value = values[field.name];
  const set = (v) => onChange(field.name, v);
  const id = `f-${field.name}`;

  switch (field.type) {
    case "textarea":
      return (
        <Row field={field} wide>
          <textarea id={id} rows={4} value={value ?? ""} onChange={(e) => set(e.target.value)} />
        </Row>
      );

    case "number":
      return (
        <Row field={field}>
          <input id={id} type="number" step="any" value={value ?? ""} onChange={(e) => set(e.target.value)} />
        </Row>
      );

    case "select":
      return (
        <Row field={field}>
          <select id={id} value={String(value ?? "")} onChange={(e) => set(e.target.value)}>
            {field.options.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Row>
      );

    case "color":
      return (
        <Row field={field}>
          <div className="colorrow">
            <input type="color" aria-label={`${field.label} picker`} value={/^#[0-9a-f]{6}$/i.test(value) ? value : "#000000"} onChange={(e) => set(e.target.value)} />
            <input id={id} type="text" value={value ?? ""} maxLength={7} onChange={(e) => set(e.target.value)} />
          </div>
        </Row>
      );

    case "list":
      return <ListEditor field={field} value={value} set={set} />;

    case "objects":
      return <ObjectsEditor field={field} value={value} set={set} />;

    case "image":
      return <ImageField field={field} values={values} onChange={onChange} />;

    default:
      return (
        <Row field={field} wide>
          <input id={id} type="text" value={value ?? ""} onChange={(e) => set(e.target.value)} />
        </Row>
      );
  }
}