import { useState } from "react";
import PageHeader from "../components/PageHeader";
import api, { errorMessage } from "../api/Client";
import { useContent } from "../context/Contentcontext";

export default function Start() {
  const { weeks } = useContent();
  const [sent, setSent] = useState(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setSending(true);
    setError("");
    try {
      await api.post("/enrollments", data);
      setSent(data);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Start the program"
        lede="Tell us about your team. We will use it to plan week one: who the sponsor is, who owns the program, and where everyone starts."
      />

      <section className="section section--top">
        <div className="container split split--form">
          <div>
            <h2 className="h3">What happens in week one</h2>
            <ul className="ticks">
              {(weeks[0]?.tasks ?? []).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="formcard">
            {sent ? (
              <div className="success" role="status">
                <h2 className="h3">Thanks, {sent.name}</h2>
                <p>We have your details for a team of {sent.size}. We will email {sent.email} to plan week one.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <label>
                  Your name
                  <input name="name" type="text" required maxLength={120} autoComplete="name" />
                </label>
                <label>
                  Work email
                  <input name="email" type="email" required maxLength={200} autoComplete="email" />
                </label>
                <label>
                  Your role
                  <select name="role" defaultValue="Program owner">
                    <option>CEO or sponsor</option>
                    <option>Program owner</option>
                    <option>Engineering lead</option>
                    <option>Team member</option>
                  </select>
                </label>
                <label>
                  Team size
                  <select name="size" defaultValue="25 to 50">
                    <option>Under 25</option>
                    <option>25 to 50</option>
                    <option>Over 50</option>
                  </select>
                </label>
                {error && <p className="form-error" role="alert">{error}</p>}
                <button type="submit" className="btn btn--primary" disabled={sending}>
                  {sending ? "Sending…" : "Send details"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}