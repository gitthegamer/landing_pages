import React from "react";
import { EDNEX_WHY } from "../../data/ednexContent";

export default function WhyUsSection() {
  return (
    <div className="ednex-section-wrap" id="why">
      <div className="ednex-container">
        <div className="ednex-section-title-wrap">
          <div className="ednex-section-eyebrow">Why Choose Us</div>
          <h2 className="ednex-section-title">THE EDNEX ADVANTAGE</h2>
        </div>
        <div className="ednex-why-grid">
          {EDNEX_WHY.map((item) => (
            <div key={item.title} className="ednex-why-card">
              <div className="ednex-why-icon">
                <img src={item.icon} alt={item.title} />
              </div>
              <div className="ednex-why-title">{item.title}</div>
              <p className="ednex-why-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
