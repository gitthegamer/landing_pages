import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import navigate from "../action/navigate";
import { TPS_FOOTER } from "../../data/tpsContent";

export default function SiteFooter() {
  const { t } = useTranslation();
  const go = useNavigate();
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ company: "", email: "", phone: "" });

  const handleNav = (e, href) => {
    if (href?.startsWith("/")) {
      e.preventDefault();
      go(href);
      return;
    }
    if (href?.startsWith("#") && href.length > 1) {
      e.preventDefault();
      navigate(href);
    }
  };

  const submitCommercial = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ company: "", email: "", phone: "" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer id="about">
      <div className="wrap">
        <div className="footgrid">
          <div>
            <div className="footbrand">
              THE
              <br />
              PLAY STANDARD
            </div>
            <p style={{ whiteSpace: "pre-line" }}>{t("tps.footer.tagline")}</p>
          </div>
          <div>
            <h5>{t("tps.footer.rankings")}</h5>
            {TPS_FOOTER.rankings.map((link) => (
              <a
                key={link.labelKey}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
              >
                {t(link.labelKey)}
              </a>
            ))}
          </div>
          <div>
            <h5>{t("tps.footer.information")}</h5>
            {TPS_FOOTER.information.map((link) => (
              <a
                key={link.labelKey}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
              >
                {t(link.labelKey)}
              </a>
            ))}
          </div>
          <div id="responsible">
            <h5>{t("tps.footer.legal")}</h5>
            {TPS_FOOTER.legal.map((link) => (
              <a
                key={link.labelKey}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
              >
                {t(link.labelKey)}
              </a>
            ))}
          </div>
          <div>
            <h5>{t("tps.footer.stay")}</h5>
            <p>{t("tps.footer.stayDesc")}</p>
            <form className="email" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder={t("tps.footer.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
              />
              <button type="submit">→</button>
            </form>
            <button
              type="button"
              className="tps-commercial-btn"
              onClick={() => {
                setSent(false);
                setOpen(true);
              }}
            >
              {t("tps.commercial.open")}
            </button>
          </div>
        </div>
        <div className="copyright">{t("tps.footer.copyright")}</div>
      </div>
      {open ? (
        <div className="tps-commercial-modal open" role="presentation">
          <div
            className="tps-commercial-card"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="tps-commercial-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="tps-commercial-k">{t("tps.commercial.kicker")}</div>
            <h2>{t("tps.commercial.title")}</h2>
            <p>{t("tps.commercial.desc")}</p>
            <form onSubmit={submitCommercial}>
              <label>{t("tps.commercial.company")}</label>
              <input
                required
                autoComplete="organization"
                value={form.company}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, company: e.target.value }))
                }
              />
              <label>Email</label>
              <input
                required
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <label>{t("tps.commercial.phone")}</label>
              <input
                required
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
              <button className="tps-commercial-submit" type="submit">
                {t("tps.commercial.submit")}
              </button>
              <div className="tps-commercial-msg">
                {sent ? t("tps.commercial.thanks") : ""}
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </footer>
  );
}
