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
              <div className="ednex-about-img-badge-num text-color-white">15+</div>
              <div className="ednex-about-img-badge-txt text-color-white">
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
              Established in LG1-2, Seri Gembira Avenue, No.6, Jalan Senang Ria,
              Kuchai Lama, 58200 Kuala Lumpur, EDNEX SDN. BHD. is a leading
              supplier and distributor of heavy truck parts nationwide. We
              specialize in both new and pre-owned components for major
              commercial vehicle brands.
            </p>
            <p>
              Our extensive warehouse is managed with strict operational
              procedures to ensure consistent stock availability, efficient
              storage, and timely delivery to customers across the country.
            </p>
            <p>
              We also provide a comprehensive range of products for the heavy
              transport industry, including engines, gearboxes, axles, chassis
              components, and precision engine parts.
            </p>
            <ul className="ednex-about-points">
              <li>
                Supporting brands such as Volvo, Scania, Mercedes-Benz, and more
              </li>
              <li>From complete engines to individual components</li>
              <li>Nationwide delivery across all 13 states</li>
              <li>Reliable after-sales support and technical consultation</li>
            </ul>
            <p>
              <strong>
                Delivering quality products and services you can depend on.
              </strong>
            </p>
            <a
              className="ednex-btn-main text-color-white"
              {...sectionNavProps("contact", onNav)}
            >
              Enquire Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
