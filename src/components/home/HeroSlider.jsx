import React, { useCallback } from "react";
import navigate from "../action/navigate";
import { TPS_STATS } from "../../data/tpsContent";

export default function HeroSlider() {
  const goRankings = useCallback(
    (e) => {
      e.preventDefault();
      navigate("#rankings");
    },
    [],
  );

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
        <div className="eyebrow">PREMIUM PLAYER-POWERED RANKINGS · DEMO</div>
        <h1>THE PLAY STANDARD</h1>
        <div className="orn">—— ♛ ——</div>
        <h2>
          Where Players
          <br />
          Set <em>the</em> Standard.
        </h2>
        <p>Independent rankings shaped by real player votes.</p>
        <a className="cta" href="#rankings" onClick={goRankings}>
          EXPLORE RANKINGS&nbsp; →
        </a>
        <div className="stats">
          {TPS_STATS.map((stat) => (
            <div key={stat.label} className="stat">
              <b>{stat.value}</b>
              <span>{stat.label}</span>
              <i className="demo">{stat.note}</i>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
