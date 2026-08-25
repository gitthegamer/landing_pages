import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import {
  scrollToSection,
  getHeaderScrollOffset,
} from "./action/navigate";
import { setLanguage } from "./action/preferences";
import LanguageState from "../atoms/LanguageState";
import { TPS_LANGS, TPS_NAV } from "../data/tpsContent";

const SECTION_IDS = [
  "rankings",
  "feature",
  "methodology",
  "about",
  "responsible",
];

function Header() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useRecoilState(LanguageState);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const handleNavClick = useCallback((e, sectionId) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToSection(sectionId);
    setActive(sectionId);
    setMenuOpen(false);
    setLangOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => !open);
    setLangOpen(false);
  }, []);

  const handleLanguageChange = useCallback(
    async (code) => {
      if (code === i18n.language) {
        setLangOpen(false);
        return;
      }
      await setLanguage(code);
      await i18n.changeLanguage(code);
      setLang(code);
      setLangOpen(false);
    },
    [i18n, setLang],
  );

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

  useEffect(() => {
    if (!langOpen) return undefined;
    const onDocClick = () => setLangOpen(false);
    window.addEventListener("click", onDocClick);
    return () => window.removeEventListener("click", onDocClick);
  }, [langOpen]);

  const currentLang =
    TPS_LANGS.find((item) => item.code === (lang || i18n.language)) ||
    TPS_LANGS[0];

  return (
    <>
      <header className="topbar">
        <div className="wrap nav">
          <div
            className="brand-lockup"
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
              className="brand-mark"
              src="/assets/image/logo/logo.png"
              alt="The Play Standard logo"
            />
            <div className="brand-copy">
              {t("tps.brand")}
              <small>{t("tps.brandTagline")}</small>
            </div>
          </div>

          <nav className="navlinks">
            {TPS_NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? "is-active" : ""}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {t(item.labelKey)}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <div
              className={`lang-switch${langOpen ? " is-open" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="lang-switch-btn"
                aria-label={t("tps.lang.label")}
                aria-expanded={langOpen}
                onClick={() => setLangOpen((open) => !open)}
              >
                {currentLang.label}
                <span aria-hidden>⌄</span>
              </button>
              {langOpen && (
                <ul className="lang-switch-menu" role="listbox">
                  {TPS_LANGS.map((item) => (
                    <li key={item.code}>
                      <button
                        type="button"
                        className={
                          item.code === currentLang.code ? "is-active" : ""
                        }
                        onClick={() => handleLanguageChange(item.code)}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <a
              className="vote-now"
              href="#rankings"
              onClick={(e) => handleNavClick(e, "rankings")}
            >
              {t("tps.voteNow")}
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
                {t(item.labelKey)}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-lang">
          {TPS_LANGS.map((item) => (
            <button
              key={item.code}
              type="button"
              className={item.code === currentLang.code ? "is-active" : ""}
              onClick={() => handleLanguageChange(item.code)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <a
          className="vote-now mobile-vote"
          href="#rankings"
          onClick={(e) => handleNavClick(e, "rankings")}
        >
          {t("tps.voteNow")}
        </a>
      </nav>
    </>
  );
}

export default Header;
