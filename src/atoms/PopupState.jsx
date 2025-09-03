import { atom } from "recoil";

const PopupState = atom({
  key: "popupState",
  default: {
    show_claim_promotion: false,
    claim_promotion_onConfirm: null,
  },
});

export default PopupState;
