import PageHeader from "../components/PageHeader";
import ProjectRow from "../components/ProjectRow";
import CTA from "../components/CTA";
import { useContent } from "../context/Contentcontext";

export default function Projects() {
  const { projects } = useContent();
  return (
    <>
      <PageHeader
        title="Featured projects"
        lede="Learn by building real solutions. Each project is a pilot your team can take on in week three."
      />
      <section className="section section--top">
        <div className="container projectlist">
          {projects.map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
        </div>
      </section>
      <CTA title="Have a project in mind?" text="Bring your own repository or idea and use it as the pilot." />
    </>
  );
}