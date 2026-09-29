import React from "react";
import { useTranslation } from "react-i18next";
import { NP_MIGRATION_PILLS } from "../../data/nextplayContent";

export default function MigrationSection() {
  const { t } = useTranslation();

  return (
    <section className="np-section" id="migration">
      <div className="center migration-block">
        <div className="eyebrow">{t("np.migration.eyebrow")}</div>
        <h2>
          <span className="accent-line">{t("np.migration.title")}</span>
          <br />
          <span className="accent-line">{t("np.migration.title2")}</span>
        </h2>
        <p className="section-desc">{t("np.migration.desc")}</p>
        <div className="steps migration-checks">
          {NP_MIGRATION_PILLS.map((key) => (
            <span key={key} className="pill check-pill">
              ✓ {t(key)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
