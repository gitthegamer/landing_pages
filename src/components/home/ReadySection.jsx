import React from "react";
import { useTranslation } from "react-i18next";

export default function ReadySection() {
  const { t } = useTranslation();

  return (
    <section className="np-section dark">
      <div className="center">
        <div className="eyebrow">{t("np.ready.eyebrow")}</div>
        <h2>{t("np.ready.title")}</h2>
        <p>{t("np.ready.desc")}</p>
      </div>
    </section>
  );
}
