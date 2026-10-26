import { useState } from "react";
import { useContent } from "../context/Contentcontext";
import Icon from "./Icon";

export default function PathExplorer() {
  const { paths } = useContent();
  const [active, setActive] = useState(paths[0]?.id);
  const current = paths.find((p) => p.id === active) || paths[0];
  if (!current) return null;

  return (
    <div className="explorer">
      <div className="explorer__list" role="tablist" aria-label="Learning paths" aria-orientation="vertical">
        {paths.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            id={`tab-${p.id}`}
            aria-selected={p.id === current.id}
            aria-controls="path-panel"
            className={"explorer__tab" + (p.id === current.id ? " is-active" : "")}
            onClick={() => setActive(p.id)}
          >
            <span className="explorer__icon"><Icon name={p.icon} /></span>
            <span className="explorer__label">
              <strong>{p.name}</strong>
              <small>{p.blurb}</small>
            </span>
          </button>
        ))}
      </div>

      <div id="path-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`} key={current.id} className="explorer__panel">
        <h3>{current.name}</h3>
        <p className="explorer__blurb">{current.blurb}</p>
        <div className="explorer__cols">
          <div>
            <h4>You will practice</h4>
            <ul className="ticks">
              {current.practice.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Week 2: training</h4>
            <p>{current.week2}</p>
            <h4>Week 3: build</h4>
            <p>{current.week3}</p>
          </div>
        </div>
      </div>
    </div>
  );
}