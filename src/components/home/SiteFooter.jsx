import React from "react";
import { EDNEX_CONTACT, EDNEX_NAV } from "../../data/ednexContent";
import { useSectionNav, sectionNavProps } from "./useSectionNav";

const FOOTER_PARTS = [
  "Engines & Powertrains",
  "Gearboxes",
  "Axles & Chassis",
  "Cylinder Heads",
  "Torque Converters",
  "Engine Components",
];

export default function SiteFooter() {
  const onNav = useSectionNav();

  return (
    <footer className="ednex-footer">
      <div className="ednex-footer-main">
        <div>
          <img
            src="/assets/image/logo/logo.png"
            alt="EDNEX SDN.BHD."
            onClick={() => navigate("/")}
            style={{
              maxHeight: "70px",
              aspectRatio: "1.5",
            }}
          />
          <p className="ednex-footer-brand-desc">
            A reliable supplier of heavy-duty truck parts and components in
            Malaysia, delivering a comprehensive inventory and professional
            services to businesses nationwide since 2009.
          </p>
        </div>
        <div className="ednex-footer-col">
          <h4>Quick Links</h4>
          <ul className="ednex-footer-nav">
            {EDNEX_NAV.map((item) => (
              <li key={item.id}>
                <a {...sectionNavProps(item.id, onNav)}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="ednex-footer-col">
          <h4>Parts Categories</h4>
          <ul className="ednex-footer-nav">
            {FOOTER_PARTS.map((label) => (
              <li key={label}>
                <a {...sectionNavProps("parts", onNav)}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="ednex-footer-col">
          <h4>Contact Info</h4>
          <ul className="ednex-footer-nav" style={{ gap: 12 }}>
            <li>📍 {EDNEX_CONTACT.location}</li>
            <li>
              📞{" "}
              <a href={`tel:${EDNEX_CONTACT.phoneTel}`}>
                {EDNEX_CONTACT.phone}
              </a>
            </li>
            <li>
              💬 <a href={EDNEX_CONTACT.whatsappLink}>WhatsApp Us</a>
            </li>
            <li>
              ✉️{" "}
              <a href={`mailto:${EDNEX_CONTACT.email}`}>
                {EDNEX_CONTACT.email}
              </a>
            </li>
            <li>🕒 {EDNEX_CONTACT.hours}</li>
          </ul>
        </div>
      </div>
      <div className="ednex-footer-bottom">
        <div className="ednex-footer-copy">
          © 2026 EDNEX SDN.BHD. All Rights Reserved. LG1-2, Seri Gembira Avenue,
          No.6, Jalan Senang Ria, Kuchai Lama, 58200 Kuala Lumpur.
        </div>
        <div className="ednex-footer-copy">
          Heavy Transport Parts Specialist
        </div>
      </div>
    </footer>
  );
}
