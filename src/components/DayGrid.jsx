import { useState } from "react";
import { useContent } from "../context/Contentcontext";

const NEUTRAL = { id: 0, color: "#4a5688", on: "#ffffff" };

export default function DayGrid() {
  const { weeks, settings } = useContent();
  const [focus, setFocus] = useState(null);

  const total = weeks.length ? Math.max(...weeks.map((w) => w.range[1])) : 30;
  const milestones = Object.fromEntries((settings.milestones || []).map((m) => [m.day, m.label]));
  const days = Array.from({ length: total }, (_, i) => i + 1);
  const weekOf = (day) => weeks.find((w) => day >= w.range[0] && day <= w.range[1]) || NEUTRAL;

  return (
    <div className="daygrid">
      <p className="daygrid__title">Your first {total} days</p>

      <ol className="daygrid__cells" aria-label={`${total}-day program calendar`}>
        {days.map((d) => {
          const w = weekOf(d);
          const m = milestones[d];
          const cls = "cell" + (m ? " cell--milestone" : "") + (focus && focus !== w.id ? " cell--dim" : "");
          return (
            <li
              key={d}
              className={cls}
              style={{ "--c": w.color, "--on": w.on, "--i": d - 1 }}
              title={m ? `Day ${d}: ${m}` : `Day ${d}`}
            >
              {d}
            </li>
          );
        })}
      </ol>

      <ul className="daygrid__legend">
        {weeks.map((w) => (
          <li key={w.id}>
            <button
              type="button"
              onMouseEnter={() => setFocus(w.id)}
              onMouseLeave={() => setFocus(null)}
              onFocus={() => setFocus(w.id)}
              onBlur={() => setFocus(null)}
            >
              <i style={{ background: w.color }} />
              Week {w.id}
            </button>
          </li>
        ))}
      </ul>

      <p className="daygrid__note" aria-live="polite">
        {focus ? weeks.find((w) => w.id === focus)?.goal : "Ringed days are milestones. Hover a week to see its goal."}
      </p>
    </div>
  );
}