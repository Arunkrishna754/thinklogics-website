// Describes every editable section. The admin screens are built from this file,
// so adding a field here adds it to the form automatically.

const order = { name: "order", label: "Display order", type: "number", help: "Lower numbers appear first." };

export const resources = {
  weeks: {
    label: "Weeks",
    singular: "week",
    endpoint: "/admin/weeks",
    columns: [["number", "#"], ["name", "Name"], ["days", "Days"], ["order", "Order"]],
    fields: [
      { name: "number", label: "Week number", type: "number", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "days", label: "Days label", type: "text", required: true, help: "Shown as text, for example Days 1–7." },
      { name: "rangeStart", label: "First day", type: "number", required: true },
      { name: "rangeEnd", label: "Last day", type: "number", required: true },
      { name: "color", label: "Week color", type: "color", help: "Used for this week everywhere on the site." },
      { name: "on", label: "Text color on the week color", type: "color" },
      { name: "objective", label: "What happens this week", type: "textarea", required: true },
      { name: "goal", label: "End-of-week goal", type: "textarea", required: true },
      { name: "tasks", label: "Checklist steps", type: "list" },
      { name: "tracksTitle", label: "Heading for the role list", type: "text" },
      {
        name: "tracks",
        label: "Role list",
        type: "objects",
        subfields: [
          { name: "role", label: "Role", type: "text" },
          { name: "text", label: "What they do", type: "textarea" },
        ],
      },
      { name: "rulesTitle", label: "Heading for the rules", type: "text" },
      { name: "rules", label: "Rules (shown as chips)", type: "list" },
      order,
    ],
  },
  paths: {
    label: "Learning paths",
    singular: "learning path",
    endpoint: "/admin/paths",
    columns: [["name", "Name"], ["icon", "Icon"], ["order", "Order"]],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "icon", label: "Icon", type: "select", options: ["code", "data", "layers", "shield", "users", "spark"] },
      { name: "blurb", label: "Short description", type: "textarea", required: true },
      { name: "practice", label: "You will practice", type: "list" },
      { name: "week2", label: "Week 2 training", type: "textarea" },
      { name: "week3", label: "Week 3 build", type: "textarea" },
      order,
    ],
  },
  certifications: {
    label: "Certifications",
    singular: "certification",
    endpoint: "/admin/certifications",
    columns: [["name", "Name"], ["tier", "Tier"], ["price", "Price (USD)"], ["order", "Order"]],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "tier", label: "Tier label", type: "text", required: true, help: "For example Entry level, Foundations or Professional." },
      { name: "level", label: "Level", type: "select", options: ["1", "2", "3"], numeric: true, help: "Sets the block height: 1 is shortest, 3 is tallest." },
      { name: "price", label: "Exam fee (USD)", type: "number", required: true },
      { name: "note", label: "Short note", type: "textarea" },
      order,
    ],
  },
  statuses: {
    label: "Certification statuses",
    singular: "status",
    endpoint: "/admin/statuses",
    columns: [["name", "Name"], ["fill", "Pie fill"], ["order", "Order"]],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "fill", label: "Pie fill (0 to 1)", type: "number", required: true, help: "0.34 is a third full, 1 is full." },
      { name: "text", label: "Description", type: "textarea", required: true },
      order,
    ],
  },
  projects: {
    label: "Projects",
    singular: "project",
    endpoint: "/admin/projects",
    columns: [["name", "Name"], ["tags", "Tags"], ["order", "Order"]],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "text", label: "Description", type: "textarea", required: true },
      { name: "practice", label: "What the team practices", type: "text" },
      { name: "tags", label: "Tags", type: "list" },
      { name: "imageUrl", keyName: "imageKey", folder: "projects", label: "Project image", type: "image", help: "Uploaded to S3. JPG, PNG, WebP or GIF, up to 5 MB." },
      { name: "art", label: "Drawing to show when there is no image", type: "select", options: ["dashboard", "basket", "doc"], default: "dashboard" },
      order,
    ],
  },
  principles: {
    label: "Principles",
    singular: "principle",
    endpoint: "/admin/principles",
    columns: [["title", "Title"], ["order", "Order"]],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "text", label: "Text", type: "textarea", required: true },
      order,
    ],
  },
  benefits: {
    label: "Benefits",
    singular: "benefit",
    endpoint: "/admin/benefits",
    columns: [["title", "Title"], ["order", "Order"]],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "text", label: "Text", type: "textarea", required: true },
      order,
    ],
  },
  faqs: {
    label: "FAQs",
    singular: "question",
    endpoint: "/admin/faqs",
    columns: [["q", "Question"], ["order", "Order"]],
    fields: [
      { name: "q", label: "Question", type: "text", required: true },
      { name: "a", label: "Answer", type: "textarea", required: true },
      order,
    ],
  },
  "role-matrix": {
    label: "Role table",
    singular: "row",
    endpoint: "/admin/role-matrix",
    columns: [["role", "Role"], ["order", "Order"]],
    fields: [
      { name: "role", label: "Role", type: "text", required: true },
      { name: "learn", label: "Week 2: what they learn", type: "textarea", required: true },
      { name: "build", label: "Week 3: what they build", type: "textarea", required: true },
      order,
    ],
  },
};

export const resourceList = Object.entries(resources).map(([key, value]) => ({ key, ...value }));

export const settingsFields = [
  /* ---------- Navbar ---------- */
  {
    name: "navLinks",
    label: "Navbar menu links (in order)",
    type: "objects",
    subfields: [
      { name: "label", label: "Text shown", type: "text" },
      { name: "to", label: "Link, for example /paths or https://example.com", type: "text" },
    ],
  },
  { name: "navCtaLabel", label: "Navbar button text", type: "text" },
  {
    name: "navCtaAction",
    label: "Navbar button does",
    type: "select",
    options: ["link", "signup"],
    help: "link = go to the address below. signup = open the sign-up popup.",
  },
  { name: "navCtaLink", label: "Navbar button link", type: "text", help: "Used when the button does 'link', for example /start." },

  /* ---------- Home page hero ---------- */
  { name: "heroEyebrow", label: "Hero small label", type: "text" },
  { name: "heroHeadline", label: "Hero headline (first part)", type: "text", help: "If it ends with the word 'to', that word moves to the next line." },
  { name: "heroHighlight", label: "Hero headline (colored part)", type: "text" },
  { name: "heroTagline", label: "Hero tagline", type: "text" },
  { name: "heroText", label: "Hero paragraph", type: "textarea" },
  { name: "ctaPrimary", label: "Hero main button text", type: "text" },
  { name: "videoUrl", label: "Watch Video link", type: "text", help: "Leave empty to link to the academy page." },
  { name: "heroImageUrl", label: "Hero photo address (URL)", type: "text", help: "Leave empty to use the built-in picture." },
  {
    name: "highlights",
    label: "Four highlights under the buttons",
    type: "objects",
    subfields: [{ name: "label", label: "Label", type: "text" }],
  },
  {
    name: "stats",
    label: "Stats bar (four items)",
    type: "objects",
    subfields: [
      { name: "value", label: "Big text", type: "text" },
      { name: "label", label: "Small text", type: "text" },
    ],
  },

  /* ---------- Existing site settings ---------- */
  { name: "heroTitle", label: "Home page headline (old)", type: "text" },
  { name: "heroLede", label: "Home page intro (old)", type: "textarea" },
  {
    name: "facts",
    label: "Facts under the headline",
    type: "objects",
    subfields: [
      { name: "label", label: "Label", type: "text" },
      { name: "value", label: "Value", type: "text" },
    ],
  },
  {
    name: "milestones",
    label: "Milestone days on the calendar",
    type: "objects",
    subfields: [
      { name: "day", label: "Day", type: "number" },
      { name: "label", label: "Label", type: "text" },
    ],
  },
  { name: "ctaTitle", label: "Call-to-action title", type: "text" },
  { name: "ctaText", label: "Call-to-action text", type: "textarea" },
  { name: "footerText", label: "Footer description", type: "textarea" },
  { name: "contactEmail", label: "Contact email", type: "text" },
];

// Just the navbar fields, in case a page wants to render only these.
export const navbarFieldNames = ["navLinks", "navCtaLabel", "navCtaAction", "navCtaLink"];
export const navbarFields = settingsFields.filter((f) => navbarFieldNames.includes(f.name));

// Single-page admin sections (not list/CRUD). The sidebar can map over this
// to show extra links under "Site content". Keys match the `meta` file.
export const extraPages = [
  { key: "navbar", label: "Navbar", path: "/admin/navbar" },
];