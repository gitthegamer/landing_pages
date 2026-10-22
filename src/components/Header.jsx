import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { scrollToSection } from "./action/navigate";
import { setLanguage } from "./action/preferences";
import i18n from "../i18n";
import LanguageState from "../atoms/LanguageState";
import { NP_NAV } from "../data/nextplayContent";

function Header() {
  const { t, i18n: i18nHook } = useTranslation();
  const [lang, setLang] = useRecoilState(LanguageState);
  const isZh = (lang || i18nHook.language || "en").startsWith("cn");

  const handleNavClick = useCallback((e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  }, []);

  const toggleLang = useCallback(async () => {
    const next = isZh ? "en" : "cn";
    try {
      await i18n.changeLanguage(next);
      setLang(next);
      document.documentElement.lang = next === "cn" ? "zh" : "en";
    } catch (error) {
      console.error("Failed to change language", error);
      return;
    }
    try {
      await setLanguage(next);
    } catch (error) {
      console.warn("Failed to persist language", error);
    }
  }, [isZh, setLang]);

  useEffect(() => {
    const nav = document.querySelector(".np-site .np-nav");
    const updateHeaderHeight = () => {
      if (!nav) return;
      document.documentElement.style.setProperty(
        "--np-fixed-header-height",
        `${nav.offsetHeight}px`,
      );
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  useLayoutEffect(() => {
    // Keep a refresh on the hero. A leftover #contact hash scrolls to the CTA.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <nav className="np-nav">
      <img
        src="/assets/image/logo/logo.png"
        alt="7E Next Play"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
      <div className="links">
        {NP_NAV.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleNavClick(e, item.id)}
          >
            {t(item.labelKey)}
          </a>
        ))}
        <a
          className="btn"
          href="#contact"
          onClick={(e) => handleNavClick(e, "contact")}
        >
          {t("np.nav.start")}
        </a>
        <button type="button" className="lang" onClick={toggleLang}>
          <span className="lang-full">EN / 中文</span>
          <span className="lang-current">{isZh ? "中文" : "EN"}</span>
        </button>
      </div>
    </nav>
  );
}

export default Header;
