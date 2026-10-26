import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import api, { errorMessage } from "../../api/Client";
import { resources } from "../adminSchemas";
import { meta } from "../Adminmeta";
import SchemaForm from "../components/SchemaForm";
import ConfirmDialog from "../components/Confirmdialog";
import AdminIcon from "../components/Adminicon";
import { useToast } from "../components/Toast";

const show = (v) => (Array.isArray(v) ? v.join(", ") : v ?? "");

function ResourceView({ resourceKey, config }) {
  const toast = useToast();
  const [items, setItems] = useState(null);
  const [editing, setEditing] = useState(null); // null = list, {} = new, item = edit
  const [loadError, setLoadError] = useState("");
  const [query, setQuery] = useState("");
  const [pending, setPending] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoadError("");
    try {
      const { data } = await api.get(config.endpoint);
      setItems(data);
    } catch (err) {
      setLoadError(errorMessage(err));
    }
  }, [config.endpoint]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    if (!items) return null;
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => config.columns.some(([key]) => String(show(item[key])).toLowerCase().includes(q)));
  }, [items, query, config.columns]);

  async function save(payload) {
    if (editing._id) await api.put(`${config.endpoint}/${editing._id}`, payload);
    else await api.post(config.endpoint, payload);
    setEditing(null);
    toast.success(`Saved ${config.singular}`);
    await load();
  }

  async function confirmDelete() {
    setDeleting(true);
    try {
      await api.delete(`${config.endpoint}/${pending._id}`);
      toast.success(`Deleted ${config.singular}`);
      setPending(null);
      await load();
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setDeleting(false);
    }
  }

  const color = meta[resourceKey]?.color;

  if (editing) {
    return (
      <div className="view">
        <button type="button" className="backlink" onClick={() => setEditing(null)}>
          <AdminIcon name="back" size={16} /> {config.label}
        </button>
        <header className="adminhead">
          <h1>{editing._id ? `Edit ${config.singular}` : `New ${config.singular}`}</h1>
        </header>
        <div className="panel panel--form">
          <SchemaForm
            fields={config.fields}
            initial={editing}
            onSubmit={save}
            onCancel={() => setEditing(null)}
            submitLabel={editing._id ? "Save changes" : `Create ${config.singular}`}
          />
        </div>
      </div>
    );
  }

  const firstKey = config.columns[0][0];

  return (
    <div className="view">
      <header className="adminhead adminhead--row">
        <div className="adminhead__title">
          <span className="titlechip" style={{ "--c": color }}><AdminIcon name={meta[resourceKey]?.icon || "dashboard"} size={22} /></span>
          <div>
            <h1>{config.label}</h1>
            <p>{items ? `${items.length} ${items.length === 1 ? "item" : "items"}` : "Loading…"}</p>
          </div>
        </div>
        <button type="button" className="abtn abtn--primary" onClick={() => setEditing({})}>
          <AdminIcon name="plus" size={17} /> Add {config.singular}
        </button>
      </header>

      <div className="toolbar">
        <label className="search">
          <AdminIcon name="search" size={17} />
          <input type="search" placeholder={`Search ${config.label.toLowerCase()}`} value={query} onChange={(e) => setQuery(e.target.value)} aria-label={`Search ${config.label}`} />
        </label>
      </div>

      {loadError && (
        <div className="aerror aerror--row" role="alert">
          <span>{loadError}</span>
          <button type="button" className="abtn abtn--ghost abtn--sm" onClick={load}>Try again</button>
        </div>
      )}

      <div className="panel panel--table">
        {!filtered ? (
          <div className="skeletons">{[0, 1, 2, 3, 4].map((i) => <div key={i} className="skeleton skeleton--row" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="emptystate">
            <span className="emptystate__icon"><AdminIcon name={query ? "search" : "plus"} size={26} /></span>
            <strong>{query ? "No matches" : `No ${config.label.toLowerCase()} yet`}</strong>
            <p>{query ? "Try a different search." : `Add the first ${config.singular} to see it on the site.`}</p>
            {!query && (
              <button type="button" className="abtn abtn--primary" onClick={() => setEditing({})}>
                <AdminIcon name="plus" size={17} /> Add {config.singular}
              </button>
            )}
          </div>
        ) : (
          <table className="atable">
            <thead>
              <tr>
                {config.columns.map(([, label]) => (
                  <th key={label} scope="col">{label}</th>
                ))}
                <th scope="col"><span className="sr">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={item._id} style={{ "--i": Math.min(i, 12) }}>
                  {config.columns.map(([key]) => (
                    <td key={key}>
                      {key === firstKey ? (
                        <div className="cellmain">
                          {item.imageUrl ? <img className="thumb" src={item.imageUrl} alt="" loading="lazy" /> : item.color ? <i className="swatch" style={{ background: item.color }} /> : null}
                          <span>{show(item[key])}</span>
                        </div>
                      ) : (
                        show(item[key])
                      )}
                    </td>
                  ))}
                  <td>
                    <div className="atable__actions">
                      <button type="button" className="iconbtn" aria-label={`Edit ${show(item[firstKey])}`} title="Edit" onClick={() => setEditing(item)}>
                        <AdminIcon name="edit" size={17} />
                      </button>
                      <button type="button" className="iconbtn iconbtn--danger" aria-label={`Delete ${show(item[firstKey])}`} title="Delete" onClick={() => setPending(item)}>
                        <AdminIcon name="trash" size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ConfirmDialog
        open={!!pending}
        title={`Delete this ${config.singular}?`}
        message="It will be removed from the site straight away. This cannot be undone."
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => !deleting && setPending(null)}
      />
    </div>
  );
}

export default function AdminResource() {
  const { resource } = useParams();
  const config = resources[resource];
  if (!config) return <p className="aerror">Unknown section.</p>;
  return <ResourceView key={resource} resourceKey={resource} config={config} />;
}