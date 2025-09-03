import { atom } from "recoil";

const GlobalState = atom({
  key: "GlobalState",
  default: {
    maintenance: 0,
    theme: "testing",
    banners: [],
    promotions: [],
    pages: [],
    payments: [],
    products: [],
    marquee: "",
    min_deposit: null,
    max_deposit: null,
    min_withdrawal: null,
    max_withdrawal: null,
    min_fd_deposit: null,
    max_fd_deposit: null,
    category: [],
    withdrawal_bank: [],
    ranks: [],
    malls: [],
    reward_points: 0,
    points: 0,
  },
});

export default GlobalState;
