import React from "react";
import { useTranslation } from "react-i18next";
import { TPS_STEPS } from "../../data/tpsContent";

export default function MethodologySection() {
  const { t } = useTranslation();

  return (
    <section className="how" id="methodology">
      <img
        className="how-photo left"
        src="/assets/image/tps/how-left.jpg"
        alt="Casino detail"
      />
      <img
        className="how-photo right"
        src="/assets/image/tps/how-right.jpg"
        alt="Casino detail"
      />
      <div className="how-fade" />
      <div className="wrap">
        <h3 className="section-title">{t("tps.how.title")}</h3>
        <div className="steps">
          {TPS_STEPS.map((step) => (
            <div key={step.num} className="step">
              <div className="circle">{step.icon}</div>
              <div>
                <b>{step.num}</b>
                <h4>{t(step.titleKey)}</h4>
                <p>{t(step.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="method">
          <a href="#">{t("tps.how.learn")}</a>
        </div>
      </div>
    </section>
  );
}
