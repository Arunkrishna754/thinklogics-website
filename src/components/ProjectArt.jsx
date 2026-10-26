// Small abstract illustrations for the featured projects.
export default function ProjectArt({ kind, src, alt = "" }) {
  if (src) {
    return (
      <div className="art">
        <img src={src} alt={alt} loading="lazy" />
      </div>
    );
  }
  return (
    <div className="art" role="img" aria-label={`Illustration of the ${kind} project`}>
      {kind === "dashboard" && (
        <svg viewBox="0 0 360 240">
          <rect x="24" y="24" width="312" height="192" rx="14" fill="#1B2A5C" />
          <circle cx="44" cy="42" r="4" fill="#FF6B6B" /><circle cx="58" cy="42" r="4" fill="var(--w4)" /><circle cx="72" cy="42" r="4" fill="var(--w3)" />
          <rect x="44" y="150" width="30" height="46" rx="5" fill="var(--w1)" />
          <rect x="84" y="126" width="30" height="70" rx="5" fill="var(--w2)" />
          <rect x="124" y="100" width="30" height="96" rx="5" fill="var(--w3)" />
          <rect x="164" y="136" width="30" height="60" rx="5" fill="var(--w4)" />
          <path d="M44 120 L84 100 L124 80 L164 96" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity=".8" />
          <rect x="216" y="66" width="104" height="38" rx="12" fill="#fff" opacity=".12" />
          <rect x="226" y="78" width="70" height="6" rx="3" fill="#fff" opacity=".7" />
          <rect x="226" y="90" width="44" height="6" rx="3" fill="#fff" opacity=".4" />
          <rect x="232" y="118" width="88" height="38" rx="12" fill="var(--w1)" />
          <rect x="242" y="130" width="60" height="6" rx="3" fill="#fff" />
          <rect x="242" y="142" width="38" height="6" rx="3" fill="#fff" opacity=".6" />
        </svg>
      )}
      {kind === "basket" && (
        <svg viewBox="0 0 360 240">
          <rect x="24" y="24" width="312" height="192" rx="14" fill="#1B2A5C" />
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => {
              const colors = ["var(--w1)", "var(--w2)", "var(--w3)", "var(--w4)"];
              const fill = colors[(r + c) % 4];
              return (
                <g key={`${r}-${c}`}>
                  <rect x={44 + c * 70} y={44 + r * 52} width="58" height="42" rx="9" fill={fill} opacity=".9" />
                  <rect x={52 + c * 70} y={68 + r * 52} width="34" height="5" rx="2.5" fill="#fff" opacity=".7" />
                </g>
              );
            })
          )}
          <path d="M262 190 L282 160 L302 172 L322 124" fill="none" stroke="var(--w4)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="322" cy="124" r="5" fill="var(--w4)" />
        </svg>
      )}
      {kind === "doc" && (
        <svg viewBox="0 0 360 240">
          <rect x="24" y="24" width="312" height="192" rx="14" fill="#1B2A5C" />
          <rect x="70" y="44" width="150" height="152" rx="10" fill="#fff" opacity=".95" />
          <rect x="88" y="66" width="70" height="8" rx="4" fill="var(--ink)" />
          <rect x="88" y="90" width="114" height="6" rx="3" fill="#C5CCE0" />
          <rect x="88" y="106" width="104" height="6" rx="3" fill="#C5CCE0" />
          <rect x="88" y="122" width="114" height="6" rx="3" fill="#C5CCE0" />
          <rect x="88" y="138" width="80" height="6" rx="3" fill="#C5CCE0" />
          <rect x="88" y="162" width="40" height="18" rx="9" fill="var(--w2)" />
          <path d="M270 70 L312 86 V122 C312 148 294 166 270 176 C246 166 228 148 228 122 V86 Z" fill="var(--w3)" />
          <path d="m253 122 12 12 22-24" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}