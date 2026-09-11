import React from "react";
import { useTranslation } from "react-i18next";
import { NP_CREDIT_STEPS } from "../../data/nextplayContent";

export default function CreditSection() {
  const { t } = useTranslation();

  return (
    <section className="np-section soft">
      <div className="split">
        <div>
          <div className="eyebrow">{t("np.credit.eyebrow")}</div>
          <h2>{t("np.credit.title")}</h2>
          <p>{t("np.credit.desc")}</p>
          <div className="steps">
            {NP_CREDIT_STEPS.map((key, index) => (
              <React.Fragment key={key}>
                {index > 0 && <span className="arrow">→</span>}
                <span className="pill">{t(key)}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="panel">
          <p className="big">24/7</p>
          <h3>{t("np.credit.panelTitle")}</h3>
          <p>{t("np.credit.panelDesc")}</p>
        </div>
      </div>
    </section>
  );
}
