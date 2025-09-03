import { atom } from "recoil";

const CommonState = atom({
  key: "commonState",
  default: {
    sidemenu_open: false,
    is_profit_transfer: false,
    tab_open: {
      home: false,
      promotion: false,
      deposit: false,
      withdrawal: false,
      account: false,
    },
  },
});

export default CommonState;
