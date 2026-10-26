import { useState } from "react";
import { useContent } from "../context/Contentcontext";
import Icon from "./Icon";

const C = 2 * Math.PI * 34;

export default function WeekTabs() {
  const { weeks } = useContent();
  const [active, setActive] = useState(weeks[0]?.id);
  const [done, setDone] = useState({});
  const week = weeks.find((w) => w.id === active) || weeks[0];
  if (!week) return null;

  const total = weeks.reduce((n, w) => n + w.tasks.length, 0);
  const finished = Object.values(done).filter(Boolean).length;
  const pct = Math.round((finished / total) * 100);
  const weekCount = (w) => w.tasks.filter((_, i) => done[`${w.id}-${i}`]).length;
  const toggle = (key) => setDone((d) => ({ ...d, [key]: !d[key] }));

  return (
    <div className="weektabs">
      <div className="weektabs__top">
        <div className="weektabs__tabs" role="tablist" aria-label="Program weeks">
          {weeks.map((w) => (
            <button
              key={w.id}
              type="button"
              role="tab"
              id={`week-tab-${w.id}`}
              aria-selected={w.id === active}
              aria-controls="week-panel"
              className={"weektab" + (w.id === active ? " is-active" : "")}
              style={{ "--c": w.color }}
              onClick={() => setActive(w.id)}
            >
              <span className="weektab__days">{w.days}</span>
              <strong>Week {w.id}: {w.name}</strong>
              <span className="weektab__count">{weekCount(w)} of {w.tasks.length} done</span>
            </button>
          ))}
        </div>

        <div className="ring" aria-label={`Team progress ${pct} percent`}>
          <svg width="84" height="84" viewBox="0 0 84 84" aria-hidden="true">
            <circle cx="42" cy="42" r="34" className="ring__track" />
            <circle
              cx="42"
              cy="42"
              r="34"
              className="ring__bar"
              strokeDasharray={`${(pct / 100) * C} ${C}`}
              transform="rotate(-90 42 42)"
            />
          </svg>
          <span className="ring__pct">{pct}%</span>
        </div>
      </div>

      <div
        id="week-panel"
        role="tabpanel"
        aria-labelledby={`week-tab-${week.id}`}
        key={week.id}
        className="weekpanel"
        style={{ "--c": week.color }}
      >
        <div className="weekpanel__main">
          <h2>{week.name}</h2>
          <p className="lede">{week.objective}</p>

          <div className="goalbox">
            <strong>End-of-week goal</strong>
            <p>{week.goal}</p>
          </div>

          {week.tracks.length > 0 && (
            <div className="tracks">
              <h3>{week.tracksTitle || "What each role does"}</h3>
              <dl>
                {week.tracks.map((t) => (
                  <div key={t.role}>
                    <dt>{t.role}</dt>
                    <dd>{t.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {week.rules.length > 0 && (
            <div className="rules">
              <h3>{week.rulesTitle || "Required on every pilot project"}</h3>
              <ul>
                {week.rules.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="checklist">
          <h3>Steps for {week.days.toLowerCase()}</h3>
          <p className="checklist__hint">Tick steps to preview how your team tracks progress. Nothing is saved.</p>
          <ul>
            {week.tasks.map((task, i) => {
              const key = `${week.id}-${i}`;
              const checked = !!done[key];
              return (
                <li key={key}>
                  <label className={checked ? "is-checked" : ""}>
                    <input type="checkbox" checked={checked} onChange={() => toggle(key)} />
                    <span className="box"><Icon name="check" /></span>
                    <span className="text">{task}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
}