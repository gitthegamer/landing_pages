import { atom } from "recoil";

const ConfirmMessageState = atom({
  key: "confirmMessageState",
  default: {
    show: false,
    disallow_close: true,
    title: "",
    content: "",
    is_image: false,
    is_bet_now: false,
  },
});

export default ConfirmMessageState;
