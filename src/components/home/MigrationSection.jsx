import React from "react";
import { useTranslation } from "react-i18next";
import { NP_MIGRATION_PILLS } from "../../data/nextplayContent";

export default function MigrationSection() {
  const { t } = useTranslation();

  return (
    <section className="np-section" id="migration">
      <div className="split">
        <div className="panel">
          <div className="eyebrow">{t("np.migration.eyebrow")}</div>
          <h2>{t("np.migration.title")}</h2>
          <div className="steps">
            {NP_MIGRATION_PILLS.map((key) => (
              <span key={key} className="pill">
                {t(key)}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h2>{t("np.migration.sideTitle")}</h2>
          <p>{t("np.migration.sideDesc")}</p>
        </div>
      </div>
    </section>
  );
}
