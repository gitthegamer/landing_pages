import React from "react";
import { useTranslation } from "react-i18next";
import { NP_FEATURE_CARDS } from "../../data/nextplayContent";

export default function SolutionsSection() {
  const { t } = useTranslation();

  return (
    <section className="np-section" id="solutions">
      <div className="center">
        <div className="eyebrow">{t("np.solutions.eyebrow")}</div>
        <h2>{t("np.solutions.title")}</h2>
        <p>{t("np.solutions.desc")}</p>
      </div>
      <div className="cards" id="features">
        {NP_FEATURE_CARDS.map((card) => (
          <div key={card.titleKey} className="card">
            <div className="icon">{card.icon}</div>
            <b>{t(card.titleKey)}</b>
            <span>{t(card.descKey)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
