import PageHeader from "../components/PageHeader";
import CTA from "../components/CTA";
import { useContent } from "../context/Contentcontext";

export default function About() {
  const { principles, benefits, faqs } = useContent();
  return (
    <>
      <PageHeader
        title="About the academy"
        lede="Thinklogics turns a team of developers, testers, analysts and architects into people who can build with Claude, safely and with proof of skill."
      />

      <section className="section section--top">
        <div className="container">
          <div className="section-head">
            <h2>How we run the program</h2>
          </div>
          <div className="principles">
            {principles.map((p) => (
              <div key={p.id}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <h2>What your company gets</h2>
          </div>
          <dl className="benefits">
            {benefits.map((b) => (
              <div key={b.id}>
                <dt>{b.title}</dt>
                <dd>{b.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <div className="section-head section-head--tight">
            <h2>Questions teams ask</h2>
          </div>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.id}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}