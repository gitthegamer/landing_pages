import { useRecoilState } from "recoil";
import ConfirmMessageState from "../atoms/confirmMessageState";
import { useTranslation } from "react-i18next";
let resolvePromise = null;

export default function useConfirmMessage() {
  const [modal, setModal] = useRecoilState(ConfirmMessageState);
  const { t } = useTranslation();

  function open_confirm_message(
    title = "",
    content = "Are you sure you want to proceed?",
    is_image = false,
    is_bet_now = false
  ) {
    return new Promise((resolve, reject) => {
      resolvePromise = resolve;

      setModal({
        ...modal,
        show: true,
        content,
        title: title === "" ? "Confirmation" : title,
        is_image,
        is_bet_now,
      });
    });
  }

  function handleResponse(response) {
    if (typeof resolvePromise === "function") {
      resolvePromise(response);
      resolvePromise = null;
    } else {
    }
    setModal({ ...modal, show: false });
  }

  function close() {
    handleResponse(false);
  }

  function confirm() {
    handleResponse(true);
  }

  return {
    close,
    open_confirm_message,
    confirm,
  };
}
