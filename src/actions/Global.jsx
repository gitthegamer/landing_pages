import { useSetRecoilState } from "recoil";
import api from "../library/Axios.jsx";
import GlobalState from "../atoms/GlobalState.jsx";
import axios from "axios";
import { getLanguage, loadToken } from "../components/action/preferences.jsx";
export default useGlobal;

function useGlobal() {
  const setGlobal = useSetRecoilState(GlobalState);

  async function fetch(form) {
    return api
      .post("global", form)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setGlobal(res);
        return res;
      });
  }

  return {
    fetch,
  };
}
