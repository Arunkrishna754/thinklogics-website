import { useContent } from "../context/Contentcontext";
import useInView from "../hooks/useInView";

export default function CertLadder() {
  const { certs } = useContent();
  const [ref, seen] = useInView(0.3);
  return (
    <div ref={ref} className={"ladder" + (seen ? " is-in" : "")}>
      {certs.map((c, i) => (
        <article key={c.id} className={"ladder__step ladder__step--" + c.level} style={{ "--lvl": c.level, "--d": i }}>
          <div className="ladder__block">
            <span className="ladder__fill" aria-hidden="true" />
            <div className="ladder__content">
              <span className="ladder__tier">{c.tier}</span>
              <h3>{c.name}</h3>
              <p className="ladder__note">{c.note}</p>
              <p className="ladder__price">
                <strong>${c.price}</strong> USD exam fee
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}