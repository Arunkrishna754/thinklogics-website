import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useContent } from "../context/Contentcontext";

const YEAR = new Date().getFullYear();

export default function Footer() {
  const { weeks, settings } = useContent();
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__about">
          <Logo light />
          <p>{settings.footerText}</p>
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/paths">Learning paths</Link></li>
            <li><Link to="/certification">Certification</Link></li>
            <li><Link to="/academy">30-day academy</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <div>
          <h4>The four weeks</h4>
          <ul>
            {weeks.map((w) => (
              <li key={w.id}>
                <Link to="/academy">
                  <i className="dot" style={{ background: w.color }} />
                  Week {w.id}: {w.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a></li>
            <li><Link to="/start">Start the program</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer__base">
        <span>© {YEAR} Thinklogics. All rights reserved.</span>
      </div>
    </footer>
  );
}