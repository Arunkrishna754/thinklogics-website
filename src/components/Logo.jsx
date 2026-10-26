export default function Logo({ light = false }) {
  return (
    <span className={"logo" + (light ? " logo--light" : "")}>
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
        <rect className="logo__mark" width="34" height="34" rx="9" />
        <rect x="7" y="19" width="4" height="8" rx="2" fill="var(--w1)" />
        <rect x="12.5" y="15" width="4" height="12" rx="2" fill="var(--w2)" />
        <rect x="18" y="11" width="4" height="16" rx="2" fill="var(--w3)" />
        <rect x="23.5" y="7" width="4" height="20" rx="2" fill="var(--w4)" />
      </svg>
      <span className="logo__text">
        <strong>Thinklogics</strong>
        <span>AI Engineering Academy</span>
      </span>
    </span>
  );
}