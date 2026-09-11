import { f7 } from "framework7-react";
import LoginModal from "./modal/login-modal";
import ConfirmMessage from "./modal/confirm-message";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

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
  const { t, i18n: i18nHook } = useTranslation();
  const [lang, setLang] = useRecoilState(LanguageState);

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const language = (await getLanguage()) ?? "en";
        const resolved = ["en", "cn", "bm"].includes(language) ? language : "en";
        await i18n.changeLanguage(resolved);
        setLang(resolved);
      } catch (error) {
        setLang("en");
      }

      f7.params.dialog.buttonOk = i18n.t("Confirm");
      f7.params.dialog.buttonCancel = i18n.t("Cancel");
    };

    initializeLanguage();
  }, [setLang]);

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
  }, [i18nHook.language]);

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
  }, [i18nHook.language]);

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
            "7E Next Play — Super Platform System"}
        </title>
        <meta
          name="description"
          content={
            globalSettings?.meta_description ||
            "A smarter super platform designed to simplify operations, reduce manual work and support your next stage of growth."
          }
        />
        <meta
          property="og:title"
          content={
            globalSettings?.meta_title ||
            "7E Next Play — Super Platform System"
          }
        />
        <meta
          property="og:description"
          content={
            globalSettings?.meta_description ||
            "7E Next Play — Super Platform System for smarter operations and long-term growth."
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
