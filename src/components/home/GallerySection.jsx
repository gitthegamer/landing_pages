import React from "react";
import { EDNEX_GALLERY } from "../../data/ednexContent";

export default function GallerySection() {
  return (
    <div className="ednex-section-wrap grey" id="gallery">
      <div className="ednex-container">
        <div className="ednex-section-title-wrap">
          <div className="ednex-section-eyebrow">Inside Our Facility</div>
          <h2 className="ednex-section-title">OUR WORKSHOP &amp; INVENTORY</h2>
        </div>
        <div className="ednex-gal-grid">
          {EDNEX_GALLERY.map((img) => (
            <div key={img.src} className="ednex-gal-item">
              <img src={img.src} alt={img.alt} />
              <div className="ednex-gal-overlay" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
