import React, { useCallback } from "react";
import navigate from "../action/navigate";
import { TPS_FEATURE } from "../../data/tpsContent";

export default function FeatureSection() {
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
            <small>{f.monthLabel}</small>
            <b>{f.monthRank}</b>
          </div>
          <div className="platform-img">
            <img src={f.platformImage} alt={f.platformAlt} />
          </div>
          <div className="score">
            <div className="label">TPS SCORE</div>
            <div>
              <b>{f.score}</b>
              <span>/{f.scoreMax}</span>
            </div>
            <div className="stars">{f.stars}</div>
            <small>
              {f.votesLabel} <em>{f.votesNote}</em>
            </small>
          </div>
          <div className="move">
            <strong>{f.overall}</strong>
            <div className="up">{f.move}</div>
            <span>{f.moveLabel}</span>
            <a className="cta" href="#methodology" onClick={goMethodology}>
              VIEW FULL RANKING →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
