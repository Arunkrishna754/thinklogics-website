import PageHeader from "../components/PageHeader";
import PathExplorer from "../components/PathExplorer";
import CTA from "../components/CTA";
import { useContent } from "../context/Contentcontext";

export default function Paths() {
  const { roleMatrix } = useContent();
  return (
    <>
      <PageHeader
        title="Learning paths for every role"
        lede="Six paths cover the whole team. Everyone starts with Claude fundamentals, then follows the path that matches their work."
      />

      <section className="section section--top">
        <div className="container">
          <PathExplorer />
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <h2>Who learns what, and what they build</h2>
            <p>Training happens in week two. The pilot project in week three puts it to work.</p>
          </div>
          <div className="tablewrap">
            <table className="matrix">
              <thead>
                <tr>
                  <th scope="col">Role</th>
                  <th scope="col">Week 2: what they learn</th>
                  <th scope="col">Week 3: what they build</th>
                </tr>
              </thead>
              <tbody>
                {roleMatrix.map((r) => (
                  <tr key={r.id}>
                    <th scope="row">{r.role}</th>
                    <td>{r.learn}</td>
                    <td>{r.build}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}