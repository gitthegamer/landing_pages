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
      <div className="visual">
        <div className="visual-shell">
          <div className="growth">↗</div>
          <div className="float-card fc1">
            <b>{t("np.hero.morePlayers")}</b>
            <span>{t("np.hero.morePossibilities")}</span>
          </div>
          <div className="float-card fc2">
            <b>{t("np.hero.smarterOps")}</b>
            <span>{t("np.hero.builtForGrowth")}</span>
          </div>
          <div className="ring" />
          <div className="ring r2" />
          <div className="orb">
            <div className="orb-grid" />
            <img
              className="orb-logo"
              src="/assets/image/logo/logo.png"
              alt="7E Next Play"
            />
          </div>
          <div className="platform" />
        </div>
      </div>
    </header>
  );
}
