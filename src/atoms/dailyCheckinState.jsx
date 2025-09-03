import { atom } from "recoil";

const DailyCheckinState = atom({
  key: "dailyCheckinState",
  default: {
    mode: "",
    type: null,
    dayIndex: null,
    icon: null,
    show_board: false,
    show_detail: false,
    check_in_id: null,
    min_deposit: null,
  },
});

export default DailyCheckinState;
