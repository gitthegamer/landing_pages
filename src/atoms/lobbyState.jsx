import { atom } from "recoil";

const LobbyState = atom({
  key: "lobbyState",
  default: {
    show: false,
    lobby_data: null,
  },
});

export default LobbyState;
