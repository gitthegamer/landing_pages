import React, { useCallback, useEffect, useState } from "react";
import {
  scrollToSection,
  getHeaderScrollOffset,
} from "./action/navigate";
import { TPS_NAV } from "../data/tpsContent";

const SECTION_IDS = [
  "rankings",
  "feature",
  "methodology",
  "about",
  "responsible",
];

function Header() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const handleNavClick = useCallback((e, sectionId) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToSection(sectionId);
    setActive(sectionId);
    setMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => !open);
  }, []);

  useEffect(() => {
    const topbar = document.querySelector(".tps-site .topbar");
    const updateHeaderHeight = () => {
      if (!topbar) return;
      document.documentElement.style.setProperty(
        "--tps-fixed-header-height",
        `${topbar.offsetHeight}px`,
      );
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    const ro =
      typeof ResizeObserver !== "undefined" && topbar
        ? new ResizeObserver(updateHeaderHeight)
        : null;
    if (ro && topbar) ro.observe(topbar);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      ro?.disconnect();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const offset = getHeaderScrollOffset();
      let current = "";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() => scrollToSection(hash));
    }
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) closeMenu();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [closeMenu]);

  return (
    <>
      <header className="topbar">
        <div className="wrap nav">
          <div
            className="brand"
            role="button"
            tabIndex={0}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActive("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setActive("");
              }
            }}
          >
            <img
              className="brand-logo"
              src="/assets/image/logo/logo.png"
              alt="The Play Standard"
            />
            <span className="brand-text">
              THE PLAY STANDARD
              <small>RANKED BY PLAYERS. BUILT ON TRUST.</small>
            </span>
          </div>
          <nav className="navlinks">
            {TPS_NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? "is-active" : ""}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            className="vote-now"
            href="#rankings"
            onClick={(e) => handleNavClick(e, "rankings")}
          >
            ♔ VOTE NOW
          </a>
          <button
            type="button"
            className={`menu-toggle${menuOpen ? " is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="tps-mobile-nav"
            onClick={toggleMenu}
          >
            <span className="menu-toggle-bar" />
            <span className="menu-toggle-bar" />
            <span className="menu-toggle-bar" />
          </button>
        </div>
      </header>

      <div
        className={`mobile-nav-backdrop${menuOpen ? " is-open" : ""}`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      />

      <nav
        id="tps-mobile-nav"
        className={`mobile-nav${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className="mobile-nav-list">
          {TPS_NAV.map((item) => (
            <li key={item.id} className={active === item.id ? "is-active" : ""}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          className="vote-now mobile-vote"
          href="#rankings"
          onClick={(e) => handleNavClick(e, "rankings")}
        >
          ♔ VOTE NOW
        </a>
      </nav>
    </>
  );
}

export default Header;
