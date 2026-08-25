import React, { useCallback } from "react";
import navigate from "../action/navigate";
import { TPS_RANKINGS } from "../../data/tpsContent";

export default function RankingsSection() {
  const goFeature = useCallback((e) => {
    e.preventDefault();
    navigate("#feature");
  }, []);

  return (
    <section className="rankings" id="rankings">
      <div className="wrap">
        <div className="rank-grid">
          {TPS_RANKINGS.map((item) => (
            <article key={item.rank} className="card">
              <div className="card-image">
                <img src={item.image} alt={item.alt} />
                <span className="rank-no">{item.rank}</span>
              </div>
              <div className="card-body">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <a className="outline" href="#feature" onClick={goFeature}>
                  VIEW RANKING →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
