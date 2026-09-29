import React from "react";
import { useTranslation } from "react-i18next";
import { NP_CREDIT_STEPS } from "../../data/nextplayContent";

export default function CreditSection() {
  const { t } = useTranslation();

  return (
    <section className="np-section soft" id="credit">
      <div className="center credit-block">
        <div className="eyebrow">{t("np.credit.eyebrow")}</div>
        <h2>
          <span className="accent-line">{t("np.credit.title")}</span>
          <br />
          <span className="accent-line">{t("np.credit.title2")}</span>
        </h2>
        <p className="section-desc">{t("np.credit.desc")}</p>
        <div className="steps credit-steps">
          {NP_CREDIT_STEPS.map((key, index) => (
            <React.Fragment key={key}>
              {index > 0 && <span className="arrow">→</span>}
              <span className="pill">{t(key)}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
