import PageHeader from "../components/PageHeader";
import CertLadder from "../components/CertLadder";
import ReadinessCheck from "../components/ReadinessCheck";
import CTA from "../components/CTA";
import { useContent } from "../context/Contentcontext";

function Pie({ fill }) {
  const r = 11;
  const c = 2 * Math.PI * r;
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
      <circle cx="17" cy="17" r="15" fill="none" stroke="var(--ink)" strokeWidth="2" />
      <circle
        cx="17"
        cy="17"
        r={r}
        fill="none"
        stroke="var(--ink)"
        strokeWidth={2 * r}
        strokeDasharray={`${fill * c} ${c}`}
        transform="rotate(-90 17 17)"
      />
    </svg>
  );
}

export default function Certification() {
  const { statuses } = useContent();
  return (
    <>
      <PageHeader
        title="Official Anthropic certification"
        lede="Prepare for Claude certifications with guided learning, practice tests and project-based training. The taller the block, the higher the level."
      />

      <section className="section section--top">
        <div className="container">
          <CertLadder />
        </div>
      </section>

      <section className="section section--tint">
        <div className="container split">
          <div>
            <div className="section-head section-head--tight">
              <h2>Track each person separately</h2>
              <p>One person can finish training long before they are ready to sit the exam. We keep three statuses so the team dashboard stays honest.</p>
            </div>
            <ul className="statuslist">
              {statuses.map((s) => (
                <li key={s.id}>
                  <Pie fill={s.fill} />
                  <div>
                    <strong>{s.name}</strong>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="section-head section-head--tight">
              <h2>Try the readiness check</h2>
              <p>We book an exam only when all three signals are in place.</p>
            </div>
            <ReadinessCheck />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <div className="section-head section-head--tight">
            <h2>How we prepare in week four</h2>
          </div>
          <ol className="steps">
            <li><strong>Check access.</strong> Verify Partner Academy access and company email domain registration.</li>
            <li><strong>Practice.</strong> Run mock assessments based on the official exam guide for each credential.</li>
            <li><strong>Decide.</strong> Review practice scores, project demos and code reviews for each person.</li>
            <li><strong>Book.</strong> Schedule paid exams only for people who are ready.</li>
          </ol>
        </div>
      </section>

      <CTA />
    </>
  );
}