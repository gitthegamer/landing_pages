import { useSetRecoilState } from "recoil";
import api from "../library/Axios.jsx";
import api_file from "../library/AxiosMedia.jsx";
import AuthState from "../atoms/AuthState.jsx";
import {
  deleteToken,
  loadToken,
  saveToken,
  saveUser,
} from "../components/action/preferences.jsx";
import { useTokenAndUser } from "../components/action/user-data.jsx";

export default useAuthenticate;

function useAuthenticate() {
  const setAuth = useSetRecoilState(AuthState);
  const { token, user, amounts, isLoading, checkTokenChange } =
    useTokenAndUser();
  return {
    payment_gateway_information,
    deposit,
  };

  async function payment_gateway_information() {
    return api
      .post("payment_gateway_information", {}, { usePlatform: true })
      .then((res) => res.data)
      .then((res) => {
        if (!res.status) {
          return res;
        }

        return res;
      });
  }
  async function deposit(form) {
    return api_file
      .post("deposit", form)
      .then((res) => res.data)
      .then((res) => {
        if (!res.status) {
          return res;
        }

        return res;
      });
  }
}
