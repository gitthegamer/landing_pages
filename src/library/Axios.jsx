import axios from "axios";
import { getLanguage, loadToken } from "../components/action/preferences";
const api = axios.create({
  baseURL: "https://online_single.thegamer.asia/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  config.headers["token"] = (await loadToken()) || null;
  if (config.usePlatform === true) {
    config.headers["platform"] = "label1landing";
  }
  delete config.usePlatform;

  const currentLanguage = (await getLanguage()) || "en";
  config.params = { ...config.params, locale: currentLanguage };
  return config;
});

export default api;
