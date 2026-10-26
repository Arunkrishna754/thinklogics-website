import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PathExplorer from "../components/PathExplorer";
import WeekStrip from "../components/WeekStrip";
import CertLadder from "../components/CertLadder";
import ProjectArt from "../components/ProjectArt";
import CTA from "../components/CTA";
import { useContent } from "../context/Contentcontext";
import { useSignup } from "../context/Signupcontext";

/* images cropped from the design mockup -> put the folder at src/assets/home/ */
import heroArt from "../assets/home/hero-art.png";
import hl1 from "../assets/home/highlight-1.png";
import hl2 from "../assets/home/highlight-2.png";
import hl3 from "../assets/home/highlight-3.png";
import hl4 from "../assets/home/highlight-4.png";
import st1 from "../assets/home/stat-1.png";
import st2 from "../assets/home/stat-2.png";
import st3 from "../assets/home/stat-3.png";
import st4 from "../assets/home/stat-4.png";
import pl1 from "../assets/home/pillar-1.png";
import pl2 from "../assets/home/pillar-2.png";
import pl3 from "../assets/home/pillar-3.png";
import pl4 from "../assets/home/pillar-4.png";

const HIGHLIGHT_ICONS = [hl1, hl2, hl3, hl4];
const STAT_ICONS = [st1, st2, st3, st4];

const DEFAULTS = {
  heroEyebrow: "Thinklogics AI Engineering Academy",
  heroHeadline: "From Software Engineers to",
  heroHighlight: "AI Product Engineers.",
  heroTagline: "Learn. Build. Innovate. Deliver. Lead.",
  heroText:
    "A hands-on program to transform engineers into industry-ready AI Engineers who build real-world GenAI and Agentic AI solutions for global customers.",
  ctaPrimary: "Start Your AI Journey",
  highlights: [
    { label: "Hands-on Learning" },
    { label: "Real-world Projects" },
    { label: "Global Certifications" },
    { label: "Industry-ready AI Engineers" },
  ],
  stats: [
    { value: "25–50", label: "Team Members per Cohort" },
    { value: "90 Days", label: "Structured Program" },
    { value: "Real Products", label: "Build & Deploy" },
    { value: "Global Opportunities", label: "Work on US & Enterprise Projects" },
  ],
};

const PILLARS = [
  { title: "Learn AI Engineering", text: "Master LLMs, RAG, Agentic AI and modern AI tools.", to: "/paths", img: pl1, bg: "#f1f6ff", accent: "#1d4ed8" },
  { title: "Build Real Projects", text: "Work on industry-relevant AI products like eOpSys AI Copilot.", to: "/projects", img: pl2, bg: "#f7f2ff", accent: "#6d28d9" },
  { title: "Get Certified", text: "Prepare for globally recognized certifications.", to: "/certification", img: pl3, bg: "#effbf3", accent: "#15803d" },
  { title: "Grow Your Career", text: "Become an industry-ready AI Engineer and innovator.", to: "/academy", img: pl4, bg: "#fff6ee", accent: "#c2410c" },
];

const NAVY = "#050b24";
const BLUE = "#1f6bff";
const PAGE_BG = "#f7f8fc";

/* "mobile" <= 640px, "tablet" <= 1024px, otherwise "desktop" */
function getBreakpoint() {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w <= 640) return "mobile";
  if (w <= 1024) return "tablet";
  return "desktop";
}

function useBreakpoint() {
  const [bp, setBp] = useState(getBreakpoint);
  useEffect(() => {
    const onResize = () => setBp(getBreakpoint());
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);
  return bp;
}

export default function Home() {
  const { projects, settings } = useContent();
  const { openSignup } = useSignup();
  const bp = useBreakpoint();
  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isDesktop = bp === "desktop";
  const compact = !isDesktop; // hero art becomes a faint background below desktop width
  const gutter = isMobile ? 16 : 24;

  const s = (key) => (settings?.[key] !== undefined && settings[key] !== "" ? settings[key] : DEFAULTS[key]);
  const listOf = (key) => (Array.isArray(settings?.[key]) && settings[key].length ? settings[key] : DEFAULTS[key]);
  const highlights = listOf("highlights");
  const stats = listOf("stats");
  const videoUrl = settings?.videoUrl;
  const artSrc = settings?.heroImageUrl || heroArt; // admin upload wins, else the mockup crop

  const headline = String(s("heroHeadline")).trim();
  const splitTo = /^(.*\S)\s+to$/i.exec(headline); // puts "to" on the 2nd line like the design

  const btnBase = {
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.95rem",
    padding: isMobile ? "13px 18px" : "12px 22px",
    borderRadius: 12,
    textAlign: "center",
    boxSizing: "border-box",
    flex: isMobile ? "1 1 100%" : "0 0 auto",
  };

  const st = {
    hero: {
      position: "relative",
      overflow: "hidden",
      background: `linear-gradient(135deg, ${NAVY} 0%, #091640 60%, #0a1230 100%)`,
      color: "#ffffff",
      minHeight: "auto",
      padding: isMobile ? "28px 0 60px" : isTablet ? "40px 0 64px" : "36px 0 56px",
    },
    art: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      width: compact ? "100%" : "min(620px, 46vw)",
      backgroundImage: `url(${artSrc})`,
      backgroundSize: compact ? "cover" : "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: compact ? "center" : "right center",
      opacity: isMobile ? 0.2 : isTablet ? 0.28 : 1,
      pointerEvents: "none",
      WebkitMaskImage: compact
        ? "none"
        : "linear-gradient(90deg, transparent 0, #000 7%), linear-gradient(180deg, transparent 0, #000 10%)",
      maskImage: compact
        ? "none"
        : "linear-gradient(90deg, transparent 0, #000 7%), linear-gradient(180deg, transparent 0, #000 10%)",
      WebkitMaskComposite: "source-in",
      maskComposite: "intersect",
    },
    inner: { position: "relative", zIndex: 2, maxWidth: 1320, margin: "0 auto", padding: `0 ${gutter}px` },
    copy: { maxWidth: compact ? "100%" : "min(700px, 54vw)" },
    eyebrow: { color: "#4d8dff", fontSize: isMobile ? "0.72rem" : "0.8rem", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", margin: "0 0 10px" },
    h1: {
      fontSize: isMobile ? "clamp(1.7rem, 8vw, 2.1rem)" : isTablet ? "2.6rem" : "clamp(2.2rem, 3.3vw, 2.9rem)",
      lineHeight: 1.12,
      fontWeight: 800,
      margin: "0 0 10px",
      color: "#ffffff",
      letterSpacing: "-0.01em",
    },
    gradientText: {
      background: "linear-gradient(90deg, #3b82f6, #a855f7)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent",
    },
    tagline: { fontSize: isMobile ? "1rem" : "1.2rem", fontWeight: 500, margin: "0 0 10px", color: "#ffffff" },
    text: { fontSize: isMobile ? "0.92rem" : "1rem", lineHeight: 1.5, color: "#e3e9f8", margin: "0 0 18px", maxWidth: 540 },
    actions: { display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20 },
    btnPrimary: { ...btnBase, background: BLUE, color: "#fff", boxShadow: "0 6px 18px rgba(31,107,255,0.4)", border: "none", cursor: "pointer", fontFamily: "inherit" },
    btnGhost: { ...btnBase, border: "1px solid rgba(255,255,255,0.7)", color: "#fff" },
    chipsRow: isMobile
      ? { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }
      : { display: "flex", flexWrap: "wrap", gap: "14px 20px" },
    chip: { display: "flex", alignItems: "center", gap: 8, fontSize: isMobile ? "0.78rem" : "0.82rem", color: "#e6ecff", lineHeight: 1.25 },
    chipImg: { width: isMobile ? 34 : 40, height: isMobile ? 34 : 40, borderRadius: "50%", flexShrink: 0, display: "block" },
    curve: { position: "absolute", left: 0, right: 0, bottom: -1, width: "100%", height: isMobile ? 24 : 32, zIndex: 2, display: "block" },
    statsWrap: { position: "relative", zIndex: 3, maxWidth: 1320, margin: "-16px auto 0", padding: `0 ${gutter}px` },
    statsBar: {
      display: "grid",
      gridTemplateColumns: isDesktop ? "repeat(4, 1fr)" : "repeat(2, 1fr)",
      gap: isDesktop ? 0 : isMobile ? 14 : 18,
      background: "linear-gradient(90deg, #eaf2ff, #f6eeff)",
      borderRadius: 16,
      padding: isDesktop ? "14px 8px" : 16,
      boxShadow: "0 12px 28px rgba(16,26,61,0.10)",
    },
    stat: (i) => ({
      display: "flex", alignItems: "center", gap: 10,
      minWidth: 0,
      padding: isDesktop ? "0 18px" : 0,
      borderLeft: isDesktop && i > 0 ? "1px solid #d5dcf0" : "none",
    }),
    statImg: { width: isMobile ? 32 : 38, height: isMobile ? 32 : 38, objectFit: "contain", flexShrink: 0 },
    statValue: { fontSize: isMobile ? "0.95rem" : "1.1rem", fontWeight: 800, color: "#101a3d", margin: 0, whiteSpace: isDesktop ? "nowrap" : "normal", lineHeight: 1.2 },
    statLabel: { fontSize: isMobile ? "0.74rem" : "0.8rem", color: "#4a5578", margin: "1px 0 0", lineHeight: 1.3 },
    pillars: {
      maxWidth: 1320,
      margin: "16px auto 0",
      padding: `0 ${gutter}px`,
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
      gap: 14,
    },
    pillar: (p) => ({
      display: "flex", gap: 12, alignItems: "flex-start", textDecoration: "none",
      background: p.bg, border: `1px solid ${p.accent}22`, borderRadius: 14, padding: "14px 16px", position: "relative",
    }),
    pillarImg: { width: 44, height: 44, borderRadius: 12, flexShrink: 0, mixBlendMode: "multiply" },
    pillarTitle: (p) => ({ color: p.accent, fontWeight: 700, fontSize: "0.98rem", margin: "0 0 4px" }),
    pillarText: { color: "#4a5578", fontSize: "0.82rem", lineHeight: 1.4, margin: 0, paddingRight: 14 },
    pillarArrow: (p) => ({ position: "absolute", right: 14, bottom: 10, color: p.accent, fontWeight: 700 }),
  };

  return (
    <>
      <section style={st.hero}>
        <div style={st.art} />

        <div style={st.inner}>
          <div style={st.copy}>
            <p style={st.eyebrow}>{s("heroEyebrow")}</p>
            <h1 style={st.h1}>
              {splitTo && isDesktop ? <>{splitTo[1]}<br />to </> : <>{headline} </>}
              <span style={st.gradientText}>{s("heroHighlight")}</span>
            </h1>
            <p style={st.tagline}>{s("heroTagline")}</p>
            <p style={st.text}>{s("heroText")}</p>

            <div style={st.actions}>
              <button type="button" style={st.btnPrimary} onClick={openSignup}>
                {s("ctaPrimary")} →
              </button>
              {videoUrl ? (
                <a href={videoUrl} target="_blank" rel="noreferrer" style={st.btnGhost}>▶ Watch Video</a>
              ) : (
                <Link to="/academy" style={st.btnGhost}>▶ Watch Video</Link>
              )}
            </div>

            <div style={st.chipsRow}>
              {highlights.slice(0, 4).map((h, i) => (
                <div key={h.label} style={st.chip}>
                  <img src={HIGHLIGHT_ICONS[i]} alt="" style={st.chipImg} />
                  <span style={{ maxWidth: isMobile ? "none" : 110 }}>{h.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <svg style={st.curve} viewBox="0 0 1440 50" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 50 L0 24 Q300 50 640 50 L1440 50 Z" fill={PAGE_BG} />
        </svg>
      </section>

      <div style={st.statsWrap}>
        <div style={st.statsBar}>
          {stats.slice(0, 4).map((x, i) => (
            <div key={x.label} style={st.stat(i)}>
              <img src={STAT_ICONS[i]} alt="" style={st.statImg} />
              <div style={{ minWidth: 0 }}>
                <p style={st.statValue}>{x.value}</p>
                <p style={st.statLabel}>{x.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={st.pillars}>
        {PILLARS.map((p) => (
          <Link key={p.title} to={p.to} style={st.pillar(p)}>
            <img src={p.img} alt="" style={st.pillarImg} />
            <div>
              <p style={st.pillarTitle(p)}>{p.title}</p>
              <p style={st.pillarText}>{p.text}</p>
            </div>
            <span style={st.pillarArrow(p)}>→</span>
          </Link>
        ))}
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Pick the path that fits each role</h2>
            <p>Developers, testers, architects and product teams all learn Claude, but not the same way. Choose a role to see what it covers.</p>
          </div>
          <PathExplorer />
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <h2>What happens in 30 days</h2>
            <p>Each week has one job and one goal. Colors stay the same across the whole site, so you can always tell which week you are looking at.</p>
          </div>
          <WeekStrip />
          <p className="more"><Link to="/academy">Open the full 30-day plan</Link></p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Certify the people who are ready</h2>
            <p>The official exams are paid, so we book them only after practice scores, project demos and code reviews say a person is ready.</p>
          </div>
          <CertLadder />
          <p className="more"><Link to="/certification">See how readiness is tracked</Link></p>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <div className="section-head">
            <h2>Learn by building real things</h2>
            <p>Pilot projects come from the kinds of software the team already works on.</p>
          </div>
          <div className="projectgrid">
            {projects.map((p) => (
              <article key={p.id} className="projectcard">
                <ProjectArt kind={p.art} src={p.imageUrl} alt={p.name} />
                <h3>{p.name}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
          <p className="more"><Link to="/projects">See all projects</Link></p>
        </div>
      </section>

      <CTA />
    </>
  );
}