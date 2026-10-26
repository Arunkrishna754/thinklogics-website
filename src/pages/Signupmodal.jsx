import { useEffect, useRef, useState } from "react";

const RAW_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");
const API_BASE = RAW_BASE.endsWith("/api") ? RAW_BASE : `${RAW_BASE}/api`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NAVY = "#101a3d";
const BLUE = "#1f6bff";

const RESUME_REQUIRED = true; // set to false to make the resume optional
const MAX_RESUME_MB = 5;
const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function validate({ name, email, password }, resume) {
  const e = {};
  if (name.trim().length < 2) e.name = "Enter your name (at least 2 characters).";
  if (!EMAIL_RE.test(email.trim())) e.email = "Enter a valid email address.";
  if (password.length < 8) e.password = "Password must be at least 8 characters.";
  else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) e.password = "Use at least one letter and one number.";
  if (!resume) {
    if (RESUME_REQUIRED) e.resume = "Upload your resume (PDF or Word).";
  } else if (!RESUME_TYPES.includes(resume.type)) {
    e.resume = "Resume must be a PDF or Word file.";
  } else if (resume.size > MAX_RESUME_MB * 1024 * 1024) {
    e.resume = `Resume must be under ${MAX_RESUME_MB} MB.`;
  }
  return e;
}

const EyeIcon = ({ off }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {off ? (
      <>
        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a18.5 18.5 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    ) : (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

export default function SignupModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [created, setCreated] = useState(null);
  const [focused, setFocused] = useState("");
  const nameRef = useRef(null);

  // reset every time the popup opens, focus the first field
  useEffect(() => {
    if (!open) return;
    setForm({ name: "", email: "", password: "" });
    setResume(null);
    setErrors({});
    setFormError("");
    setCreated(null);
    setShowPassword(false);
    setLoading(false);
    const t = setTimeout(() => nameRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  // Esc closes, page behind does not scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((x) => ({ ...x, [key]: undefined }));
    setFormError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate(form, resume);
    if (Object.keys(found).length) return setErrors(found);

    setLoading(true);
    setFormError("");
    try {
      const body = new FormData();
      body.append("name", form.name.trim());
      body.append("email", form.email.trim());
      body.append("password", form.password);
      if (resume) body.append("resume", resume);

      // No Content-Type header: the browser sets the multipart boundary.
      const res = await fetch(`${API_BASE}/learners/signup`, { method: "POST", body });
      const data = await res.json().catch(() => ({}));

      if (res.status === 201) return setCreated(data.learner || { name: form.name.trim() });
      if (data.errors) setErrors(data.errors);
      setFormError(res.status === 409 || res.status === 400 ? "" : data.message || "Something went wrong. Please try again.");
    } catch {
      setFormError("Could not reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const st = {
    overlay: {
      position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16, background: "rgba(5,11,36,0.68)", backdropFilter: "blur(4px)", overflowY: "auto",
    },
    card: {
      position: "relative", width: "100%", maxWidth: 420, background: "#fff", color: NAVY, borderRadius: 18,
      padding: "28px 26px 24px", boxShadow: "0 24px 60px rgba(0,0,0,0.35)", boxSizing: "border-box",
    },
    close: {
      position: "absolute", top: 12, right: 12, width: 34, height: 34, borderRadius: "50%", border: "none",
      background: "#f0f3fa", color: "#4a5578", fontSize: 20, lineHeight: 1, cursor: "pointer",
    },
    title: { margin: "0 0 6px", fontSize: "1.45rem", fontWeight: 800 },
    sub: { margin: "0 0 20px", color: "#4a5578", fontSize: "0.95rem", lineHeight: 1.45 },
    label: { display: "block", fontSize: "0.85rem", fontWeight: 600, margin: "0 0 6px" },
    field: { marginBottom: 14 },
    input: (name) => ({
      width: "100%", boxSizing: "border-box", height: 46, padding: name === "password" ? "0 46px 0 14px" : "0 14px",
      fontSize: "1rem", fontFamily: "inherit", color: NAVY, background: "#fff", borderRadius: 10, outline: "none",
      border: `1.5px solid ${errors[name] ? "#dc2626" : focused === name ? BLUE : "#cfd6e6"}`,
      boxShadow: focused === name ? "0 0 0 3px rgba(31,107,255,0.15)" : "none",
    }),
    eye: {
      position: "absolute", right: 6, top: 5, width: 36, height: 36, border: "none", background: "transparent",
      color: "#4a5578", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8,
    },
    err: { margin: "6px 0 0", color: "#dc2626", fontSize: "0.82rem" },
    submit: {
      width: "100%", height: 48, marginTop: 6, border: "none", borderRadius: 12, background: BLUE, color: "#fff",
      fontSize: "1rem", fontWeight: 700, fontFamily: "inherit", cursor: loading ? "not-allowed" : "pointer",
      opacity: loading ? 0.75 : 1,
    },
    banner: { margin: "0 0 12px", padding: "10px 12px", borderRadius: 10, background: "#fef2f2", color: "#b91c1c", fontSize: "0.88rem" },
    hint: { margin: "14px 0 0", fontSize: "0.78rem", color: "#6b7691", textAlign: "center" },
  };

  return (
    <div style={st.overlay} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div style={st.card} role="dialog" aria-modal="true" aria-labelledby="signup-title">
        <button type="button" style={st.close} onClick={onClose} aria-label="Close sign up form">×</button>

        {created ? (
          <div style={{ textAlign: "center", padding: "10px 0 4px" }}>
            <div style={{ fontSize: 44, lineHeight: 1 }}>🎉</div>
            <h2 id="signup-title" style={{ ...st.title, marginTop: 12 }}>You’re in, {created.name?.split(" ")[0]}!</h2>
            <p style={st.sub}>Your account has been created. Let’s start your AI journey.</p>
            <button type="button" style={st.submit} onClick={onSuccess}>Continue →</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <h2 id="signup-title" style={st.title}>Start your AI journey</h2>
            <p style={st.sub}>Create your account to get started. It only takes a minute.</p>

            {formError && <p style={st.banner} role="alert">{formError}</p>}

            <div style={st.field}>
              <label htmlFor="su-name" style={st.label}>Full name</label>
              <input id="su-name" ref={nameRef} type="text" autoComplete="name" value={form.name} onChange={set("name")}
                onFocus={() => setFocused("name")} onBlur={() => setFocused("")} style={st.input("name")}
                aria-invalid={!!errors.name} placeholder="Your name" />
              {errors.name && <p style={st.err} role="alert">{errors.name}</p>}
            </div>

            <div style={st.field}>
              <label htmlFor="su-email" style={st.label}>Email</label>
              <input id="su-email" type="email" autoComplete="email" value={form.email} onChange={set("email")}
                onFocus={() => setFocused("email")} onBlur={() => setFocused("")} style={st.input("email")}
                aria-invalid={!!errors.email} placeholder="you@example.com" />
              {errors.email && <p style={st.err} role="alert">{errors.email}</p>}
            </div>

            <div style={st.field}>
              <label htmlFor="su-password" style={st.label}>Password</label>
              <div style={{ position: "relative" }}>
                <input id="su-password" type={showPassword ? "text" : "password"} autoComplete="new-password"
                  value={form.password} onChange={set("password")} onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")} style={st.input("password")} aria-invalid={!!errors.password}
                  placeholder="At least 8 characters" />
                <button type="button" style={st.eye} onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}>
                  <EyeIcon off={showPassword} />
                </button>
              </div>
              {errors.password && <p style={st.err} role="alert">{errors.password}</p>}
            </div>

            <div style={st.field}>
              <label htmlFor="su-resume" style={st.label}>
                Resume {RESUME_REQUIRED ? "" : "(optional)"}
              </label>
              <input
                id="su-resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  setResume(e.target.files?.[0] || null);
                  if (errors.resume) setErrors((x) => ({ ...x, resume: undefined }));
                }}
                style={{ ...st.input("resume"), height: "auto", padding: "10px 14px" }}
                aria-invalid={!!errors.resume}
              />
              {errors.resume && <p style={st.err} role="alert">{errors.resume}</p>}
            </div>

            <button type="submit" style={st.submit} disabled={loading}>
              {loading ? "Creating account…" : "Create account"}
            </button>
            <p style={st.hint}>Use at least 8 characters with a letter and a number.</p>
          </form>
        )}
      </div>
    </div>
  );
}