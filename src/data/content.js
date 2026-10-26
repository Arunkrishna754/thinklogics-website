// All site copy lives here, so you can edit text without touching components.

export const weeks = [
  {
    id: 1,
    name: "Foundation",
    days: "Days 1–7",
    range: [1, 7],
    color: "var(--w1)",
    on: "#fff",
    objective:
      "Name the people in charge, find out where everyone starts, and set the safety rules before anyone builds.",
    goal: "100% of the team enrolled and baseline assessments complete.",
    tasks: [
      "Appoint a CEO sponsor and a program owner",
      "Record every member's name, role, coding experience and English level",
      "Assess AI and coding skills across the team",
      "Enroll everyone in the free Anthropic Academy courses for their role",
      "Set up the Claude Code environment",
      "Publish an internal AI security policy and usage guidelines",
      "Apply to the Claude Partner Network",
    ],
    tracks: [],
    rules: [],
  },
  {
    id: 2,
    name: "Technical enablement",
    days: "Days 8–14",
    range: [8, 14],
    color: "var(--w2)",
    on: "#fff",
    objective:
      "Each role follows its own learning track, with hands-on exercises and knowledge checks along the way.",
    goal: "At least 80% of the team has finished foundational training.",
    tasks: [
      "Every role starts its own learning track",
      "Complete the hands-on exercises for each track",
      "Pass the knowledge checks",
      "Confirm 80% of the team finished foundational training",
    ],
    tracks: [
      { role: "Developers", text: "Claude Code 101 and Claude Platform 101, plus debugging, refactoring and unit testing." },
      { role: "AI and data engineers", text: "API integration, structured outputs, tool use and MCP, plus SQL, data pipelines and AI-assisted data workflows." },
      { role: "QA engineers", text: "Test generation, failure analysis, regression validation and API testing." },
      { role: "Analysts, project managers and UI/UX", text: "Claude fundamentals and role-specific workflows: requirements, acceptance criteria and product specs." },
      { role: "Architects", text: "Architecture decisions, evaluation and security." },
    ],
    rules: [],
  },
  {
    id: 3,
    name: "Build with Claude",
    days: "Days 15–21",
    range: [15, 21],
    color: "var(--w3)",
    on: "var(--ink)",
    objective:
      "Every team works on a real pilot project in a demo repository, and ends the week with a live demo.",
    goal: "A working prototype with tests and architecture documentation.",
    tasks: [
      "Start the pilot project in a demo repository",
      "Finish code reviews, test coverage checks and security reviews",
      "Have a person review every change before it merges",
      "Deliver a working prototype with tests and architecture notes",
      "Run the end-of-week project demo",
    ],
    tracks: [
      { role: "Developers", text: "Build an API integration or a new product feature." },
      { role: "QA engineers", text: "Create test cases, automated tests and failure reports." },
      { role: "Analysts and project managers", text: "Document requirements and acceptance criteria." },
      { role: "Architects", text: "Review system design, permissions, evaluation strategies and cost controls." },
    ],
    rules: ["Code review", "Test coverage", "Security review", "Human review"],
  },
  {
    id: 4,
    name: "Validate and certify",
    days: "Days 22–30",
    range: [22, 30],
    color: "var(--w4)",
    on: "var(--ink)",
    objective:
      "Check who is ready for the official exams, using practice scores, project demos and code reviews.",
    goal: "Team assessment complete, certification-ready people identified, and a clear 60-day roadmap.",
    tasks: [
      "Verify Partner Academy access and company email domain registration",
      "Run mock assessments from each official exam guide",
      "Review practice scores, project demos and code reviews",
      "Mark each person Certified, Training completed or Exam pending",
      "Schedule paid exams only for people who are ready",
      "Hold the final management review and draft the next 60-day plan",
    ],
    tracks: [],
    rules: [],
  },
];

export const paths = [
  {
    id: "developer",
    icon: "code",
    name: "Claude Developer",
    blurb: "Build AI-powered applications with the Claude API, Claude Code and MCP.",
    practice: ["Calling the Claude API from real services", "Debugging and refactoring with Claude Code", "Writing unit tests with AI help", "Connecting tools through MCP"],
    week2: "Claude Code 101 and Claude Platform 101, with debugging, refactoring and unit testing.",
    week3: "Build an API integration or a new product feature.",
  },
  {
    id: "ai-engineer",
    icon: "data",
    name: "AI Engineer",
    blurb: "Work with data, agents, evaluation and advanced AI workflows.",
    practice: ["Structured outputs and tool use", "SQL and data pipelines", "AI-assisted data workflows", "Judging the quality of model output"],
    week2: "API integration, structured outputs, tool use and MCP, plus SQL and data pipelines.",
    week3: "Build the data and integration pieces of the pilot project.",
  },
  {
    id: "architect",
    icon: "layers",
    name: "Architect",
    blurb: "Design secure, scalable AI solutions for the enterprise.",
    practice: ["Architecture decisions for AI systems", "Evaluation strategies", "Security and permissions", "Cost controls"],
    week2: "Architecture decisions, evaluation and security.",
    week3: "Review system design, permissions, evaluation strategies and cost controls.",
  },
  {
    id: "qa",
    icon: "shield",
    name: "QA Engineer",
    blurb: "AI-assisted testing, test generation and quality automation.",
    practice: ["Generating test cases", "Analysing failures", "Regression validation", "API testing"],
    week2: "Test generation, failure analysis and regression validation, plus API testing.",
    week3: "Create test cases, automated tests and failure reports.",
  },
  {
    id: "product",
    icon: "users",
    name: "Product and Business",
    blurb: "Find use cases, write requirements and deliver AI products.",
    practice: ["Finding good use cases for AI", "Gathering requirements", "Writing acceptance criteria", "Writing product specifications"],
    week2: "Claude fundamentals and role-specific workflows.",
    week3: "Document requirements and acceptance criteria.",
  },
  {
    id: "uiux",
    icon: "spark",
    name: "UI/UX and Product Design",
    blurb: "Design AI-powered experiences and rapid prototypes.",
    practice: ["Designing around AI behaviour", "Prototyping quickly with Claude", "Turning requirements into flows", "Testing ideas with the team"],
    week2: "Claude fundamentals and role-specific workflows.",
    week3: "Design and prototype the pilot project's experience.",
  },
];

export const certs = [
  { id: "associate", level: 1, tier: "Entry level", name: "Claude Certified Associate", price: 99, note: "A first credential for most of the team." },
  { id: "developer", level: 2, tier: "Foundations", name: "Claude Certified Developer (Foundations)", price: 125, note: "For people who build with the Claude API and Claude Code." },
  { id: "architect", level: 2, tier: "Foundations", name: "Claude Certified Architect (Foundations)", price: 125, note: "For people who design AI solutions." },
  { id: "architect-pro", level: 3, tier: "Professional", name: "Claude Certified Architect (Professional)", price: 175, note: "For senior architects ready for the advanced assessment." },
];

export const statuses = [
  { id: "training", fill: 0.34, name: "Training completed", text: "Finished the courses and exercises. Not yet cleared to sit the exam." },
  { id: "pending", fill: 0.67, name: "Exam pending", text: "Ready by practice score, demo and code review. The exam is booked or about to be." },
  { id: "certified", fill: 1, name: "Certified", text: "Passed the official exam." },
];

export const projects = [
  {
    id: "ops",
    art: "dashboard",
    name: "Operations Copilot",
    text: "An AI copilot for business operations, inventory and procurement. People ask questions in plain language and get answers from live data.",
    tags: ["AI", "ERP", "Retail", "Operations"],
    practice: "API integration, tool use and structured outputs.",
  },
  {
    id: "retail",
    art: "basket",
    name: "Retail AI Agent",
    text: "An assistant for retail businesses that helps with forecasting and keeping shelves stocked.",
    tags: ["AI", "Retail", "Forecasting", "Inventory"],
    practice: "Agents, forecasting data and evaluating results.",
  },
  {
    id: "health",
    art: "doc",
    name: "Healthcare AI Assistant",
    text: "An assistant for healthcare workflows and documentation, built with checks for compliance.",
    tags: ["AI", "Healthcare", "Compliance", "RAG"],
    practice: "Retrieval, compliance review and documentation workflows.",
  },
];

export const principles = [
  { title: "Real projects over slides", text: "By week three every team ships a pilot project, so the skills are tested on real work." },
  { title: "A person reviews every change", text: "Code review, test coverage, security review and human review are required for all pilot work." },
  { title: "Security policy comes first", text: "The internal AI security policy is published in week one, before anyone builds." },
  { title: "Pay only for exams that are ready", text: "Training starts with free courses. Paid exams are booked only for people who show they are ready." },
];

export const benefits = [
  { title: "Team dashboard", text: "Track progress, skills and certification status in one place." },
  { title: "Low cost, free first", text: "Start with free training and certify as a team." },
  { title: "Real career growth", text: "Build in-demand AI skills that carry across projects and roles." },
  { title: "Partner network", text: "A pathway into the Claude Partner Network." },
];

export const faqs = [
  { q: "Who is the academy for?", a: "Teams of 25 to 50 people across development, QA, data, product, design and architecture." },
  { q: "How long is the first program?", a: "Thirty days. The final management review produces a 60-day plan for what comes next." },
  { q: "Does everyone have to take an exam?", a: "No. Exams are paid, so they are booked only for people whose practice scores, project demos and code reviews show they are ready." },
  { q: "What does it cost?", a: "The Anthropic Academy courses we start with are free. Certification exams are paid, from $99 for the Associate level." },
  { q: "How do you keep company code safe?", a: "An internal AI security policy is published in week one. In week three every change also gets a security review and a person's review." },
];

export const roleMatrix = [
  { role: "Developers", learn: "Claude Code 101, Claude Platform 101, debugging, refactoring, unit testing", build: "An API integration or a new product feature" },
  { role: "AI and data engineers", learn: "API integration, structured outputs, tool use, MCP, SQL and data pipelines", build: "Data and integration pieces of the pilot" },
  { role: "QA engineers", learn: "Test generation, failure analysis, regression validation, API testing", build: "Test cases, automated tests and failure reports" },
  { role: "Analysts, PMs and UI/UX", learn: "Claude fundamentals, requirements, acceptance criteria, product specs", build: "Requirements, acceptance criteria and prototypes" },
  { role: "Architects", learn: "Architecture decisions, evaluation and security", build: "Design, permissions, evaluation and cost-control review" },
];

export const settings = {
  heroTitle: "Train your whole team to build with Claude in 30 days",
  heroLede:
    "A four-week academy for teams of 25 to 50 people. Everyone learns the skills for their role, ships a real pilot project, and finds out who is ready to certify.",
  facts: [
    { label: "Team size", value: "25 to 50 people" },
    { label: "First program", value: "30 days" },
    { label: "Training", value: "Built for each role" },
    { label: "Finish line", value: "Claude certification" },
  ],
  milestones: [
    { day: 1, label: "Kickoff" },
    { day: 7, label: "Baseline assessments complete" },
    { day: 14, label: "80% finished foundations" },
    { day: 21, label: "Project demo" },
    { day: 30, label: "Final management review" },
  ],
  ctaTitle: "Start your team's first 30 days",
  ctaText: "Tell us about your team and we will help you plan week one.",
  footerText: "A 30-day program that trains your team to build with Claude and shows you who is ready to certify.",
  contactEmail: "hello@thinklogics.com",
};

// Used only when the API cannot be reached.
export const fallbackContent = { settings, weeks, paths, certs, statuses, projects, principles, benefits, faqs, roleMatrix };