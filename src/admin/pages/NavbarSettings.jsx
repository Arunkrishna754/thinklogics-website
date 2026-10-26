import { useEffect, useState } from "react";
import api from "../../api/Client";

const NAVY = "#101a3d";
const BLUE = "#2456e8";
const BORDER = "#e4e8f2";

const isExternal = (to) => /^https?:\/\//i.test(to || "");
const isInternal = (to) => (to || "").startsWith("/") && !(to || "").startsWith("//");
const isValidLink = (to) => isInternal(to) || isExternal(to);

const SUGGESTED = [
  { label: "Home", to: "/", children: [] },
  {
    label: "Academy",
    to: "",
    children: [
      { label: "Learning paths", to: "/paths" },
      { label: "Certification", to: "/certification" },
      { label: "30-day academy", to: "/academy" },
    ],
  },
  { label: "Projects", to: "/projects", children: [] },
  { label: "About", to: "/about", children: [] },
];

const s = {
  page: { maxWidth: 900 },
  title: { fontSize: "2rem", fontWeight: 800, color: NAVY, margin: 0 },
  sub: { color: "#4a5578", margin: "6px 0 28px" },
  card: { background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24, marginBottom: 24 },
  h2: { fontSize: "1.1rem", fontWeight: 700, color: NAVY, margin: "0 0 4px" },
  help: { color: "#6b7599", fontSize: "0.85rem", margin: "0 0 16px" },
  group: { marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${BORDER}` },
  row: { display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 },
  childRow: { display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8, marginLeft: 32 },
  input: { flex: 1, padding: "10px 12px", border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: "0.95rem", fontFamily: "inherit", minWidth: 0 },
  inputBad: { borderColor: "#dc2626" },
  dropdownTag: { flex: 1, padding: "10px 12px", borderRadius: 10, background: "#eef2ff", color: BLUE, fontWeight: 600, fontSize: "0.9rem" },
  iconBtn: { width: 38, height: 38, border: `1px solid ${BORDER}`, background: "#fff", borderRadius: 10, cursor: "pointer", fontSize: "1rem" },
  label: { display: "block", fontWeight: 600, color: NAVY, fontSize: "0.9rem", margin: "14px 0 6px" },
  addBtn: { background: "transparent", border: `1px dashed ${BLUE}`, color: BLUE, padding: "10px 16px", borderRadius: 10, cursor: "pointer", fontWeight: 600, marginTop: 6, marginRight: 10 },
  subBtn: { background: "transparent", border: "none", color: BLUE, padding: "4px 0", cursor: "pointer", fontWeight: 600, marginLeft: 32, fontSize: "0.88rem" },
  ghostBtn: { background: "#fff", border: `1px solid ${BORDER}`, color: NAVY, padding: "10px 16px", borderRadius: 10, cursor: "pointer", fontWeight: 600, marginTop: 6 },
  save: { background: NAVY, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 12, fontWeight: 700, cursor: "pointer", fontSize: "1rem" },
  ok: { color: "#16a34a", fontWeight: 600, marginLeft: 14 },
  err: { color: "#dc2626", fontWeight: 600, marginLeft: 14 },
};

const errorText = (e) => e?.response?.data?.message || e?.message || "Something went wrong.";
const normalize = (l) => ({ label: l.label || "", to: l.to || "", children: Array.isArray(l.children) ? l.children : [] });

const topProblem = (l) =>
  !l.label.trim() ||
  (l.children.length
    ? l.children.some((c) => !c.label.trim() || !isValidLink(c.to.trim()))
    : !isValidLink(l.to.trim()));

export default function NavbarSettings() {
  const [links, setLinks] = useState([]);
  const [ctaLabel, setCtaLabel] = useState("");
  const [ctaAction, setCtaAction] = useState("link");
  const [ctaLink, setCtaLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    api
      .get("/admin/navbar")
      .then(({ data }) => {
        setLinks((data.navLinks || []).map(normalize));
        setCtaLabel(data.navCtaLabel || "");
        setCtaAction(data.navCtaAction || "link");
        setCtaLink(data.navCtaLink || "");
      })
      .catch((e) => setMsg({ type: "err", text: errorText(e) }))
      .finally(() => setLoading(false));
  }, []);

  /* ----- top-level items ----- */
  const updateTop = (i, key, value) =>
    setLinks((prev) => prev.map((l, idx) => (idx === i ? { ...l, [key]: value } : l)));
  const removeTop = (i) => setLinks((prev) => prev.filter((_, idx) => idx !== i));
  const addTop = () => setLinks((prev) => [...prev, { label: "", to: "/", children: [] }]);
  const moveTop = (i, dir) =>
    setLinks((prev) => {
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  /* ----- sub-links ----- */
  const mapChildren = (i, fn) =>
    setLinks((prev) => prev.map((l, idx) => (idx === i ? { ...l, children: fn(l.children) } : l)));
  const addChild = (i) => mapChildren(i, (c) => [...c, { label: "", to: "/" }]);
  const updateChild = (i, j, key, value) =>
    mapChildren(i, (c) => c.map((x, idx) => (idx === j ? { ...x, [key]: value } : x)));
  const removeChild = (i, j) => mapChildren(i, (c) => c.filter((_, idx) => idx !== j));
  const moveChild = (i, j, dir) =>
    mapChildren(i, (c) => {
      const k = j + dir;
      if (k < 0 || k >= c.length) return c;
      const next = [...c];
      [next[j], next[k]] = [next[k], next[j]];
      return next;
    });

  const useSuggested = () => {
    if (links.length && !window.confirm("Replace the current menu with the suggested one (Home, Academy dropdown, Projects, About)?")) return;
    setLinks(SUGGESTED.map((l) => ({ ...l, children: l.children.map((c) => ({ ...c })) })));
  };

  const hasProblem =
    links.some(topProblem) || (ctaAction === "link" && !isValidLink(ctaLink.trim()));

  const save = async () => {
    setMsg({ type: "", text: "" });
    if (hasProblem) {
      setMsg({ type: "err", text: "Fix the red fields first." });
      return;
    }
    setSaving(true);
    try {
      await api.put("/admin/navbar", {
        navLinks: links.map((l) => ({
          label: l.label.trim(),
          to: l.children.length ? "" : l.to.trim(),
          children: l.children.map((c) => ({ label: c.label.trim(), to: c.to.trim() })),
        })),
        navCtaLabel: ctaLabel,
        navCtaAction: ctaAction,
        navCtaLink: ctaLink,
      });
      setMsg({ type: "ok", text: "Saved. Refresh the website to see it." });
    } catch (e) {
      setMsg({ type: "err", text: errorText(e) });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={s.page}>Loading…</div>;

  return (
    <div style={s.page}>
      <h1 style={s.title}>Navbar</h1>
      <p style={s.sub}>Edit the menu headings, dropdowns and the button at the top of the website.</p>

      <div style={s.card}>
        <h2 style={s.h2}>Menu items</h2>
        <p style={s.help}>
          Shown left to right. Use /paths for a page on your site or https://… for another site. Add sub-links to an item to turn it into a dropdown.
        </p>

        {links.map((l, i) => (
          <div key={i} style={s.group}>
            <div style={s.row}>
              <input
                style={{ ...s.input, ...(l.label.trim() ? {} : s.inputBad) }}
                placeholder="Text shown, e.g. Academy"
                value={l.label}
                onChange={(e) => updateTop(i, "label", e.target.value)}
              />
              {l.children.length ? (
                <div style={s.dropdownTag}>Dropdown menu ▾</div>
              ) : (
                <input
                  style={{ ...s.input, ...(isValidLink(l.to.trim()) ? {} : s.inputBad) }}
                  placeholder="/projects"
                  value={l.to}
                  onChange={(e) => updateTop(i, "to", e.target.value)}
                />
              )}
              <button type="button" style={s.iconBtn} onClick={() => moveTop(i, -1)} disabled={i === 0} title="Move up">↑</button>
              <button type="button" style={s.iconBtn} onClick={() => moveTop(i, 1)} disabled={i === links.length - 1} title="Move down">↓</button>
              <button type="button" style={s.iconBtn} onClick={() => removeTop(i)} title="Remove">✕</button>
            </div>

            {l.children.map((c, j) => (
              <div key={j} style={s.childRow}>
                <input
                  style={{ ...s.input, ...(c.label.trim() ? {} : s.inputBad) }}
                  placeholder="Sub-link text"
                  value={c.label}
                  onChange={(e) => updateChild(i, j, "label", e.target.value)}
                />
                <input
                  style={{ ...s.input, ...(isValidLink(c.to.trim()) ? {} : s.inputBad) }}
                  placeholder="/paths"
                  value={c.to}
                  onChange={(e) => updateChild(i, j, "to", e.target.value)}
                />
                <button type="button" style={s.iconBtn} onClick={() => moveChild(i, j, -1)} disabled={j === 0} title="Move up">↑</button>
                <button type="button" style={s.iconBtn} onClick={() => moveChild(i, j, 1)} disabled={j === l.children.length - 1} title="Move down">↓</button>
                <button type="button" style={s.iconBtn} onClick={() => removeChild(i, j)} title="Remove">✕</button>
              </div>
            ))}

            <button type="button" style={s.subBtn} onClick={() => addChild(i)}>+ Add sub-link</button>
          </div>
        ))}

        <button type="button" style={s.addBtn} onClick={addTop}>+ Add menu item</button>
        <button type="button" style={s.ghostBtn} onClick={useSuggested}>Use suggested menu (Academy dropdown)</button>
        {links.length === 0 && <p style={s.help}>No items saved. The website will show its default menu.</p>}
      </div>

      <div style={s.card}>
        <h2 style={s.h2}>Button</h2>
        <p style={s.help}>The rounded button at the right end of the navbar.</p>

        <label style={s.label}>Button text</label>
        <input style={{ ...s.input, width: "100%", boxSizing: "border-box" }} value={ctaLabel} onChange={(e) => setCtaLabel(e.target.value)} placeholder="Get started" />

        <label style={s.label}>When clicked</label>
        <select style={{ ...s.input, width: "100%", boxSizing: "border-box" }} value={ctaAction} onChange={(e) => setCtaAction(e.target.value)}>
          <option value="link">Go to a link</option>
          <option value="signup">Open the sign-up popup</option>
        </select>

        {ctaAction === "link" && (
          <>
            <label style={s.label}>Button link</label>
            <input
              style={{ ...s.input, width: "100%", boxSizing: "border-box", ...(isValidLink(ctaLink.trim()) ? {} : s.inputBad) }}
              value={ctaLink}
              onChange={(e) => setCtaLink(e.target.value)}
              placeholder="/start"
            />
          </>
        )}
      </div>

      <button type="button" style={{ ...s.save, opacity: saving ? 0.6 : 1 }} onClick={save} disabled={saving}>
        {saving ? "Saving…" : "Save navbar"}
      </button>
      {msg.text && <span style={msg.type === "ok" ? s.ok : s.err}>{msg.text}</span>}
    </div>
  );
}