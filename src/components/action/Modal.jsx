import { useRecoilState } from "recoil";
import LobbyState from "./../../atoms/LobbyState";
import { useTranslation } from "react-i18next";
import useCommon from "./Common";
import DialogApp from "../modal/dialog-app";

export default function useModal() {
  return {
    open_message,
    open_notification,
    open_confirm_message,
    open_dialog_component_status,
  };
}
