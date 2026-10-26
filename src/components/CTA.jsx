import Button from "./Button";
import { useContent } from "../context/Contentcontext";

export default function CTA({ title, text }) {
  const { settings } = useContent();
  return (
    <section className="section section--flush">
      <div className="container">
        <div className="cta">
          <div>
            <h2>{title || settings.ctaTitle}</h2>
            <p>{text || settings.ctaText}</p>
          </div>
          <div className="cta__actions">
            <Button to="/start" variant="light">Start the program</Button>
            <Button to="/academy" variant="ghost-light">View the 30-day plan</Button>
          </div>
        </div>
      </div>
    </section>
  );
}