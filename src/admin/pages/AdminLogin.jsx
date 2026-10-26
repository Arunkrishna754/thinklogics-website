import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { errorMessage } from "../../api/Client";
import { colorForDay } from "../Adminmeta";
import AdminIcon from "../components/Adminicon";
import Logo from "../../components/Logo";

export default function AdminLogin() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);
  const [shake, setShake] = useState(false);

  if (user) return <Navigate to="/admin" replace />;

  async function submit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    try {
      await login(form.get("email"), form.get("password"));
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
      setShake(true);
    }
  }

  return (
    <div className="loginpage">
      <section className="loginhero" aria-hidden="true">
        <Logo light />
        <div className="loginhero__body">
          <h2>Run the academy from one place</h2>
          <p>Update weeks, learning paths, certifications and projects, and follow every enrollment.</p>
          <div className="logingrid">
            {Array.from({ length: 30 }, (_, i) => (
              <i key={i} style={{ "--c": colorForDay(i + 1), "--i": i }} />
            ))}
          </div>
        </div>
        <small>Thinklogics AI Engineering Academy</small>
      </section>

      <section className="loginpanel">
        <form className={"logincard" + (shake ? " is-shake" : "")} onSubmit={submit} onAnimationEnd={() => setShake(false)}>
          <div className="logincard__brand"><Logo /></div>
          <div>
            <h1>Welcome back</h1>
            <p className="logincard__sub">Sign in to manage the site.</p>
          </div>

          <label className="loginfield">
            <span>Email</span>
            <div className="inputwrap">
              <AdminIcon name="mail" size={18} />
              <input name="email" type="email" required autoComplete="username" placeholder="you@company.com" />
            </div>
          </label>

          <label className="loginfield">
            <span>Password</span>
            <div className="inputwrap">
              <input name="password" type={show ? "text" : "password"} required autoComplete="current-password" placeholder="Your password" />
              <button type="button" className="inputwrap__toggle" aria-label={show ? "Hide password" : "Show password"} aria-pressed={show} onClick={() => setShow((s) => !s)}>
                <AdminIcon name={show ? "eyeOff" : "eye"} size={18} />
              </button>
            </div>
          </label>

          {error && <p className="aerror" role="alert">{error}</p>}

          <button className="abtn abtn--primary abtn--lg" type="submit" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </section>
    </div>
  );
}