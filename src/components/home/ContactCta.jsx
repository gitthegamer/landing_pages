import React from "react";
import { useTranslation } from "react-i18next";
import { NP_CONTACT_EMAIL } from "../../data/nextplayContent";

export default function ContactCta() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="cta">
      <h2>{t("np.cta.title")}</h2>
      <p>{t("np.cta.desc")}</p>
      <a className="ghost" href={NP_CONTACT_EMAIL}>
        {t("np.cta.talk")}
      </a>
    </section>
  );
}
