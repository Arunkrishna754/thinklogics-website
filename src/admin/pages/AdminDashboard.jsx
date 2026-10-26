import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/Client";
import { useAuth } from "../AuthContext";
import { resourceList } from "../adminSchemas";
import { meta, colorForDay } from "../Adminmeta";
import AdminIcon from "../components/Adminicon";

function CountUp({ value }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (typeof value !== "number") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = reduce ? 1 : Math.min((now - start) / 700, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return typeof value === "number" ? n : value;
}

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    let alive = true;
    const entries = [...resourceList.map((r) => [r.key, r.endpoint]), ["enrollments", "/admin/enrollments"]];
    Promise.all(
      entries.map(async ([key, url]) => {
        try {
          const res = await api.get(url);
          return [key, res.data];
        } catch {
          return [key, null];
        }
      })
    ).then((pairs) => alive && setData(Object.fromEntries(pairs)));
    return () => {
      alive = false;
    };
  }, []);

  const count = (key) => (data ? (data[key] ? data[key].length : "?") : null);
  const recent = data?.enrollments?.slice(0, 5) ?? [];
  const firstName = (user?.name || "").split(" ")[0];

  return (
    <>
      <section className="welcome">
        <div className="welcome__text">
          <h1>{greeting()}{firstName ? `, ${firstName}` : ""}</h1>
          <p>Edit anything on the public site. Changes show up for visitors within about 30 seconds.</p>
          <div className="welcome__actions">
            <Link to="/admin/settings" className="abtn abtn--light"><AdminIcon name="settings" size={17} /> Site settings</Link>
            <a href="/" target="_blank" rel="noreferrer" className="abtn abtn--glass"><AdminIcon name="external" size={17} /> View live site</a>
          </div>
        </div>
        <div className="daystrip" aria-hidden="true">
          {Array.from({ length: 30 }, (_, i) => (
            <i key={i} style={{ "--c": colorForDay(i + 1), "--i": i }} />
          ))}
        </div>
      </section>

      <h2 className="sectiontitle">Content</h2>
      <div className="statgrid">
        {resourceList.map((r, i) => (
          <Link key={r.key} to={`/admin/${r.key}`} className="stat" style={{ "--i": i, "--c": meta[r.key].color }}>
            <span className="stat__icon"><AdminIcon name={meta[r.key].icon} size={20} /></span>
            <strong className="stat__n">{count(r.key) === null ? <i className="skeleton skeleton--num" /> : <CountUp value={count(r.key)} />}</strong>
            <span className="stat__label">{r.label}</span>
          </Link>
        ))}
      </div>

      <div className="dashcols">
        <section className="card">
          <div className="card__head">
            <h2>Recent enrollments</h2>
            <Link to="/admin/enrollments" className="link">View all</Link>
          </div>
          {!data ? (
            <div className="card__body">
              {[0, 1, 2].map((i) => <div key={i} className="skeleton skeleton--row" />)}
            </div>
          ) : recent.length === 0 ? (
            <p className="empty">No submissions yet. They appear here when someone fills in the Start form.</p>
          ) : (
            <ul className="recent">
              {recent.map((x, i) => (
                <li key={x._id} style={{ "--i": i }}>
                  <span className="avatar" aria-hidden="true">{x.name?.[0]?.toUpperCase()}</span>
                  <div className="recent__who">
                    <strong>{x.name}</strong>
                    <span>{x.email}</span>
                  </div>
                  <span className={`badge badge--${x.status}`}>{x.status}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card">
          <div className="card__head"><h2>Quick links</h2></div>
          <ul className="quick">
            <li><Link to="/admin/projects"><AdminIcon name="image" size={18} /> Add a project image</Link></li>
            <li><Link to="/admin/weeks"><AdminIcon name="calendar" size={18} /> Edit the weekly plan</Link></li>
            <li><Link to="/admin/certifications"><AdminIcon name="award" size={18} /> Update exam fees</Link></li>
            <li><Link to="/admin/faqs"><AdminIcon name="help" size={18} /> Answer a question</Link></li>
          </ul>
        </section>
      </div>
    </>
  );
}