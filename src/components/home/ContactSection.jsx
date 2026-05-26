import React, { useState } from "react";
import { EDNEX_CONTACT, EDNEX_PART_CATEGORIES } from "../../data/ednexContent";

export default function ContactSection() {
  const [formSent, setFormSent] = useState(false);

  const handleEnquiry = (e) => {
    e.preventDefault();
    setFormSent(true);
    window.alert(
      "Thank you! Our team will contact you within 1 business hour.",
    );
  };

  return (
    <div className="ednex-section-wrap" id="contact">
      <div className="ednex-container">
        <div className="ednex-section-title-wrap">
          <div className="ednex-section-eyebrow">Get in Touch</div>
          <h2 className="ednex-section-title">CONTACT US</h2>
        </div>
        <div className="ednex-contact-grid">
          <div className="ednex-contact-info">
            <h3>EDNEX SDN.BHD.</h3>
            <p>
              Our sales consultants are readily available to assist with parts
              enquiries, bulk quotations, and delivery coordination. All
              enquiries are responded to within one business hour.
            </p>
            <div className="ednex-contact-details">
              <div className="ednex-cd-row">
                <div className="ednex-cd-icon">📍</div>
                <div>
                  <div className="ednex-cd-label">Address</div>
                  <div className="ednex-cd-value">{EDNEX_CONTACT.location}</div>
                </div>
              </div>
              <div className="ednex-cd-row">
                <div className="ednex-cd-icon">📞</div>
                <div>
                  <div className="ednex-cd-label">Sales Hotline</div>
                  <div className="ednex-cd-value">
                    <a href={`tel:${EDNEX_CONTACT.phoneTel}`}>
                      {EDNEX_CONTACT.phone}
                    </a>
                  </div>
                </div>
              </div>
              <div className="ednex-cd-row">
                <div className="ednex-cd-icon">💬</div>
                <div>
                  <div className="ednex-cd-label">WhatsApp</div>
                  <div className="ednex-cd-value">
                    <a href={EDNEX_CONTACT.whatsappLink}>
                      {EDNEX_CONTACT.whatsapp}
                    </a>
                  </div>
                </div>
              </div>
              <div className="ednex-cd-row">
                <div className="ednex-cd-icon">✉️</div>
                <div>
                  <div className="ednex-cd-label">Email</div>
                  <div className="ednex-cd-value">
                    <a href={`mailto:${EDNEX_CONTACT.email}`}>
                      {EDNEX_CONTACT.email}
                    </a>
                  </div>
                </div>
              </div>
              <div className="ednex-cd-row">
                <div className="ednex-cd-icon">🕒</div>
                <div>
                  <div className="ednex-cd-label">Business Hours</div>
                  <div className="ednex-cd-value">
                    Monday – Saturday, 8:00 AM – 6:00 PM
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form className="ednex-contact-form" onSubmit={handleEnquiry}>
            <h3>Send an Enquiry</h3>
            <div className="ednex-cf-row">
              <div className="ednex-cf-group">
                <label htmlFor="cf-name">Full Name</label>
                <input
                  id="cf-name"
                  type="text"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="ednex-cf-group">
                <label htmlFor="cf-company">Company</label>
                <input id="cf-company" type="text" placeholder="Company name" />
              </div>
            </div>
            <div className="ednex-cf-group">
              <label htmlFor="cf-phone">Phone / WhatsApp</label>
              <input
                id="cf-phone"
                type="tel"
                placeholder="+60 1X-XXXXXXX"
                required
              />
            </div>
            <div className="ednex-cf-group">
              <label htmlFor="cf-parts">Parts Required</label>
              <select id="cf-parts" defaultValue="">
                <option value="">Select category...</option>
                {EDNEX_PART_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="ednex-cf-group">
              <label htmlFor="cf-message">Message</label>
              <textarea
                id="cf-message"
                placeholder="Describe your requirements — part numbers, vehicle make/model, quantity, or budget."
              />
            </div>
            <button type="submit" className="ednex-btn-main full-width text-color-white">
              {formSent ? "ENQUIRY SENT" : "SEND ENQUIRY"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
