import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import navigate from "../action/navigate";
import { TPS_CHAMPIONS, TPS_STATS } from "../../data/tpsContent";

function ChampLogo({ champ }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <span className="sponsor-word">{champ.logoAlt}</span>;
  }
  return (
    <img
      src={champ.logo}
      alt={champ.logoAlt}
      onError={() => setFailed(true)}
    />
  );
}

export default function HeroSlider() {
  const { t } = useTranslation();

  const goRankings = useCallback((e) => {
    e.preventDefault();
    navigate("#rankings");
  }, []);

  return (
    <section className="hero">
      <img
        className="hero-photo left"
        src="/assets/image/tps/hero-left.jpg"
        alt="Casino roulette and chips"
      />
      <img
        className="hero-photo right"
        src="/assets/image/tps/hero-right.jpg"
        alt="Premium cards and casino details"
      />
      <div className="hero-overlay" />
      <div className="wrap hero-content">
        <div className="eyebrow">{t("tps.hero.eyebrow")}</div>
        <div className="category-kicker">{t("tps.hero.categoryKicker")}</div>
        <div className="category-title">{t("tps.hero.categoryTitle")}</div>
        <div className="category-sub">{t("tps.hero.categorySub")}</div>

        <div className="champion-banner" aria-label="Category winners demo">
          {TPS_CHAMPIONS.map((champ) => (
            <div
              key={champ.id}
              className={`champ${champ.featured ? " featured" : ""}`}
            >
              <div className="award-icon">{champ.icon}</div>
              <div className="champ-label">{t(champ.labelKey)}</div>
              <div className="champ-logo">
                <ChampLogo champ={champ} />
              </div>
              <div className="award-name">{t(champ.nameKey)}</div>
              <div className="award-desc">{t(champ.descKey)}</div>
              <div className="award-tag">{t(champ.tagKey)}</div>
            </div>
          ))}
        </div>

        <div className="champion-note">{t("tps.hero.championNote")}</div>

        <h1>{t("tps.brand")}</h1>
        <div className="orn">—— ♛ ——</div>
        <h2>
          {t("tps.hero.h2a")}
          <br />
          {t("tps.hero.h2b")} <em>{t("tps.hero.h2em")}</em> {t("tps.hero.h2c")}
        </h2>
        <p>{t("tps.hero.p")}</p>
        <a className="cta" href="#rankings" onClick={goRankings}>
          {t("tps.hero.cta")}
        </a>
        <div className="stats">
          {TPS_STATS.map((stat) => (
            <div key={stat.labelKey} className="stat">
              <b>{stat.value}</b>
              <span>{t(stat.labelKey)}</span>
              <i className="demo">{t(stat.noteKey)}</i>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
