import { useEffect, useState, useCallback } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("cp-theme") as "dark" | "light") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("cp-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const navLinks = [
    { label: "Platform", hasDropdown: true },
    { label: "Solutions", hasDropdown: true },
    { label: "Partners" },
    { label: "About Us" },
    { label: "Contact Us" },
    { label: "Support" },
  ];

  return (
    <>
      <nav id="navbar" className={scrolled ? "scrolled" : ""} role="navigation" aria-label="Main navigation">
        <a href="#" className="nav-logo" aria-label="CompliancePilot AI">
          <div className="logo-mark" aria-hidden="true">🛡️</div>
          <div className="logo-wordmark">
            <div className="l1">CompliancePilot AI</div>
          </div>
        </a>

        <ul className="nav-center" role="menubar">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href="#" role="menuitem">
                {link.label}
                {link.hasDropdown && (
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a href="#" className="btn btn-ghost"><span className="btn-shine" />Login</a>
          <a href="#" className="btn btn-blue"><span className="btn-shine" />Sign Up</a>
          <a href="#" className="btn btn-orange"><span className="btn-shine" />Book a Demo</a>
        </div>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          title="Toggle theme"
        >
          <span className="theme-toggle-icon" aria-hidden="true">
            {theme === "light" ? "☀️" : "🌙"}
          </span>
        </button>

        <button
          className={`hamburger ${mobileOpen ? "open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen}>
        {navLinks.map((link) => (
          <a href="#" key={link.label} onClick={closeMobile}>{link.label}</a>
        ))}
        <div className="mob-div" />
        <div className="mob-acts">
          <a href="#" className="btn btn-ghost" onClick={closeMobile}><span className="btn-shine" />Login</a>
          <a href="#" className="btn btn-blue" onClick={closeMobile}><span className="btn-shine" />Sign Up</a>
          <a href="#" className="btn btn-orange" onClick={closeMobile}><span className="btn-shine" />Book a Demo</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
