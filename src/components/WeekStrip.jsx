import { useContent } from "../context/Contentcontext";
import useInView from "../hooks/useInView";

export default function WeekStrip() {
  const { weeks } = useContent();
  const [ref, seen] = useInView(0.25);
  return (
    <ol ref={ref} className={"weekstrip" + (seen ? " is-in" : "")}>
      {weeks.map((w, i) => (
        <li key={w.id} style={{ "--c": w.color, "--i": i }}>
          <span className="weekstrip__days">Week {w.id} · {w.days}</span>
          <h3>{w.name}</h3>
          <p>{w.objective}</p>
          <p className="weekstrip__goal"><strong>Goal:</strong> {w.goal}</p>
        </li>
      ))}
    </ol>
  );
}