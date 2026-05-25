import React from "react";
import { EDNEX_SERVICES } from "../../data/ednexContent";
import { useSectionNav, sectionNavProps } from "./useSectionNav";

export default function ServicesSection() {
  const onNav = useSectionNav();

  return (
    <div className="ednex-section-wrap grey" id="services">
      <div className="ednex-container">
        <div className="ednex-section-title-wrap">
          <div className="ednex-section-eyebrow">What We Do</div>
          <h2 className="ednex-section-title">OUR SERVICES</h2>
        </div>
        <div className="ednex-svc-grid">
          {EDNEX_SERVICES.map((svc) => (
            <div key={svc.title} className="ednex-svc-card">
              <div className="ednex-svc-img">
                <img src={svc.image} alt={svc.title} />
              </div>
              <div className="ednex-svc-body">
                <div className="ednex-svc-num">{svc.num}</div>
                <div className="ednex-svc-title">{svc.title}</div>
                <p className="ednex-svc-desc">{svc.desc}</p>
                <a className="ednex-btn-outline-dark" {...sectionNavProps("contact", onNav)}>
                  {svc.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
