export default function PageHeader({ title, lede, children }) {
  return (
    <section className="pagehead">
      <div className="container">
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        <span className="rule" aria-hidden="true" />
        {children}
      </div>
    </section>
  );
}