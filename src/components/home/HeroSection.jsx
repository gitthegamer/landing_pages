import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { scrollToSection } from "../action/navigate";
import { NP_MINI_FEATURES } from "../../data/nextplayContent";

export default function HeroSection() {
  const { t } = useTranslation();

  const go = useCallback((e, id) => {
    e.preventDefault();
    scrollToSection(id);
  }, []);

  return (
    <header className="hero">
      <div className="hero-copy">
        <div className="eyebrow">{t("np.hero.eyebrow")}</div>
        <h1 dangerouslySetInnerHTML={{ __html: t("np.hero.titleHtml") }} />
        <p>{t("np.hero.desc")}</p>
        <div className="mini-features">
          {NP_MINI_FEATURES.map((key) => (
            <span key={key}>{t(key)}</span>
          ))}
        </div>
        <div className="actions">
          <a className="btn" href="#contact" onClick={(e) => go(e, "contact")}>
            {t("np.nav.start")}
          </a>
          <a
            className="ghost"
            href="#solutions"
            onClick={(e) => go(e, "solutions")}
          >
            {t("np.hero.explore")}
          </a>
        </div>
      </div>
      <div className="visual" aria-hidden="true" />
    </header>
  );
}
