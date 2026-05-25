import React from "react";
import { EDNEX_STATS } from "../../data/ednexContent";

export default function StatsBar() {
  return (
    <div className="ednex-stats-bar">
      <div className="ednex-container">
        <div className="ednex-stats-grid">
          {EDNEX_STATS.map((stat) => (
            <div key={stat.lbl} className="ednex-stat-item">
              <div className="ednex-stat-num">{stat.num}</div>
              <div className="ednex-stat-lbl">{stat.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
