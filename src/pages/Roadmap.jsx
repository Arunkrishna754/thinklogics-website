import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/*  Theme (same palette as Home.jsx)                                   */
/* ------------------------------------------------------------------ */
const NAVY = "#050b24";
const BLUE = "#1f6bff";
const PAGE_BG = "#f7f8fc";
const INK = "#101a3d";
const MUTED = "#4a5578";
const LINE = "#e3e8f5";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */
const GLANCE = [
  { icon: "🗓️", label: "Duration", value: "12 weeks" },
  { icon: "⏳", label: "Learning commitment", value: "120–180 hours" },
  { icon: "🎯", label: "Core focus", value: "GenAI + Agentic AI" },
  { icon: "🚀", label: "Final outcome", value: "Deployed AI product" },
];

const PHILOSOPHY = [
  { k: "Learn", t: "Master AI engineering fundamentals.", accent: "#1d4ed8", bg: "#f1f6ff" },
  { k: "Build", t: "Develop real-world AI applications and agents.", accent: "#6d28d9", bg: "#f7f2ff" },
  { k: "Innovate", t: "Turn business challenges into intelligent products.", accent: "#be185d", bg: "#fff1f7" },
  { k: "Deliver", t: "Build secure, scalable, production-ready solutions.", accent: "#15803d", bg: "#effbf3" },
  { k: "Lead", t: "Become a globally competitive AI Engineer.", accent: "#c2410c", bg: "#fff6ee" },
];

const OUTCOMES = [
  {
    n: "1",
    title: "AI-Ready Engineers",
    text: "Every engineer develops practical AI engineering skills and demonstrates competency through projects and assessments.",
  },
  {
    n: "2",
    title: "AI Product Innovation",
    text: "Every team contributes to building AI-powered products, copilots, agents, and reusable engineering assets.",
  },
  {
    n: "3",
    title: "Global AI Engineering Excellence",
    text: "Position Thinklogics as a trusted partner for AI engineering, GenAI, Agentic AI, and AI-powered product development.",
  },
];

const STAGES = [
  {
    n: "01",
    title: "Programming Foundation",
    weeks: "Weeks 1–2",
    span: 2,
    tag: "Foundation",
    short: "Strengthen Python, APIs, data handling and engineering practices.",
    accent: "#1d4ed8",
    bg: "#f1f6ff",
    objective:
      "Become comfortable building maintainable Python services that can integrate with AI models and business systems.",
    table: [
      ["1", "Python syntax, functions, classes, exceptions, type hints, virtual environments", "Build a Python application that processes sales data"],
      ["1", "Git, GitHub, debugging, unit testing, logging", "Create a repository with tests and documentation"],
      ["2", "REST APIs, HTTP, JSON, authentication, environment variables", "Build a FastAPI service with input validation"],
      ["2", "SQL, PostgreSQL, pandas, asynchronous programming, basic data validation", "Retrieve, transform and expose business data through an API"],
    ],
    deliverables: [
      "Python application with clean modular code.",
      "REST API with at least three endpoints.",
      "PostgreSQL integration.",
      "Automated unit tests and README.",
      "Git repository with a clear commit history.",
    ],
    exit: "The engineer can build, test, debug and run a backend service without depending on a tutorial.",
    resources: ["Python Tutorial", "FastAPI Tutorial", "pytest Documentation"],
  },
  {
    n: "02",
    title: "AI & LLM Fundamentals",
    weeks: "Week 3",
    span: 1,
    tag: "AI literacy",
    short: "Understand LLMs, prompting, embeddings, RAG and model selection.",
    accent: "#6d28d9",
    bg: "#f7f2ff",
    objective:
      "Understand how large language models work in applications and how to select the right model and retrieval strategy.",
    steps: [
      ["LLM fundamentals", "Tokens, context windows, temperature, inference, model limitations and hallucinations."],
      ["Prompt engineering", "System instructions, few-shot examples, prompt templates and structured outputs."],
      ["Model integration", "Call an LLM API, handle errors, stream responses and manage API keys."],
      ["Embeddings and vector search", "Understand semantic similarity, chunking and retrieval."],
      ["RAG fundamentals", "Retrieve relevant documents and use them to ground answers."],
      ["Model selection", "Compare model quality, latency, context limits, privacy requirements and cost."],
    ],
    project: {
      title: "Hands-on project",
      text: "Build a document question-answering assistant that reads a set of company documents and provides answers with source references.",
    },
    deliverables: [
      "Working LLM API integration.",
      "Reusable prompt templates.",
      "Document ingestion and retrieval pipeline.",
      "Initial evaluation dataset of 30–50 questions.",
      "Model comparison report covering quality, latency and cost.",
    ],
    exit: "The engineer can explain when to use prompting, RAG or fine-tuning and can build a basic grounded LLM application.",
    resources: ["OpenAI API Documentation", "Anthropic Documentation", "Hugging Face Learn"],
  },
  {
    n: "03",
    title: "AI Application Engineering",
    weeks: "Weeks 4–5",
    span: 2,
    tag: "Core AI engineering",
    short: "Build LLM applications, tool-calling workflows and AI agents.",
    accent: "#be185d",
    bg: "#fff1f7",
    objective:
      "Progress from a simple chatbot to a reliable AI application that can use tools, interact with business systems and execute controlled workflows.",
    weeksBlock: [
      {
        label: "Week 4",
        title: "Build LLM applications",
        bullets: [
          "Design reusable AI service layers.",
          "Implement structured outputs and schema validation.",
          "Connect AI applications to databases and REST APIs.",
          "Implement retrieval-augmented generation (RAG).",
          "Add conversation state and appropriate memory.",
          "Handle rate limits, retries, timeouts and malformed responses.",
        ],
        deliverable: "A business assistant that answers questions using company documents and approved business APIs.",
      },
      {
        label: "Week 5",
        title: "Build AI agents",
        bullets: [
          "Understand the difference between a deterministic workflow and an autonomous agent.",
          "Implement tool/function calling.",
          "Design stateful, multi-step execution.",
          "Add planning and task decomposition where useful.",
          "Implement human approval for consequential actions.",
          "Learn agent orchestration and multi-agent patterns only where justified.",
          "Evaluate tool selection and execution outcomes.",
        ],
      },
    ],
    project: {
      title: "Hands-on project: AI Operations Agent",
      text: "Build an AI Operations Agent that can:",
      tasks: [
        "Retrieve project status from a database.",
        "Summarize overdue tasks.",
        "Identify potential delivery risks.",
        "Draft recommended actions.",
        "Request human approval before making changes.",
      ],
    },
    deliverables: [
      "Reusable LLM integration layer.",
      "RAG pipeline with source references.",
      "Agent with at least three controlled tools.",
      "Tool execution logs and failure handling.",
      "Architecture diagram and API documentation.",
    ],
    exit: "The engineer can build an agent that reliably uses tools, handles failures and respects approval boundaries.",
    resources: ["Anthropic Agents and Tools", "Gemini API Documentation"],
  },
  {
    n: "04",
    title: "Production Engineering",
    weeks: "Weeks 6–7",
    span: 2,
    tag: "Production readiness",
    short: "Deploy securely with monitoring, reliability and cost controls.",
    accent: "#15803d",
    bg: "#effbf3",
    objective: "Make the AI application secure, observable, scalable and economical to operate.",
    weeksBlock: [
      {
        label: "Week 6",
        title: "Security and deployment",
        bullets: [
          "Docker and containerization.",
          "Cloud deployment fundamentals.",
          "Authentication, authorization and role-based access.",
          "Secrets management and environment configuration.",
          "Input validation and output handling.",
          "Prompt-injection defenses and data-access restrictions.",
          "CI/CD pipelines and deployment environments.",
        ],
      },
      {
        label: "Week 7",
        title: "Reliability and operations",
        bullets: [
          "Structured logs, traces and application metrics.",
          "Monitoring model calls and tool execution.",
          "Retry policies, timeouts, circuit breakers and fallback strategies.",
          "Rate limiting and concurrency.",
          "Token budgets and model cost optimization.",
          "Version control for prompts and application configurations.",
          "Backup, recovery and incident response.",
        ],
      },
    ],
    deliverables: [
      "Dockerized AI application.",
      "Deployed staging environment.",
      "Automated build and deployment pipeline.",
      "Authentication and access controls.",
      "Monitoring dashboard and alerting.",
      "Security checklist and cost report.",
    ],
    exit: "Another engineer can deploy, operate, troubleshoot and maintain the application using documented procedures.",
    resources: ["Docker Documentation", "Vertex AI Documentation", "OpenTelemetry Documentation"],
  },
  {
    n: "05",
    title: "AI Testing & Evaluation",
    weeks: "Weeks 8–9",
    span: 2,
    tag: "Quality engineering",
    short: "Measure quality, reliability, safety and performance.",
    accent: "#0f766e",
    bg: "#ecfbf9",
    objective: "Test AI behaviour systematically rather than relying on a few successful manual demonstrations.",
    weeksBlock: [
      {
        label: "Week 8",
        title: "Quality evaluation",
        bullets: [
          "Create representative test datasets.",
          "Measure answer correctness and relevance.",
          "Evaluate retrieval precision and recall.",
          "Test citation accuracy and groundedness.",
          "Assess tool selection and argument correctness.",
          "Create regression tests for prompts and model changes.",
          "Compare quality across models and configurations.",
        ],
      },
      {
        label: "Week 9",
        title: "Safety and performance",
        bullets: [
          "Test hallucinations and unsupported claims.",
          "Simulate prompt injection and malicious documents.",
          "Test access-control boundaries and data leakage.",
          "Run load, concurrency and latency tests.",
          "Measure token usage and cost per successful task.",
          "Establish release thresholds and human review procedures.",
        ],
      },
    ],
    targets: {
      title: "Suggested initial acceptance targets",
      note: "These are proposed internal targets, not universal industry standards.",
      head: ["Metric", "Initial target"],
      rows: [
        ["Correctness on defined test set", "≥ 90%"],
        ["Eligible tool-call execution success", "≥ 95%"],
        ["Unauthorized write actions", "0"],
        ["Critical security issues", "0 unresolved"],
        ["Performance and cost", "Within agreed product budgets"],
      ],
    },
    deliverables: [
      "Automated evaluation pipeline.",
      "At least 50–100 representative test cases.",
      "Regression test report.",
      "Security and adversarial test report.",
      "Latency, failure-rate and cost benchmarks.",
      "Release recommendation based on measured results.",
    ],
    exit: "The engineer can demonstrate where the AI system succeeds, where it fails, and whether it is safe and economical enough to release.",
    resources: ["OpenAI Evals", "Ragas Evaluation Framework"],
  },
  {
    n: "06",
    title: "Real Product Development",
    weeks: "Weeks 10–12",
    span: 3,
    tag: "Capstone",
    short: "Deliver a real business solution with a demo and portfolio.",
    accent: "#c2410c",
    bg: "#fff6ee",
    objective:
      "Combine product thinking, engineering, AI evaluation and deployment to solve a real business problem.",
    intro:
      "This stage is where the engineer demonstrates the transition from software developer who uses AI to AI Product Engineer who owns an outcome.",
    weeksBlock: [
      {
        label: "Week 10",
        title: "Product discovery and design",
        bullets: [
          "Identify a real user and business problem.",
          "Interview stakeholders or review user workflows.",
          "Define the problem statement and measurable success criteria.",
          "Decide whether AI is necessary and appropriate.",
          "Create the product requirements document.",
          "Design the user experience, architecture and data flow.",
          "Establish privacy, security and operating-cost constraints.",
        ],
        deliverable: "A scoped MVP specification, architecture diagram, evaluation plan and prioritized backlog.",
      },
      {
        label: "Week 11",
        title: "Build and integrate",
        bullets: [
          "Implement the frontend and backend.",
          "Integrate the LLM, RAG and agent tools as required.",
          "Connect authorized business data sources.",
          "Implement authentication and permissions.",
          "Add automated tests, observability and error handling.",
          "Conduct demonstrations and collect stakeholder feedback.",
        ],
        deliverable: "A working end-to-end MVP in a staging environment.",
      },
      {
        label: "Week 12",
        title: "Validate and launch",
        bullets: [
          "Run functional, regression, safety and performance tests.",
          "Evaluate the application against the agreed dataset.",
          "Fix the highest-impact defects.",
          "Measure business outcomes against the baseline.",
          "Deploy to a controlled pilot environment.",
          "Prepare user documentation, a demo and a technical handover.",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */
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

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */
function Reveal({ children, delay = 0, style }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(26px)",
        transition: `opacity .7s ease ${delay}ms, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionHead({ eyebrow, title, text, ui }) {
  return (
    <Reveal>
      <div style={{ textAlign: "center", maxWidth: 760, margin: `0 auto ${ui.mobile ? 26 : 38}px` }}>
        <p style={{ color: BLUE, fontSize: ui.mobile ? "0.72rem" : "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 8px" }}>
          {eyebrow}
        </p>
        <h2 style={{ fontSize: ui.mobile ? "1.6rem" : "2.2rem", lineHeight: 1.15, fontWeight: 800, color: INK, margin: "0 0 10px", letterSpacing: "-0.01em" }}>
          {title}
        </h2>
        {text && <p style={{ fontSize: ui.mobile ? "0.95rem" : "1.05rem", lineHeight: 1.55, color: MUTED, margin: 0 }}>{text}</p>}
      </div>
    </Reveal>
  );
}

function Label({ children, color = MUTED }) {
  return (
    <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color, margin: "0 0 10px" }}>
      {children}
    </p>
  );
}

function Check({ children, accent }) {
  return (
    <li style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: "0.92rem", lineHeight: 1.45, color: INK }}>
      <span
        style={{
          width: 20, height: 20, borderRadius: "50%", background: `${accent}18`, color: accent,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.7rem", fontWeight: 800, flexShrink: 0, marginTop: 1,
        }}
      >
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

function Bullet({ children, accent }) {
  return (
    <li style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: "0.9rem", lineHeight: 1.45, color: MUTED }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, flexShrink: 0, marginTop: 8 }} />
      <span>{children}</span>
    </li>
  );
}

const listReset = { listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 9 };

function DataTable({ head, rows, accent, minWidth = 560 }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: 14, border: `1px solid ${LINE}`, background: "#fff" }}>
      <table style={{ width: "100%", minWidth, borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <thead>
          <tr style={{ background: `${accent}12` }}>
            {head.map((h) => (
              <th key={h} style={{ textAlign: "left", padding: "12px 16px", color: accent, fontSize: "0.74rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="rm-row" style={{ borderTop: `1px solid ${LINE}` }}>
              {r.map((c, j) => (
                <td key={j} style={{ padding: "12px 16px", color: j === 0 ? accent : INK, fontWeight: j === 0 ? 700 : 400, lineHeight: 1.45, verticalAlign: "top" }}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage card                                                         */
/* ------------------------------------------------------------------ */
function StageCard({ s, ui }) {
  const pad = ui.mobile ? 18 : 30;
  const grid = (min) => ({ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`, gap: 16 });

  return (
    <Reveal>
      <article
        id={`stage-${s.n}`}
        style={{ scrollMarginTop: 80, background: "#fff", borderRadius: 22, border: `1px solid ${LINE}`, overflow: "hidden", boxShadow: "0 10px 30px rgba(16,26,61,0.06)" }}
      >
        {/* header */}
        <header
          style={{
            position: "relative", overflow: "hidden",
            background: `linear-gradient(120deg, ${NAVY} 0%, ${s.accent} 130%)`,
            color: "#fff", padding: ui.mobile ? "20px 18px" : "26px 30px",
          }}
        >
          <span
            aria-hidden="true"
            style={{ position: "absolute", right: 16, top: -14, fontSize: ui.mobile ? "5.5rem" : "8rem", fontWeight: 900, color: "rgba(255,255,255,0.08)", lineHeight: 1 }}
          >
            {s.n}
          </span>
          <div style={{ position: "relative", display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            <span style={{ background: "rgba(255,255,255,0.16)", padding: "5px 12px", borderRadius: 999, fontSize: "0.76rem", fontWeight: 600 }}>
              Stage {s.n}
            </span>
            <span style={{ background: "#fff", color: s.accent, padding: "5px 12px", borderRadius: 999, fontSize: "0.76rem", fontWeight: 700 }}>
              {s.weeks}
            </span>
            <span style={{ border: "1px solid rgba(255,255,255,0.45)", padding: "4px 12px", borderRadius: 999, fontSize: "0.76rem" }}>
              {s.tag}
            </span>
          </div>
          <h3 style={{ position: "relative", margin: 0, fontSize: ui.mobile ? "1.4rem" : "1.9rem", fontWeight: 800, letterSpacing: "-0.01em" }}>
            {s.title}
          </h3>
        </header>

        {/* body */}
        <div style={{ padding: pad, display: "grid", gap: ui.mobile ? 22 : 28 }}>
          <div>
            <Label color={s.accent}>Objective</Label>
            <p style={{ margin: 0, fontSize: ui.mobile ? "0.98rem" : "1.05rem", lineHeight: 1.55, color: INK }}>{s.objective}</p>
            {s.intro && (
              <p style={{ margin: "10px 0 0", fontSize: "0.95rem", lineHeight: 1.55, color: MUTED }}>{s.intro}</p>
            )}
          </div>

          {s.table && (
            <div>
              <Label>Step-by-step syllabus</Label>
              <DataTable head={["Week", "Topics", "Practical exercise"]} rows={s.table} accent={s.accent} />
            </div>
          )}

          {s.steps && (
            <div>
              <Label>Step-by-step syllabus</Label>
              <div style={grid(260)}>
                {s.steps.map(([t, d], i) => (
                  <div key={t} className="rm-lift" style={{ display: "flex", gap: 12, background: s.bg, border: `1px solid ${s.accent}22`, borderRadius: 14, padding: 16 }}>
                    <span style={{ width: 30, height: 30, borderRadius: 10, background: s.accent, color: "#fff", fontWeight: 800, fontSize: "0.85rem", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {i + 1}
                    </span>
                    <div>
                      <p style={{ margin: "0 0 4px", fontWeight: 700, color: s.accent, fontSize: "0.95rem" }}>{t}</p>
                      <p style={{ margin: 0, fontSize: "0.86rem", lineHeight: 1.45, color: MUTED }}>{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {s.weeksBlock && (
            <div style={grid(ui.mobile ? 240 : 290)}>
              {s.weeksBlock.map((w) => (
                <div key={w.label} className="rm-lift" style={{ background: "#fff", border: `1px solid ${LINE}`, borderTop: `4px solid ${s.accent}`, borderRadius: 16, padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                  <div>
                    <span style={{ display: "inline-block", background: `${s.accent}14`, color: s.accent, borderRadius: 999, padding: "3px 11px", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      {w.label}
                    </span>
                    <h4 style={{ margin: "8px 0 0", fontSize: "1.1rem", color: INK, fontWeight: 800 }}>{w.title}</h4>
                  </div>
                  <ul style={listReset}>
                    {w.bullets.map((b) => (
                      <Bullet key={b} accent={s.accent}>{b}</Bullet>
                    ))}
                  </ul>
                  {w.deliverable && (
                    <div style={{ marginTop: "auto", background: s.bg, border: `1px dashed ${s.accent}66`, borderRadius: 12, padding: "12px 14px" }}>
                      <p style={{ margin: "0 0 3px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: s.accent }}>Deliverable</p>
                      <p style={{ margin: 0, fontSize: "0.88rem", lineHeight: 1.45, color: INK }}>{w.deliverable}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {s.project && (
            <div style={{ background: s.bg, border: `1px solid ${s.accent}33`, borderRadius: 16, padding: 20 }}>
              <Label color={s.accent}>{s.project.title}</Label>
              <p style={{ margin: 0, fontSize: "0.96rem", lineHeight: 1.55, color: INK }}>{s.project.text}</p>
              {s.project.tasks && (
                <ol style={{ margin: "12px 0 0", padding: 0, listStyle: "none", display: "grid", gap: 8, counterReset: "task" }}>
                  {s.project.tasks.map((t, i) => (
                    <li key={t} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: "0.92rem", color: INK }}>
                      <span style={{ width: 24, height: 24, borderRadius: "50%", background: s.accent, color: "#fff", fontSize: "0.75rem", fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {i + 1}
                      </span>
                      {t}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )}

          {s.targets && (
            <div>
              <Label>{s.targets.title}</Label>
              <DataTable head={s.targets.head} rows={s.targets.rows} accent={s.accent} minWidth={360} />
              <p style={{ margin: "8px 0 0", fontSize: "0.8rem", color: MUTED, fontStyle: "italic" }}>{s.targets.note}</p>
            </div>
          )}

          {(s.deliverables || s.exit || s.resources) && (
            <div style={grid(ui.mobile ? 240 : 320)}>
              {s.deliverables && (
                <div style={{ border: `1px solid ${LINE}`, borderRadius: 16, padding: 18 }}>
                  <Label color={s.accent}>Key deliverables</Label>
                  <ul style={listReset}>
                    {s.deliverables.map((d) => (
                      <Check key={d} accent={s.accent}>{d}</Check>
                    ))}
                  </ul>
                </div>
              )}
              {(s.exit || s.resources) && (
                <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
                  {s.exit && (
                    <div style={{ background: `linear-gradient(135deg, ${NAVY}, ${s.accent})`, color: "#fff", borderRadius: 16, padding: 18 }}>
                      <p style={{ margin: "0 0 6px", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.8 }}>
                        Exit criteria
                      </p>
                      <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.5 }}>{s.exit}</p>
                    </div>
                  )}
                  {s.resources && (
                    <div style={{ border: `1px solid ${LINE}`, borderRadius: 16, padding: 18 }}>
                      <Label>Recommended resources</Label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {s.resources.map((r) => (
                          <span key={r} className="rm-chip" style={{ background: s.bg, color: s.accent, border: `1px solid ${s.accent}33`, borderRadius: 999, padding: "6px 12px", fontSize: "0.8rem", fontWeight: 600 }}>
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Roadmap() {
  const bp = useBreakpoint();
  const progress = useScrollProgress();
  const ui = { mobile: bp === "mobile", tablet: bp === "tablet", desktop: bp === "desktop" };
  const gutter = ui.mobile ? 16 : 24;
  const [barRef, barVisible] = useInView(0.4);

  const wrap = { maxWidth: 1200, margin: "0 auto", padding: `0 ${gutter}px` };
  const sectionPad = ui.mobile ? "52px 0" : "80px 0";

  const btnBase = {
    textDecoration: "none", fontWeight: 600, fontSize: "0.95rem",
    padding: ui.mobile ? "13px 18px" : "13px 24px", borderRadius: 12,
    textAlign: "center", boxSizing: "border-box", flex: ui.mobile ? "1 1 100%" : "0 0 auto",
  };

  return (
    <div style={{ background: PAGE_BG, color: INK, overflowX: "hidden" }}>
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes rmFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
        @keyframes rmShimmer { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes rmPulse { 0% { box-shadow: 0 0 0 0 rgba(77,141,255,.55); } 70% { box-shadow: 0 0 0 12px rgba(77,141,255,0); } 100% { box-shadow: 0 0 0 0 rgba(77,141,255,0); } }
        @keyframes rmSlideIn { from { opacity: 0; transform: translateX(22px); } to { opacity: 1; transform: none; } }
        @keyframes rmFadeUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
        .rm-lift { transition: transform .25s ease, box-shadow .25s ease; }
        .rm-lift:hover { transform: translateY(-4px); box-shadow: 0 16px 34px rgba(16,26,61,.12); }
        .rm-btn { transition: transform .2s ease, box-shadow .2s ease, background .2s ease; }
        .rm-btn:hover { transform: translateY(-2px); }
        .rm-row { transition: background .2s ease; }
        .rm-row:hover { background: #f7f9ff; }
        .rm-chip { transition: transform .2s ease; display: inline-block; }
        .rm-chip:hover { transform: translateY(-2px); }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .rm-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
          .rm-lift, .rm-btn, .rm-row, .rm-chip { transition: none; }
        }
      `}</style>

      {/* scroll progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 3, width: `${progress}%`, background: "linear-gradient(90deg, #3b82f6, #a855f7)", zIndex: 1000, transition: "width .1s linear" }} />

      {/* ================= HERO ================= */}
      <section
        style={{
          position: "relative", overflow: "hidden",
          background: `linear-gradient(135deg, ${NAVY} 0%, #091640 60%, #0a1230 100%)`,
          color: "#fff", padding: ui.mobile ? "40px 0 90px" : "64px 0 110px",
        }}
      >
        {/* floating orbs + grid */}
        <div aria-hidden="true" className="rm-anim" style={{ position: "absolute", top: -80, right: -60, width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,.45), transparent 70%)", animation: "rmFloat 9s ease-in-out infinite" }} />
        <div aria-hidden="true" className="rm-anim" style={{ position: "absolute", bottom: -100, left: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,.38), transparent 70%)", animation: "rmFloat 11s ease-in-out infinite reverse" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)", backgroundSize: "44px 44px", maskImage: "linear-gradient(180deg, #000 0%, transparent 85%)", WebkitMaskImage: "linear-gradient(180deg, #000 0%, transparent 85%)" }} />

        <div style={{ ...wrap, position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: ui.desktop ? "1.15fr 0.85fr" : "1fr", gap: 40, alignItems: "center" }}>
          <div>
            <p className="rm-anim" style={{ color: "#4d8dff", fontSize: ui.mobile ? "0.72rem" : "0.85rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 12px", animation: "rmFadeUp .7s ease both" }}>
              Thinklogics AI Engineering Academy · 12-week program
            </p>
            <h1 className="rm-anim" style={{ fontSize: ui.mobile ? "clamp(1.9rem, 9vw, 2.4rem)" : ui.tablet ? "3rem" : "clamp(2.6rem, 3.8vw, 3.4rem)", lineHeight: 1.1, fontWeight: 800, margin: "0 0 14px", letterSpacing: "-0.01em", animation: "rmFadeUp .7s ease .1s both" }}>
              Software Engineer
              <br />
              <span style={{ background: "linear-gradient(90deg, #3b82f6, #a855f7, #3b82f6)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent", animation: "rmShimmer 6s linear infinite" }}>
                → AI Product Engineer
              </span>
            </h1>
            <p className="rm-anim" style={{ fontSize: ui.mobile ? "0.98rem" : "1.15rem", lineHeight: 1.55, color: "#e3e9f8", margin: "0 0 12px", maxWidth: 620, animation: "rmFadeUp .7s ease .2s both" }}>
              Transform an experienced software engineer into an AI Product Engineer who can identify business problems, build GenAI applications and AI agents, deploy them securely, evaluate their performance, and deliver measurable business value.
            </p>
            <p className="rm-anim" style={{ fontSize: ui.mobile ? "0.85rem" : "0.92rem", lineHeight: 1.5, color: "#b9c6e6", margin: "0 0 24px", maxWidth: 620, animation: "rmFadeUp .7s ease .3s both" }}>
              Six progressive stages at a recommended pace of 10–15 hours per week, alongside existing development work. Designed for engineers with 3–8 years of experience. Those who already know Python, APIs, testing and cloud deployment can accelerate through the early stages.
            </p>
            <div className="rm-anim" style={{ display: "flex", flexWrap: "wrap", gap: 12, animation: "rmFadeUp .7s ease .4s both" }}>
              <Link to="/start" className="rm-btn" style={{ ...btnBase, background: BLUE, color: "#fff", boxShadow: "0 8px 22px rgba(31,107,255,0.4)" }}>
                Start Your AI Journey →
              </Link>
              <a href="#journey" className="rm-btn" style={{ ...btnBase, border: "1px solid rgba(255,255,255,0.7)", color: "#fff" }}>
                ▼ View the roadmap
              </a>
            </div>
          </div>

          {/* right: mini roadmap */}
          {ui.desktop && (
            <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderRadius: 22, padding: 26 }}>
              <p style={{ margin: "0 0 16px", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#9db4ea", fontWeight: 600 }}>
                Your 12-week path
              </p>
              <div style={{ position: "relative", display: "grid", gap: 14 }}>
                <span aria-hidden="true" style={{ position: "absolute", left: 13, top: 14, bottom: 14, width: 2, background: "linear-gradient(180deg, #3b82f6, #a855f7)", opacity: 0.5 }} />
                {STAGES.map((s, i) => (
                  <a key={s.n} href={`#stage-${s.n}`} className="rm-anim" style={{ position: "relative", display: "flex", alignItems: "center", gap: 14, textDecoration: "none", color: "#fff", animation: `rmSlideIn .6s ease ${0.4 + i * 0.12}s both` }}>
                    <span className="rm-anim" style={{ width: 28, height: 28, borderRadius: "50%", background: s.accent, border: "2px solid #fff", fontSize: "0.7rem", fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, animation: `rmPulse 2.6s ease-out ${i * 0.4}s infinite` }}>
                      {s.n}
                    </span>
                    <span style={{ flex: 1, fontSize: "0.95rem", fontWeight: 600 }}>{s.title}</span>
                    <span style={{ fontSize: "0.78rem", color: "#9db4ea" }}>{s.weeks}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <svg style={{ position: "absolute", left: 0, right: 0, bottom: -1, width: "100%", height: ui.mobile ? 24 : 36, zIndex: 2, display: "block" }} viewBox="0 0 1440 50" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 50 L0 24 Q300 50 640 50 L1440 50 Z" fill={PAGE_BG} />
        </svg>
      </section>

      {/* ================= AT A GLANCE ================= */}
      <div style={{ ...wrap, position: "relative", zIndex: 3, marginTop: -50 }}>
        <div style={{ display: "grid", gridTemplateColumns: ui.desktop ? "repeat(4, 1fr)" : "repeat(2, 1fr)", gap: ui.mobile ? 12 : 16 }}>
          {GLANCE.map((g, i) => (
            <Reveal key={g.label} delay={i * 90}>
              <div className="rm-lift" style={{ background: "linear-gradient(90deg, #eaf2ff, #f6eeff)", borderRadius: 16, padding: ui.mobile ? 14 : "18px 20px", boxShadow: "0 12px 28px rgba(16,26,61,0.10)", display: "flex", alignItems: "center", gap: 12, height: "100%", boxSizing: "border-box" }}>
                <span style={{ fontSize: ui.mobile ? "1.5rem" : "1.9rem" }}>{g.icon}</span>
                <div style={{ minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: ui.mobile ? "0.95rem" : "1.1rem", fontWeight: 800, color: INK, lineHeight: 1.2 }}>{g.value}</p>
                  <p style={{ margin: "2px 0 0", fontSize: ui.mobile ? "0.72rem" : "0.8rem", color: MUTED }}>{g.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ================= PHILOSOPHY ================= */}
      <section style={{ padding: sectionPad }}>
        <div style={wrap}>
          <SectionHead
            ui={ui}
            eyebrow="Our core philosophy"
            title="Learn AI. Build Products. Engineer the Future."
          />
          <div style={{ display: "grid", gridTemplateColumns: ui.desktop ? "repeat(5, 1fr)" : ui.tablet ? "repeat(3, 1fr)" : "1fr", gap: 14 }}>
            {PHILOSOPHY.map((p, i) => (
              <Reveal key={p.k} delay={i * 80}>
                <div className="rm-lift" style={{ background: p.bg, border: `1px solid ${p.accent}22`, borderRadius: 16, padding: 20, height: "100%", boxSizing: "border-box" }}>
                  <span style={{ display: "inline-flex", width: 34, height: 34, borderRadius: 10, background: p.accent, color: "#fff", fontWeight: 800, alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                    {i + 1}
                  </span>
                  <p style={{ margin: "0 0 6px", color: p.accent, fontWeight: 800, fontSize: "1.1rem" }}>{p.k}</p>
                  <p style={{ margin: 0, color: MUTED, fontSize: "0.9rem", lineHeight: 1.5 }}>{p.t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUTCOMES ================= */}
      <section style={{ padding: sectionPad, background: "#fff", borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
        <div style={wrap}>
          <SectionHead ui={ui} eyebrow="Why we do this" title="Our 3 strategic outcomes" />
          <div style={{ display: "grid", gridTemplateColumns: ui.desktop ? "repeat(3, 1fr)" : "1fr", gap: 18 }}>
            {OUTCOMES.map((o, i) => (
              <Reveal key={o.n} delay={i * 110}>
                <div className="rm-lift" style={{ position: "relative", overflow: "hidden", background: PAGE_BG, border: `1px solid ${LINE}`, borderRadius: 18, padding: 24, height: "100%", boxSizing: "border-box" }}>
                  <span aria-hidden="true" style={{ position: "absolute", right: 14, top: -8, fontSize: "5.5rem", fontWeight: 900, color: "rgba(31,107,255,0.08)", lineHeight: 1 }}>
                    {o.n}
                  </span>
                  <h3 style={{ position: "relative", margin: "0 0 8px", fontSize: "1.2rem", color: INK, fontWeight: 800 }}>{o.title}</h3>
                  <p style={{ position: "relative", margin: 0, color: MUTED, fontSize: "0.95rem", lineHeight: 1.55 }}>{o.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= JOURNEY OVERVIEW ================= */}
      <section id="journey" style={{ padding: sectionPad, scrollMarginTop: 60 }}>
        <div style={wrap}>
          <SectionHead
            ui={ui}
            eyebrow="Learning journey"
            title="Six progressive stages, twelve weeks"
            text="Each stage includes a timeline, learning syllabus, practical exercises and measurable deliverables."
          />

          {/* 12-week proportional bar */}
          <div ref={barRef} style={{ display: "flex", gap: 4, marginBottom: 8 }}>
            {STAGES.map((s, i) => (
              <a
                key={s.n}
                href={`#stage-${s.n}`}
                title={`${s.title} · ${s.weeks}`}
                style={{
                  flex: s.span, height: ui.mobile ? 12 : 16, borderRadius: 999, background: s.accent,
                  transformOrigin: "left center", transform: barVisible ? "scaleX(1)" : "scaleX(0)",
                  opacity: barVisible ? 1 : 0, transition: `transform .8s cubic-bezier(.2,.7,.2,1) ${i * 130}ms, opacity .5s ease ${i * 130}ms`,
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: MUTED, marginBottom: ui.mobile ? 22 : 30 }}>
            <span>Week 1</span>
            <span>Week 12</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: ui.desktop ? "repeat(3, 1fr)" : ui.tablet ? "repeat(2, 1fr)" : "1fr", gap: 16 }}>
            {STAGES.map((s, i) => (
              <Reveal key={s.n} delay={(i % 3) * 100}>
                <a href={`#stage-${s.n}`} className="rm-lift" style={{ display: "block", textDecoration: "none", background: s.bg, border: `1px solid ${s.accent}22`, borderRadius: 18, padding: 22, height: "100%", boxSizing: "border-box", position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: "1.8rem", fontWeight: 900, color: s.accent, lineHeight: 1 }}>{s.n}</span>
                    <span style={{ background: "#fff", color: s.accent, borderRadius: 999, padding: "4px 11px", fontSize: "0.74rem", fontWeight: 700 }}>{s.weeks}</span>
                  </div>
                  <p style={{ margin: "0 0 6px", color: INK, fontWeight: 800, fontSize: "1.1rem" }}>{s.title}</p>
                  <p style={{ margin: "0 0 14px", color: MUTED, fontSize: "0.9rem", lineHeight: 1.5 }}>{s.short}</p>
                  <span style={{ color: s.accent, fontWeight: 700, fontSize: "0.88rem" }}>See details →</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STAGE DETAILS ================= */}
      <section style={{ padding: `0 0 ${ui.mobile ? 52 : 80}px` }}>
        <div style={{ ...wrap, display: "grid", gap: ui.mobile ? 22 : 34 }}>
          {STAGES.map((s) => (
            <StageCard key={s.n} s={s} ui={ui} />
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section style={{ padding: `0 0 ${ui.mobile ? 52 : 80}px` }}>
        <div style={wrap}>
          <Reveal>
            <div style={{ position: "relative", overflow: "hidden", textAlign: "center", background: `linear-gradient(135deg, ${NAVY} 0%, #0d2a78 100%)`, color: "#fff", borderRadius: 26, padding: ui.mobile ? "36px 20px" : "56px 40px" }}>
              <div aria-hidden="true" className="rm-anim" style={{ position: "absolute", top: -60, right: -40, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,.45), transparent 70%)", animation: "rmFloat 8s ease-in-out infinite" }} />
              <h2 style={{ position: "relative", margin: "0 0 10px", fontSize: ui.mobile ? "1.6rem" : "2.3rem", fontWeight: 800, letterSpacing: "-0.01em" }}>
                From software developer to <span style={{ background: "linear-gradient(90deg, #3b82f6, #a855f7)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>outcome owner</span>
              </h2>
              <p style={{ position: "relative", margin: "0 auto 24px", maxWidth: 620, color: "#d6def5", fontSize: ui.mobile ? "0.95rem" : "1.05rem", lineHeight: 1.55 }}>
                Twelve weeks. One deployed AI product. Start the journey and build something that delivers measurable business value.
              </p>
              <div style={{ position: "relative", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
                <Link to="/start" className="rm-btn" style={{ ...btnBase, background: BLUE, color: "#fff", boxShadow: "0 8px 22px rgba(31,107,255,0.45)" }}>
                  Start Your AI Journey →
                </Link>
                <a href="#journey" className="rm-btn" style={{ ...btnBase, border: "1px solid rgba(255,255,255,0.7)", color: "#fff" }}>
                  Back to roadmap ↑
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}