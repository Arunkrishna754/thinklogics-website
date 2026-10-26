import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { resourceList } from "./adminSchemas";
import { meta } from "./adminMeta";
import AdminIcon from "./components/Adminicon";
import Logo from "../components/Logo";

const initials = (name = "") =>
  name.split(" ").filter(Boolean).map((s) => s[0]).slice(0, 2).join("").toUpperCase() || "A";

function NavItem({ to, end, icon, color, children }) {
  return (
    <NavLink to={to} end={end} className="navitem" style={{ "--c": color }}>
      <AdminIcon name={icon} size={19} />
      <span>{children}</span>
    </NavLink>
  );
}

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={"adminshell" + (open ? " is-open" : "")}>
      <header className="admintop">
        <button type="button" className="iconbtn" aria-label="Open menu" aria-expanded={open} aria-controls="admin-nav" onClick={() => setOpen(true)}>
          <AdminIcon name="menu" />
        </button>
        <strong className="admintop__title">Thinklogics Admin</strong>
      </header>

      <div className="adminscrim" onClick={close} aria-hidden="true" />

      <aside className="adminside" id="admin-nav">
        <div className="adminside__head">
          <Link to="/admin" className="adminside__brand" aria-label="Admin home" onClick={close}>
            <Logo light />
          </Link>
          <span className="adminside__tag">Admin</span>
        </div>

        <nav aria-label="Admin" onClick={close}>
          <NavItem to="/admin" end icon="dashboard" color="#fff">Dashboard</NavItem>

          <p className="adminside__group">Site content</p>
          <NavItem
            to="/admin/navbar"
            icon={meta.navbar?.icon || "menu"}
            color={meta.navbar?.color || "var(--w2)"}
          >
            Navbar
          </NavItem>
          {resourceList.map((r) => (
            <NavItem key={r.key} to={`/admin/${r.key}`} icon={meta[r.key]?.icon} color={meta[r.key]?.color}>
              {r.label}
            </NavItem>
          ))}

          <p className="adminside__group">Manage</p>
          <NavItem to="/admin/settings" icon="settings" color="var(--w4)">Site settings</NavItem>
          <NavItem to="/admin/enrollments" icon="inbox" color="var(--w3)">Enrollments</NavItem>
        </nav>

        <div className="usercard">
          <span className="usercard__avatar" aria-hidden="true">{initials(user?.name)}</span>
          <div className="usercard__who">
            <strong>{user?.name}</strong>
            <span>{user?.email}</span>
          </div>
          <a className="iconbtn iconbtn--dark" href="/" target="_blank" rel="noreferrer" aria-label="View public site" title="View public site">
            <AdminIcon name="external" size={17} />
          </a>
          <button type="button" className="iconbtn iconbtn--dark" onClick={logout} aria-label="Log out" title="Log out">
            <AdminIcon name="logout" size={17} />
          </button>
        </div>
      </aside>

      <main className="adminmain">
        <div className="adminpage" key={pathname}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}