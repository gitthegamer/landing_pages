import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./lng/en.json";
import cn from "./lng/cn.json";
import bm from "./lng/bm.json";

const resources = {
  en: { translation: en },
  cn: { translation: cn },
  bm: { translation: bm },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    supportedLngs: ["en", "cn", "bm"],
    interpolation: {
      escapeValue: false,
    },
  });
} else {
  Object.entries(resources).forEach(([lng, bundle]) => {
    i18n.addResourceBundle(lng, "translation", bundle.translation, true, true);
  });
}

export default i18n;
