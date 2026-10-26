import { useState } from "react";
import FieldControl from "./FieldControl";
import { errorMessage } from "../../api/Client";

function withDefaults(fields, initial = {}) {
  const values = {};
  for (const f of fields) {
    if (f.type === "list" || f.type === "objects") {
      values[f.name] = Array.isArray(initial[f.name]) ? initial[f.name] : [];
    } else if (f.type === "image") {
      values[f.name] = initial[f.name] ?? "";
      values[f.keyName] = initial[f.keyName] ?? "";
    } else {
      values[f.name] = initial[f.name] ?? "";
    }
  }
  return values;
}

// Turns form state into the JSON the API expects.
function toPayload(fields, values) {
  const out = {};
  const num = (v) => (v === "" || v === null || v === undefined ? undefined : Number(v));

  for (const f of fields) {
    const v = values[f.name];
    if (f.type === "number" || (f.type === "select" && f.numeric)) {
      const n = num(v);
      if (n !== undefined) out[f.name] = n;
    } else if (f.type === "list") {
      out[f.name] = v.map((s) => s.trim()).filter(Boolean);
    } else if (f.type === "objects") {
      out[f.name] = v
        .map((row) =>
          Object.fromEntries(
            f.subfields.map((s) => [s.name, s.type === "number" ? num(row[s.name]) : (row[s.name] ?? "").toString().trim()])
          )
        )
        .filter((row) => Object.values(row).some((x) => x !== "" && x !== undefined));
    } else if (f.type === "image") {
      out[f.name] = v;
      out[f.keyName] = values[f.keyName];
    } else {
      out[f.name] = typeof v === "string" ? v.trim() : v;
    }
  }
  return out;
}

export default function SchemaForm({ fields, initial, onSubmit, onCancel, submitLabel = "Save" }) {
  const [initialValues] = useState(() => withDefaults(fields, initial));
  const [values, setValues] = useState(initialValues);
  const dirty = JSON.stringify(values) !== JSON.stringify(initialValues);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const change = (name, value) => setValues((v) => ({ ...v, [name]: value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSubmit(toPayload(fields, values));
    } catch (err) {
      setError(errorMessage(err));
      setSaving(false);
    }
  }

  return (
    <form className="schemaform" onSubmit={handleSubmit}>
      <div className="schemaform__grid">
        {fields.map((f) => (
          <FieldControl key={f.name} field={f} values={values} onChange={change} />
        ))}
      </div>
      {error && <p className="aerror" role="alert">{error}</p>}
      <div className="actionbar">
        <span className={"actionbar__state" + (dirty ? " is-dirty" : "")} aria-live="polite">
          {dirty ? "Unsaved changes" : "No changes yet"}
        </span>
        <div className="actionbar__buttons">
          {onCancel && (
            <button type="button" className="abtn abtn--ghost" onClick={onCancel} disabled={saving}>
              Cancel
            </button>
          )}
          <button type="submit" className="abtn abtn--primary" disabled={saving}>
            {saving ? "Saving…" : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}