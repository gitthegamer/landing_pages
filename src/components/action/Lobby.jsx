import { useTranslation } from "react-i18next";
import useCommon from "./Common";
import DialogApp from "../modal/dialog-app";
import { useDialog } from "./Dialognew";

export default useLobby;

function useLobby() {
  const { t } = useTranslation();
  const { openInAppBrowser } = useCommon();
  const { open_confirm_message, open_dialog_component } = useDialog();

  return {
    open_app,
    open_lobby,
    open_sports,
    open_deeplink,
    close,
  };

  async function open_lobby(url) {
    return open_confirm_message(
      "",
      t("Please click confirm to start game!")
    ).then((resConfirm) => {
      if (resConfirm) {
        openInAppBrowser(url);
      }
    });
  }

  function open_app(account, password, balance, ios_url, android_url) {
    return open_dialog_component("", DialogApp, {
      balance: balance,
      account: account,
      password: password,
      ios_url: ios_url,
      android_url: android_url,
      onDownloadApp: (url) => openInAppBrowser(url),
    });
  }

  function open_deeplink(
    account,
    password,
    balance,
    ios_url,
    android_url,
    url
  ) {
    return open_dialog_component("", DialogApp, {
      balance: balance,
      account: account,
      password: password,
      ios_url: ios_url,
      android_url: android_url,
      url: url,
      onDownloadApp: (url) => openInAppBrowser(url),
    });
  }

  function open_sports(url) {
    open_confirm_message(
      t("Please click confirm to start game!"),
      t(
        "From now on, to protect each player benefits preventing speculators perform abnormal betting, company accept only handicap & handicap over/under bet for all soccer matches, strictly no special bet accepted. Company accept only soccer bets, rest of it not accepted. Company has rights to cancel all non handicap, special bet, non soccer bet and frozen related problematic account. There will be no cancellation explanation given."
      )
    ).then((res) => {
      if (res) {
        openInAppBrowser(url);
      }
    });
  }
}
