import { useRecoilState } from "recoil";
import DailyCheckinState from "../../atoms/dailyCheckinState";
import LobbyState from "../../atoms/LobbyState";
import PopupState from "../../atoms/PopupState";
// import CheckDetail from "../checkin/CheckDetail";
let resolvePromise = null;

export default function usePopup() {
  const [popup_daily_checkin, setPopupDailyCheckin] =
    useRecoilState(DailyCheckinState);
  const [popup_common, setpopupCommon] = useRecoilState(PopupState);

  const [popup_lobby, setPopupLobby] = useRecoilState(LobbyState);

  function open_daily_checkin() {
    setPopupDailyCheckin({
      ...popup_daily_checkin,
      show_board: true,
    });
  }

  function close_daily_checkin() {
    setPopupDailyCheckin({ ...popup_daily_checkin, show_board: false });
  }

  function open_checkin_detail(dayIndex, type, icon) {
    setPopupDailyCheckin({
      ...popup_daily_checkin,
      show_detail: true,
      dayIndex: dayIndex,
      type: type,
      icon: icon,
    });
  }

  function close_checkin_detail() {
    setPopupDailyCheckin({
      ...popup_daily_checkin,
      show_detail: false,
      dayIndex: null,
      type: null,
      icon: null,
    });
  }

  /* ==================================================== */

  function open_popup_lobby(data) {
    setPopupLobby({
      ...popup_lobby,
      show: true,
      lobby_data: data,
    });
  }

  function close_popup_lobby(data) {
    setPopupLobby({
      ...popup_lobby,
      show: false,
      lobby_data: null,
    });
  }
  function open_popup_claim_promotion(data) {
    return new Promise((resolve, reject) => {
      setpopupCommon({
        ...popup_common,
        show_claim_promotion: true,
        claim_promotion_onConfirm: resolve,
      });
    });
  }

  function close_popup_claim_promotion(data) {
    setpopupCommon({
      ...popup_common,
      show_claim_promotion: false,
    });
  }

  return {
    close_daily_checkin,
    open_daily_checkin,
    open_checkin_detail,
    close_checkin_detail,
    /* ===================== */
    open_popup_lobby,
    close_popup_lobby,
    /* ===================== */
    open_popup_claim_promotion,
    close_popup_claim_promotion,
  };
}
