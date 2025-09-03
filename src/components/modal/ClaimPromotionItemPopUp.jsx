import React, { useEffect, useRef, useState } from "react";
import { Button, Panel, Block, ListItem, f7 } from "framework7-react";
import { useTranslation } from "react-i18next";
import useSideMenu from "../action/Sidemenu";
import { useTokenAndUser } from "../action/user-data";
import { useDialog } from "../action/Dialog";
import useCommon from "../action/Common";
import { deleteToken, getLanguage, setLanguage } from "../action/preferences";
import i18n from "../../i18n";
import navigate from "../action/navigate";
import usePopup from "../action/Popup";
import { useRecoilValue } from "recoil";
import PopupState from "../../atoms/PopupState";

function ClaimPromotionItemPopUp() {
  const { t } = useTranslation();
  const { open_popup_claim_promotion, close_popup_claim_promotion } =
    usePopup();
  const { show_claim_promotion, claim_promotion_onConfirm } =
    useRecoilValue(PopupState);

  const [timeLeft, setTimeLeft] = useState({
    hours: null,
    minutes: null,
    seconds: null,
  });

  const getDeadline = () => {
    const deadline = new Date();
    deadline.setTime(deadline.getTime() + 3 * 60 * 1000);
    return deadline;
  };

  useEffect(() => {
    const deadline = getDeadline();

    const timer = setInterval(() => {
      const now = new Date();
      const timeDiff = deadline - now;

      if (timeDiff <= 0) {
        setTimeLeft({ hours: "00", minutes: "00", seconds: "00" });
        close_popup_claim_promotion();
      } else {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setTimeLeft({
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        });
      }
    }, 1000);
  }, []);

  const handleClaim = () => {
    claim_promotion_onConfirm(true);
  };

  return (
    <>
      <div
        onClick={close_popup_claim_promotion}
        className={`position-fixed start-0 top-0 sidemenu-backdrop w-100 h-100 ${
          show_claim_promotion ? "open" : "d-none"
        }`}
      />
      {/* ============================ */}
      {show_claim_promotion && (
        <div
          id="claim_promotion"
          style={{ zIndex: "12000" }}
          className={`position-fixed start-0 top-0 w-100 h-100 d-flex-center ${
            show_claim_promotion ? "open" : ""
          }`}
        >
          <div className="position-relative d-flex-center">
            <img
              className="pointer position-absolute top-0 end-0 icon-md32 icon24"
              src="/assets/image/others/close.webp"
              onClick={close_popup_claim_promotion}
            />
            <img
              className="bg"
              src="/assets/image/claim_promotion/claim_promotion-bg.webp"
            />

            <div
              style={{
                bottom: "30%",
              }}
              className="position-absolute start-50 translate-middle-x d-flex gap-md-3 gap-2 text-md28 text20 text-color-white"
            >
              <div className="countdown-timer p-1">
                <span>{timeLeft.hours}</span>
              </div>
              <div className="countdown-timer p-1">
                <span>{timeLeft.minutes}</span>
              </div>
              <div className="countdown-timer p-1">
                <span>{timeLeft.seconds}</span>
              </div>
            </div>

            <div
              onClick={handleClaim}
              style={{ bottom: "15%" }}
              className="pointer position-absolute d-flex-center rounded-3 btn text-color-white text-md16 text12"
            >
              {t("Claim")}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ClaimPromotionItemPopUp;
