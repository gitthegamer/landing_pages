import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import navigate from "../action/navigate";
import { TPS_FEATURE } from "../../data/tpsContent";

export default function FeatureSection() {
  const { t } = useTranslation();

  const goMethodology = useCallback((e) => {
    e.preventDefault();
    navigate("#methodology");
  }, []);

  const f = TPS_FEATURE;

  return (
    <section className="feature" id="feature">
      <div className="wrap">
        <div className="featurebox">
          <div className="month">
            <small>{t(f.monthLabelKey)}</small>
            <b>{f.monthRank}</b>
          </div>
          <div className="platform-img">
            <img src={f.platformImage} alt={f.platformAlt} />
          </div>
          <div className="score">
            <div className="label">{t(f.scoreLabelKey)}</div>
            <div>
              <b>{f.score}</b>
              <span>/{f.scoreMax}</span>
            </div>
            <div className="stars">{f.stars}</div>
            <small>
              {t(f.votesLabelKey)} <em>{t(f.votesNoteKey)}</em>
            </small>
          </div>
          <div className="move">
            <strong>{t(f.overallKey)}</strong>
            <div className="up">{f.move}</div>
            <span>{t(f.moveLabelKey)}</span>
            <a className="cta" href="#methodology" onClick={goMethodology}>
              {t(f.ctaKey)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
