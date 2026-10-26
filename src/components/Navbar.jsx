import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/thinklogicslogo.png";
import { useContent } from "../context/Contentcontext";
import { useSignup } from "../context/Signupcontext";

// Shown until the admin saves their own menu (and used if the list is ever emptied).
const DEFAULT_LINKS = [
  { to: "/", label: "Home" },
  {
    label: "Academy",
    children: [
      { to: "/paths", label: "Learning paths" },
      { to: "/certification", label: "Certification" },
      { to: "/academy", label: "30-day academy" },
    ],
  },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
];
const DEFAULT_CTA = { label: "Get started", action: "link", link: "/start" };

const NAVY = "#101a3d";
const BLUE = "#2456e8";
const MUTED = "#4a5578";

const isExternal = (to) => typeof to === "string" && /^https?:\/\//i.test(to);
const isInternal = (to) => typeof to === "string" && to.startsWith("/") && !to.startsWith("//");
const isValidLink = (to) => isInternal(to) || isExternal(to);

// Keeps only usable items. An item with valid sub-links becomes a dropdown.
const cleanLinks = (raw) => {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((l) => {
      if (!l || !l.label) return null;
      const kids = Array.isArray(l.children)
        ? l.children.filter((c) => c && c.label && isValidLink(c.to))
        : [];
      if (kids.length) return { label: l.label, children: kids };
      return isValidLink(l.to) ? { label: l.label, to: l.to } : null;
    })
    .filter(Boolean);
};

const pathMatches = (pathname, to) =>
  isInternal(to) && (to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(to + "/"));

// Keys must be the same wherever an item is rendered or checked.
const topKey = (l) => `${l.label}-${l.to}`;
const menuKey = (l) => `menu-${l.label}`;
const subKey = (parent, c) => `${menuKey(parent)}-${c.label}-${c.to}`;

function Chevron({ open }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden="true"
      style={{ marginLeft: 6, transition: "transform .15s ease", transform: open ? "rotate(180deg)" : "none" }}
    >
      <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navbar() {
  const { settings } = useContent();
  const { openSignup } = useSignup();

  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 900 : false
  );
  const [hovered, setHovered] = useState(null);
  const { pathname } = useLocation();
  const navRef = useRef(null);

  /* ----- values coming from the admin panel (with safe fallbacks) ----- */
  const adminLinks = cleanLinks(settings?.navLinks);
  const links = adminLinks.length ? adminLinks : DEFAULT_LINKS;

  const ctaLabel = settings?.navCtaLabel || DEFAULT_CTA.label;
  const ctaAction = settings?.navCtaAction === "signup" ? "signup" : "link";
  const ctaLink = isValidLink(settings?.navCtaLink) ? settings.navCtaLink : DEFAULT_CTA.link;

  /* ----- exactly one active link: the best (longest) match, first one wins a tie ----- */
  let activeKey = null;
  let bestLen = -1;
  links.forEach((l) => {
    const candidates = l.children
      ? l.children.map((c) => ({ key: subKey(l, c), to: c.to }))
      : [{ key: topKey(l), to: l.to }];
    candidates.forEach(({ key, to }) => {
      if (pathMatches(pathname, to) && to.length > bestLen) {
        bestLen = to.length;
        activeKey = key;
      }
    });
  });

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    };
    const onKey = (e) => e.key === "Escape" && setOpenMenu(null);
    onScroll();
    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const styles = {
    header: {
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: "#ffffff",
      borderBottom: scrolled ? "1px solid #e4e8f2" : "1px solid transparent",
      boxShadow: scrolled ? "0 2px 12px rgba(16,26,61,0.08)" : "none",
      transition: "box-shadow .2s ease, border-color .2s ease",
    },
    inner: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 24px",
      minHeight: isMobile ? 64 : 76,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24,
      position: "relative",
    },
    brand: { display: "flex", alignItems: "center", flexShrink: 0 },
    logo: { height: isMobile ? 38 : 48, width: "auto", display: "block", objectFit: "contain" },
    nav: isMobile
      ? {
          display: open ? "flex" : "none",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 4,
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "#ffffff",
          padding: "12px 24px 20px",
          borderBottom: "1px solid #e4e8f2",
          boxShadow: "0 12px 24px rgba(16,26,61,0.1)",
          maxHeight: "calc(100vh - 64px)",
          overflowY: "auto",
        }
      : { display: "flex", alignItems: "center", gap: 28 },
    link: (isActive, isHover) => ({
      fontSize: "0.98rem",
      fontWeight: isActive ? 700 : 500,
      color: isActive || isHover ? NAVY : MUTED,
      textDecoration: "none",
      whiteSpace: "nowrap",
      padding: isMobile ? "12px 4px" : "6px 0",
      borderBottom: isActive && !isMobile ? `2px solid ${BLUE}` : "2px solid transparent",
      transition: "color .15s ease",
    }),
    menuButton: (isActive, isHover) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: isMobile ? "space-between" : "flex-start",
      width: isMobile ? "100%" : "auto",
      background: "transparent",
      border: "none",
      borderBottom: isActive && !isMobile ? `2px solid ${BLUE}` : "2px solid transparent",
      fontFamily: "inherit",
      fontSize: "0.98rem",
      fontWeight: isActive ? 700 : 500,
      color: isActive || isHover ? NAVY : MUTED,
      cursor: "pointer",
      whiteSpace: "nowrap",
      padding: isMobile ? "12px 4px" : "6px 0",
      transition: "color .15s ease",
    }),
    menuWrap: { position: "relative" },
    panel: isMobile
      ? { padding: "0 0 6px 14px" }
      : { position: "absolute", top: "100%", left: -16, paddingTop: 14, zIndex: 120 },
    panelCard: isMobile
      ? { display: "flex", flexDirection: "column", gap: 2 }
      : {
          minWidth: 220,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          background: "#ffffff",
          border: "1px solid #e4e8f2",
          borderRadius: 14,
          boxShadow: "0 16px 32px rgba(16,26,61,0.14)",
          padding: 8,
        },
    subLink: (isActive, isHover) => ({
      display: "block",
      fontSize: "0.95rem",
      fontWeight: isActive ? 700 : 500,
      color: isActive || isHover ? NAVY : MUTED,
      background: isHover ? "#f3f6fd" : "transparent",
      textDecoration: "none",
      whiteSpace: "nowrap",
      padding: isMobile ? "10px 8px" : "10px 14px",
      borderRadius: 8,
      transition: "background .15s ease, color .15s ease",
    }),
    cta: {
      background: hovered === "cta" ? BLUE : NAVY,
      color: "#ffffff",
      textDecoration: "none",
      whiteSpace: "nowrap",
      fontSize: "0.95rem",
      fontWeight: 600,
      padding: "11px 22px",
      borderRadius: 999,
      textAlign: "center",
      marginTop: isMobile ? 8 : 0,
      transition: "background .15s ease",
      border: "none",
      cursor: "pointer",
      fontFamily: "inherit",
    },
    toggle: {
      display: isMobile ? "flex" : "none",
      flexDirection: "column",
      justifyContent: "center",
      gap: 5,
      width: 40,
      height: 40,
      padding: 8,
      background: "transparent",
      border: "none",
      cursor: "pointer",
    },
    bar: { display: "block", height: 2, width: "100%", background: NAVY, borderRadius: 2 },
  };

  const ctaHover = {
    onMouseEnter: () => setHovered("cta"),
    onMouseLeave: () => setHovered(null),
  };

  const renderLeaf = (l, key, variant) => {
    const hoverProps = {
      onMouseEnter: () => setHovered(key),
      onMouseLeave: () => setHovered(null),
    };
    const isActive = key === activeKey;
    const style = variant === "sub" ? styles.subLink(isActive, hovered === key) : styles.link(isActive, hovered === key);

    return isExternal(l.to) ? (
      <a key={key} href={l.to} target="_blank" rel="noreferrer noopener" style={style} {...hoverProps}>
        {l.label}
      </a>
    ) : (
      <Link key={key} to={l.to} style={style} aria-current={isActive ? "page" : undefined} {...hoverProps}>
        {l.label}
      </Link>
    );
  };

  const renderDropdown = (l) => {
    const key = menuKey(l);
    const isOpen = openMenu === key;
    const isActive = l.children.some((c) => subKey(l, c) === activeKey);

    const wrapProps = isMobile
      ? {}
      : {
          onMouseEnter: () => setOpenMenu(key),
          onMouseLeave: () => setOpenMenu((cur) => (cur === key ? null : cur)),
        };

    return (
      <div key={key} style={styles.menuWrap} {...wrapProps}>
        <button
          type="button"
          style={styles.menuButton(isActive, hovered === key || isOpen)}
          aria-haspopup="true"
          aria-expanded={isOpen}
          onMouseEnter={() => setHovered(key)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => setOpenMenu(isOpen ? null : key)}
        >
          {l.label}
          <Chevron open={isOpen} />
        </button>

        {isOpen && (
          <div style={styles.panel}>
            <div style={styles.panelCard}>
              {l.children.map((c) => renderLeaf(c, subKey(l, c), "sub"))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <Link to="/" style={styles.brand} aria-label="Thinklogics home">
          <img src={Logo} alt="Thinklogics" style={styles.logo} />
        </Link>

        <nav ref={navRef} style={styles.nav} aria-label="Main">
          {links.map((l) => (l.children ? renderDropdown(l) : renderLeaf(l, topKey(l), "top")))}

          {ctaAction === "signup" ? (
            <button type="button" style={styles.cta} {...ctaHover}
              onClick={() => { setOpen(false); openSignup(); }}>
              {ctaLabel}
            </button>
          ) : isExternal(ctaLink) ? (
            <a href={ctaLink} target="_blank" rel="noreferrer noopener" style={styles.cta} {...ctaHover}>
              {ctaLabel}
            </a>
          ) : (
            <Link to={ctaLink} style={styles.cta} {...ctaHover}>{ctaLabel}</Link>
          )}
        </nav>

        <button
          type="button"
          style={styles.toggle}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span style={styles.bar} />
          <span style={styles.bar} />
          <span style={styles.bar} />
        </button>
      </div>
    </header>
  );
}