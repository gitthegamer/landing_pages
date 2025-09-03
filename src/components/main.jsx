import React, { useState, useEffect } from "react";

import { App } from "framework7-react";

import store from "../js/store";
import { RecoilRoot } from "recoil";
import MyApp from "./app";
import { ScreenOrientation } from "@capacitor/screen-orientation";
import { Device } from "@capacitor/device";
import { useTranslation } from "react-i18next";

const Main = () => {
  const { t } = useTranslation();
  // Framework7 Parameters
  const f7params = {
    name: "label1landing", // App name
    theme: "auto", // Automatic theme detection
    browserHistory: true,
    browserHistoryRoot: "",
    store: store,
    on: {
      init: () => {},
    },

    panel: {
      swipe: true,
    },
    dialog: {
      buttonOk: t("Confirm"),
      buttonCancel: t("Cancel"),
    },
  };

  return (
    <RecoilRoot>
      <App {...f7params}>
        <MyApp />
      </App>
    </RecoilRoot>
  );
};
export default Main;
