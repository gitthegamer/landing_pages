import React from "react";
import { useTranslation } from "react-i18next";

export default function SiteFooter() {
  const { t } = useTranslation();

  return (
    <footer className="np-footer">
      <span>{t("np.footer.brand")}</span>
      <span>{t("np.footer.copyright")}</span>
    </footer>
  );
}
