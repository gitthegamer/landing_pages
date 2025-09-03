import { Button, Icon, f7 } from "framework7-react";
import React from "react";
import { Clipboard } from "@capacitor/clipboard";
import useCommon from "../action/Common";
import { useToast } from "../action/Toast";
import { useTranslation } from "react-i18next";
function DialogApp(props) {
  const modal = props;
  const { openInAppBrowser } = useCommon();
  const { t } = useTranslation();
  const { show_toast } = useToast();
  const { formatAmount } = useCommon();

  const copyToClipboard = (text) => {
    Clipboard.writeText(text).then(() => {
      show_toast("Copy successful");
    });
  };

  const downloadApp = (url) => {
    modal.onDownloadApp(url);
  };

  return (
    <div>
      <div className="d-flex justify-content-space-between">
        <span>
          {t("Account")}: {modal.account}
        </span>
        <Button
          onClick={() => copyToClipboard(modal.account)}
          className="copy-btn"
        >
          <Icon f7="doc_on_clipboard" icon="text-color-white"></Icon>
        </Button>
      </div>
      <div className="d-flex justify-content-space-between">
        <span>
          {t("Password")}: {modal.password}
        </span>
        <Button
          onClick={() => copyToClipboard(modal.password)}
          className="copy-btn"
        >
          <Icon f7="doc_on_clipboard" icon="text-color-white"></Icon>
        </Button>
      </div>
      <div>
        <span>
          {t("Balance")}: SGD {formatAmount(modal.balance)}
        </span>
      </div>
      <img
        onClick={() => downloadApp(modal.android_url)}
        className="icon32"
        src={"/assets/image/others/android.webp"}
      />
      <img
        onClick={() => downloadApp(modal.ios_url)}
        className="icon32"
        src={"/assets/image/others/apple.webp"}
      />
    </div>
  );
}

export default DialogApp;
