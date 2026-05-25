import React from "react";
import { useSectionNav, sectionNavProps } from "./useSectionNav";

export default function AboutSection() {
  const onNav = useSectionNav();

  return (
    <div className="ednex-section-wrap" id="about">
      <div className="ednex-container">
        <div className="ednex-about-grid">
          <div className="ednex-about-img">
            <img src="/assets/image/ednex/about.jpg" alt="EDNEX Workshop" />
            <div className="ednex-about-img-badge">
              <div className="ednex-about-img-badge-num">15+</div>
              <div className="ednex-about-img-badge-txt">
                Years of
                <br />
                Excellence
              </div>
            </div>
          </div>
          <div className="ednex-about-content">
            <div className="ednex-section-eyebrow">About Us</div>
            <h2 className="ednex-section-title left">EDNEX SDN.BHD.</h2>
            <p>
              Established in Johor, Malaysia, EDNEX SDN.BHD. is one of the leading
              suppliers and distributors of heavy truck parts in Malaysia. We are
              specialists in new and used parts for major commercial vehicle brands.
            </p>
            <p>
              Our mega warehouse is equipped with strict internal operating procedures
              to ensure prompt stock availability, convenient storage system and prompt
              delivery of our products to our customers nationwide.
            </p>
            <p>
              We are also specialised in the supply of engines, gearboxes, axles, chassis
              components and precision engine parts for the heavy transport industry.
            </p>
            <ul className="ednex-about-points">
              <li>Volvo, Scania, Mercedes-Benz &amp; more</li>
              <li>Complete engines to individual components</li>
              <li>Nationwide delivery — all 13 states</li>
              <li>After-sales support &amp; technical consultation</li>
            </ul>
            <p>
              <strong>QUALITY PRODUCTS &amp; SERVICES YOU CAN TRUST!</strong>
            </p>
            <a className="ednex-btn-main" {...sectionNavProps("contact", onNav)}>
              Enquire Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
