import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import navigate from "../action/navigate";
import { TPS_FOOTER } from "../../data/tpsContent";

export default function SiteFooter() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleNav = (e, href) => {
    if (href?.startsWith("#") && href.length > 1) {
      e.preventDefault();
      navigate(href);
    }
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
          </div>
        </div>
        <div className="copyright">{t("tps.footer.copyright")}</div>
      </div>
    </footer>
  );
}
