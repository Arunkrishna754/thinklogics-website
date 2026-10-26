import { useCallback, useEffect, useMemo, useState } from "react";
import api, { errorMessage } from "../../api/Client";
import AdminIcon from "../components/Adminicon";
import ConfirmDialog from "../components/Confirmdialog";
import { useToast } from "../components/Toast";

const STATUSES = ["new", "contacted", "enrolled", "closed"];

export default function AdminEnrollments() {
  const toast = useToast();
  const [items, setItems] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [pending, setPending] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoadError("");
    try {
      const { data } = await api.get("/admin/enrollments");
      setItems(data);
    } catch (err) {
      setLoadError(errorMessage(err));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const counts = useMemo(() => {
    const c = { all: items?.length ?? 0 };
    STATUSES.forEach((s) => (c[s] = items?.filter((x) => x.status === s).length ?? 0));
    return c;
  }, [items]);

  const visible = useMemo(() => {
    if (!items) return null;
    const q = query.trim().toLowerCase();
    return items.filter(
      (x) =>
        (filter === "all" || x.status === filter) &&
        (!q || [x.name, x.email, x.role, x.size].some((v) => String(v || "").toLowerCase().includes(q)))
    );
  }, [items, filter, query]);

  async function setStatus(item, status) {
    const before = item.status;
    setItems((list) => list.map((x) => (x._id === item._id ? { ...x, status } : x)));
    try {
      await api.patch(`/admin/enrollments/${item._id}`, { status });
      toast.success(`Marked as ${status}`);
    } catch (err) {
      setItems((list) => list.map((x) => (x._id === item._id ? { ...x, status: before } : x)));
      toast.error(errorMessage(err));
    }
  }

  async function confirmDelete() {
    setDeleting(true);
    try {
      await api.delete(`/admin/enrollments/${pending._id}`);
      setItems((list) => list.filter((x) => x._id !== pending._id));
      toast.success("Enrollment deleted");
      setPending(null);
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="view">
      <header className="adminhead adminhead--row">
        <div className="adminhead__title">
          <span className="titlechip" style={{ "--c": "var(--w3)" }}><AdminIcon name="inbox" size={22} /></span>
          <div>
            <h1>Enrollments</h1>
            <p>People who filled in the Start form on the website.</p>
          </div>
        </div>
      </header>

      <div className="toolbar">
        <div className="tabs" role="tablist" aria-label="Filter by status">
          {["all", ...STATUSES].map((s) => (
            <button key={s} type="button" role="tab" aria-selected={filter === s} className={"tab" + (filter === s ? " is-active" : "")} onClick={() => setFilter(s)}>
              {s === "all" ? "All" : s[0].toUpperCase() + s.slice(1)}
              <span className="tab__n">{counts[s]}</span>
            </button>
          ))}
        </div>
        <label className="search">
          <AdminIcon name="search" size={17} />
          <input type="search" placeholder="Search name or email" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search enrollments" />
        </label>
      </div>

      {loadError && (
        <div className="aerror aerror--row" role="alert">
          <span>{loadError}</span>
          <button type="button" className="abtn abtn--ghost abtn--sm" onClick={load}>Try again</button>
        </div>
      )}

      <div className="panel panel--table">
        {!visible ? (
          <div className="skeletons">{[0, 1, 2, 3].map((i) => <div key={i} className="skeleton skeleton--row" />)}</div>
        ) : visible.length === 0 ? (
          <div className="emptystate">
            <span className="emptystate__icon"><AdminIcon name="inbox" size={26} /></span>
            <strong>{items.length === 0 ? "No submissions yet" : "No matches"}</strong>
            <p>{items.length === 0 ? "New enrollments appear here when someone submits the Start form." : "Try another status or search."}</p>
          </div>
        ) : (
          <table className="atable atable--compact">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Team size</th>
                <th scope="col">Received</th>
                <th scope="col">Status</th>
                <th scope="col"><span className="sr">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((x, i) => (
                <tr key={x._id} style={{ "--i": Math.min(i, 12) }}>
                  <td>
                    <div className="cellmain">
                      <span className="avatar" aria-hidden="true">{x.name?.[0]?.toUpperCase()}</span>
                      <span>{x.name}</span>
                    </div>
                  </td>
                  <td><a className="link" href={`mailto:${x.email}`}>{x.email}</a></td>
                  <td>{x.role}</td>
                  <td>{x.size}</td>
                  <td>{new Date(x.createdAt).toLocaleDateString()}</td>
                  <td>
                    <select className={`statusselect statusselect--${x.status}`} value={x.status} aria-label={`Status for ${x.name}`} onChange={(e) => setStatus(x, e.target.value)}>
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className="atable__actions">
                      <button type="button" className="iconbtn iconbtn--danger" aria-label={`Delete enrollment from ${x.name}`} title="Delete" onClick={() => setPending(x)}>
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
        title="Delete this enrollment?"
        message={pending ? `The submission from ${pending.name} will be removed permanently.` : ""}
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => !deleting && setPending(null)}
      />
    </div>
  );
}