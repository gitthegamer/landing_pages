import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import {
  scrollToSection,
  getHeaderScrollOffset,
} from "./action/navigate";
import { setLanguage } from "./action/preferences";
import i18n from "../i18n";
import LanguageState from "../atoms/LanguageState";
import { TPS_NAV } from "../data/tpsContent";

const SECTION_IDS = ["methodology", "about", "responsible"];
const HEADER_LANGS = [
  { code: "en", label: "EN" },
  { code: "cn", label: "CN" },
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n: i18nHook } = useTranslation();
  const [lang, setLang] = useRecoilState(LanguageState);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const activeLang = (lang || i18nHook.language || i18n.language || "en").split(
    "-",
  )[0];

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const handleNavClick = useCallback(
    (e, item) => {
      e.preventDefault();
      e.stopPropagation();
      setMenuOpen(false);
      if (item.to) {
        navigate(item.to);
        window.scrollTo({ top: 0 });
        return;
      }
      if (location.pathname !== "/") {
        navigate(`/#${item.id}`);
        return;
      }
      scrollToSection(item.id);
      setActive(item.id);
    },
    [location.pathname, navigate],
  );

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => !open);
  }, []);

  const handleLanguageChange = useCallback(
    async (code) => {
      const next = String(code || "en").toLowerCase();
      if (!["en", "cn", "bm"].includes(next)) return;

      setMenuOpen(false);

      try {
        await i18n.changeLanguage(next);
        setLang(next);
      } catch (error) {
        console.error("Failed to change language", error);
        return;
      }

      try {
        await setLanguage(next);
      } catch (error) {
        // Preferences may fail on some web contexts; UI language still switched.
        console.warn("Failed to persist language", error);
      }
    },
    [setLang],
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

  const isItemActive = (item) => {
    if (item.to) return location.pathname === item.to;
    return location.pathname === "/" && active === item.id;
  };

  const goHome = useCallback(() => {
    setActive("");
    setMenuOpen(false);
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate("/");
    window.scrollTo({ top: 0 });
  }, [navigate]);

  return (
    <>
      <header className="topbar">
        <div className="wrap nav">
          <Link
            className="brand-lockup"
            to="/"
            onClick={goHome}
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
          </Link>

          <nav className="navlinks">
            {TPS_NAV.map((item) => (
              <a
                key={item.id}
                href={item.to || `#${item.id}`}
                className={isItemActive(item) ? "is-active" : ""}
                onClick={(e) => handleNavClick(e, item)}
              >
                {t(item.labelKey)}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <div className="lang-switch" aria-label={t("tps.lang.label")}>
              {HEADER_LANGS.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className={item.code === activeLang ? "is-active" : ""}
                  onClick={() => handleLanguageChange(item.code)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Link className="vote-now" to="/rankings">
              {t("tps.voteNow")}
            </Link>

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
            <li key={item.id} className={isItemActive(item) ? "is-active" : ""}>
              <a
                href={item.to || `#${item.id}`}
                onClick={(e) => handleNavClick(e, item)}
              >
                {t(item.labelKey)}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-lang lang-switch">
          {HEADER_LANGS.map((item) => (
            <button
              key={item.code}
              type="button"
              className={item.code === activeLang ? "is-active" : ""}
              onClick={() => handleLanguageChange(item.code)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <Link className="vote-now mobile-vote" to="/rankings" onClick={closeMenu}>
          {t("tps.voteNow")}
        </Link>
      </nav>
    </>
  );
}

export default Header;
