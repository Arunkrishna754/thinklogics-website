import { useState } from "react";

const signals = [
  { id: "score", label: "Practice score meets the target" },
  { id: "demo", label: "Project demo passed" },
  { id: "review", label: "Code review passed" },
];

export default function ReadinessCheck() {
  const [on, setOn] = useState({});
  const missing = signals.filter((s) => !on[s.id]);
  const ready = missing.length === 0;

  return (
    <div className={"readiness" + (ready ? " is-ready" : "")}>
      <fieldset>
        <legend>Is this person ready for the exam?</legend>
        {signals.map((s) => (
          <label key={s.id} className={on[s.id] ? "is-checked" : ""}>
            <input
              type="checkbox"
              checked={!!on[s.id]}
              onChange={() => setOn((o) => ({ ...o, [s.id]: !o[s.id] }))}
            />
            <span className="box" />
            <span className="text">{s.label}</span>
          </label>
        ))}
      </fieldset>
      <p className="readiness__result" aria-live="polite">
        {ready
          ? "Ready. Book the paid exam and track this person as Exam pending."
          : `Not ready yet. Still needed: ${missing.map((m) => m.label.toLowerCase()).join(", ")}.`}
      </p>
    </div>
  );
}