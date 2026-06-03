import { f7 } from "framework7-react";
import LoginModal from "./modal/login-modal";
import ConfirmMessage from "./modal/confirm-message";
import { useTranslation, initReactI18next } from "react-i18next";
import en from "./../lng/en.json";

import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";

import routes from "../library/routes";
import { getLanguage, saveToken } from "./action/preferences";
import LanguageState from "../atoms/LanguageState";
import { useRecoilState } from "recoil";
import { Helmet } from "react-helmet";
import ReactPixel from "react-facebook-pixel";

const MyApp = () => {
  const { i18n, t } = useTranslation();


  const resources = {
    en: { translation: en },
    // cn: { translation: cn },
    // bm: { translation: bm },
  };
  const [lang, setLang] = useRecoilState(LanguageState);
  //init i18n and translate f7 button
  useEffect(() => {
    const initializeI18n = async () => {
      try {
        const language = (await getLanguage()) ?? "en";

        await i18n.use(initReactI18next).init({
          resources,
          lng: language,
          fallbackLng: "en",
          supportedLngs: ["en", "cn", "bm"],
          interpolation: {
            escapeValue: false,
          },
        });

        setLang(language);
      } catch (error) {}
    };

    initializeI18n().then(() => {
      /* After i18n init , translate button text */
      f7.params.dialog.buttonOk = t("Confirm");
      f7.params.dialog.buttonCancel = t("Cancel");
    });
  }, []);

  //Global will fecth when language change

  useEffect(() => {
    const fetchGlobal = async () => {
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ status: true }); // 模拟返回结果
        }, 5000);
      });

      if (res?.status) {
        window.__APP_READY__ = true;
      }
    };

    fetchGlobal();
  }, [i18n.language]);

  const router = createBrowserRouter(routes);

  useEffect(() => {
    // const currentHost = window.location.host;
    // const currentURL = window.location.href;
    const urlParams = new URLSearchParams(window.location.search);
    // const refParam = urlParams.get("ref"); // Get the ref parameter from the URL
    const forceToken = urlParams.get("token");

    const forceTokenLogin = async () => {
      if (forceToken) {
        try {
          await saveToken(forceToken);
        } catch (error) {}
      }
    };

    forceTokenLogin();
  }, [i18n.language]);

  /* =========================================================== */

  const [globalSettings, setGlobalSettings] = useState(null);

  const pixelId = "1764494520867476";

  useEffect(() => {
    if (!pixelId) return;

    // 初始化 Pixel
    ReactPixel.init(pixelId);
    ReactPixel.pageView(); // 记录 PageView
  }, [pixelId]);

  return (
    <>
      <Helmet>
        <title>
          {globalSettings?.meta_title ||
            "EDNEX SDN.BHD. | Heavy Transport Parts Specialist Malaysia"}
        </title>
        <meta
          name="description"
          content={
            globalSettings?.meta_description ||
            "EDNEX SDN.BHD. — leading supplier and distributor of heavy truck parts in Malaysia. Engines, gearboxes, axles, and precision components for Volvo, Scania, Mercedes-Benz, and more."
          }
        />
        <meta
          property="og:title"
          content={
            globalSettings?.meta_title ||
            "EDNEX SDN.BHD. | Heavy Transport Parts Specialist"
          }
        />
        <meta
          property="og:description"
          content={
            globalSettings?.meta_description ||
            "Heavy transport parts specialist in LG1-2, Seri Gembira Avenue, No.6, Jalan Senang Ria, Kuchai Lama, 58200 Kuala Lumpur. Nationwide delivery across all 13 states."
          }
        />
        <meta
          property="og:image"
          content={globalSettings?.meta_thumbnail || "icons/icon-only.png"}
        />
        <link rel="apple-touch-icon" href="/assets/image/logo/logo.png" />
        <link rel="icon" href="/assets/image/logo/logo.png" />
        <link rel="canonical" href={"https://777s.live/"} />
      </Helmet>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>

      {/* ================== Popup ================== */}
      <ConfirmMessage />
      <LoginModal />
      {/* =========================================== */}
    </>
  );
};
export default MyApp;
