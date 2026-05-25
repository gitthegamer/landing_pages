import React from "react";
import { EDNEX_PARTS, EDNEX_BRANDS } from "../../data/ednexContent";
import { useSectionNav, sectionNavProps } from "./useSectionNav";

export default function PartsSection() {
  const onNav = useSectionNav();

  return (
    <div className="ednex-section-wrap ednex-parts-bg" id="parts">
      <div className="ednex-container">
        <div className="ednex-parts-grid-layout">
          <div className="ednex-parts-content">
            <div className="ednex-section-eyebrow">Full Range of Parts</div>
            <h2 className="ednex-section-title left white">
              HEAVY TRUCK PARTS WE SUPPLY
            </h2>
            <p>
              Our extensive warehouse stocks heavy truck parts for all major commercial
              vehicle brands. From complete engine assemblies to individual precision
              components — we have everything needed to keep your fleet on the road.
            </p>
            <p>
              Our experience and knowledge about heavy commercial vehicles is top-match.
              We beat the competition with the best prices on the market for quality you
              can rely on.
            </p>
            <div className="ednex-parts-list">
              {EDNEX_PARTS.map((part) => (
                <span key={part} className="ednex-parts-list-item">
                  {part}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="ednex-section-eyebrow">Brands We Stock</div>
            <h2 className="ednex-section-title left white">MAJOR TRUCK BRANDS</h2>
            <div className="ednex-brands-grid">
              {EDNEX_BRANDS.map((brand) => (
                <div key={brand} className="ednex-brand-chip">
                  {brand}
                </div>
              ))}
            </div>
            <br />
            <a className="ednex-btn-main" {...sectionNavProps("contact", onNav)}>
              Enquire About Parts
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
