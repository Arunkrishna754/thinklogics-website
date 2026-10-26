import { lazy, Suspense } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { ContentProvider } from "./context/Contentcontext";
import { SignupProvider } from "./context/Signupcontext";
import Home from "./pages/Home";
import Paths from "./pages/Paths";
import Certification from "./pages/Certification";
import Academy from "./pages/Academy";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Start from "./pages/Start";
import Roadmap from "./pages/Roadmap";
import NavbarSettings from "./admin/pages/NavbarSettings";

// The admin panel is loaded only when someone opens /admin.
const AdminApp = lazy(() => import("./admin/AdminApp"));

function NotFound() {
  return (
    <section className="section">
      <div className="container narrow">
        <h1>That page does not exist</h1>
        <p className="lede">The link may be old or mistyped. Head back to the start.</p>
        <Link className="btn btn--primary" to="/">Go to the home page</Link>
      </div>
    </section>
  );
}

function PublicSite() {
  const location = useLocation();
  return (
    <ContentProvider>
      {/* The signup popup lives here, so any page or the navbar can open it */}
      <SignupProvider>
        <ScrollToTop />
        <a className="skip-link" href="#main">Skip to content</a>
        <Navbar />
        <main id="main" key={location.pathname} className="page">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/paths" element={<Paths />} />
            <Route path="/certification" element={<Certification />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/start" element={<Start />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="navbar" element={<NavbarSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </SignupProvider>
    </ContentProvider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<div className="splash" role="status">Loading</div>}>
            <AdminApp />
          </Suspense>
        }
      />
      <Route path="*" element={<PublicSite />} />
    </Routes>
  );
}