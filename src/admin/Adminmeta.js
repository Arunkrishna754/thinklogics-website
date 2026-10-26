// Icon and accent color for each admin section.
export const meta = {
  weeks: { icon: "calendar", color: "var(--w1)" },
  paths: { icon: "route", color: "var(--w2)" },
  certifications: { icon: "award", color: "var(--w3)" },
  statuses: { icon: "pie", color: "var(--w4)" },
  projects: { icon: "image", color: "var(--w1)" },
  principles: { icon: "compass", color: "var(--w2)" },
  benefits: { icon: "sparkle", color: "var(--w3)" },
  faqs: { icon: "help", color: "var(--w4)" },
  "role-matrix": { icon: "table", color: "var(--w1)" },
  navbar: { icon: "menu", color: "var(--w2)" },
  settings: { icon: "settings", color: "var(--ink)" },
  enrollments: { icon: "inbox", color: "var(--w3)" },
};

// Same week colors as the public site, by day number.
export const colorForDay = (day) =>
  day <= 7 ? "var(--w1)" : day <= 14 ? "var(--w2)" : day <= 21 ? "var(--w3)" : "var(--w4)";