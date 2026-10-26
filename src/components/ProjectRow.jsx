import ProjectArt from "./ProjectArt";

export default function ProjectRow({ project }) {
  return (
    <article className="project">
      <ProjectArt kind={project.art} src={project.imageUrl} alt={project.name} />
      <div className="project__body">
        <h2>{project.name}</h2>
        <p className="lede">{project.text}</p>
        <p className="project__practice"><strong>The team practices:</strong> {project.practice}</p>
        <ul className="tags">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}