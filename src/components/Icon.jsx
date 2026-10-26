const common = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export default function Icon({ name }) {
  switch (name) {
    case "code":
      return (<svg {...common}><path d="m8 7-5 5 5 5" /><path d="m16 7 5 5-5 5" /><path d="m14 4-4 16" /></svg>);
    case "data":
      return (<svg {...common}><ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" /><path d="M4.5 5.5v6.5c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V5.5" /><path d="M4.5 12v6.5c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V12" /></svg>);
    case "layers":
      return (<svg {...common}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></svg>);
    case "shield":
      return (<svg {...common}><path d="M12 3 4.5 6v5.5c0 4.5 3.1 8 7.5 9.5 4.4-1.5 7.5-5 7.5-9.5V6L12 3Z" /><path d="m8.8 12 2.2 2.2 4.2-4.4" /></svg>);
    case "users":
      return (<svg {...common}><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.4-3.4 2.9-5.4 6-5.4s5.6 2 6 5.4" /><circle cx="17.5" cy="9" r="2.4" /><path d="M16.5 14.4c2.5.2 4.2 1.8 4.5 4.6" /></svg>);
    case "spark":
      return (<svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></svg>);
    case "check":
      return (<svg {...common} strokeWidth={2.6}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>);
    default:
      return null;
  }
}