import React, { useCallback, useEffect, useState } from "react";
import EdnexLogo from "./ednex/EdnexLogo";
import navigate, {
  scrollToSection,
  getHeaderScrollOffset,
} from "./action/navigate";
import { EDNEX_CONTACT, EDNEX_NAV } from "../data/ednexContent";

const SECTION_IDS = EDNEX_NAV.map((n) => n.id);

function Header() {
  const [active, setActive] = useState("home");

  const handleNavClick = useCallback((e, sectionId) => {
    e.preventDefault();
    navigate(`#${sectionId}`);
    setActive(sectionId);
  }, []);

  useEffect(() => {
    const fixedHeader = document.querySelector(".ednex-site-header-fixed");
    const updateHeaderHeight = () => {
      if (!fixedHeader) return;
      document.documentElement.style.setProperty(
        "--ednex-fixed-header-height",
        `${fixedHeader.offsetHeight}px`
      );
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    const ro =
      typeof ResizeObserver !== "undefined" && fixedHeader
        ? new ResizeObserver(updateHeaderHeight)
        : null;
    if (ro && fixedHeader) ro.observe(fixedHeader);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      ro?.disconnect();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const offset = getHeaderScrollOffset();
      let current = "home";
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

  return (
    <>
      <div className="ednex-site-header-fixed">
        <div className="ednex-topbar">
          <div className="ednex-topbar-inner">
            <div className="ednex-topbar-left">
              <div className="ednex-topbar-item">
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                {EDNEX_CONTACT.location}
              </div>
              <div className="ednex-topbar-item">
                <svg viewBox="0 0 24 24" aria-hidden>
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <a href={`mailto:${EDNEX_CONTACT.email}`}>{EDNEX_CONTACT.email}</a>
              </div>
            </div>
            <div>{EDNEX_CONTACT.hours}</div>
          </div>
        </div>

        <header className="ednex-header">
          <div className="ednex-header-inner">
            <a
              href="#home"
              className="ednex-site-logo"
              onClick={(e) => handleNavClick(e, "home")}
            >
              <EdnexLogo />
            </a>
            <ul className="ednex-main-nav">
              {EDNEX_NAV.map((item) => (
                <li key={item.id} className={active === item.id ? "active" : ""}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="ednex-header-phone">
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              Hotline:{" "}
              <a href={`tel:${EDNEX_CONTACT.phoneTel}`}>{EDNEX_CONTACT.phone}</a>
            </div>
          </div>
        </header>
      </div>
      <div className="ednex-header-spacer" aria-hidden="true" />
    </>
  );
}

export default Header;
