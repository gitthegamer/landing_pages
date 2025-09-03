import axios from "axios";
import { getLanguage, loadToken } from "../components/action/preferences";

const api_file = axios.create({
  baseURL: "https://online_single.thegamer.asia/api",
  headers: {
    "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
  },
});

api_file.interceptors.request.use(async (config) => {
  config.headers["token"] = (await loadToken()) || null;
  // config.headers["RefCode"] = localStorage.getItem("ref");
  const currentLanguage = (await getLanguage()) || "en";
  config.params = {
    ...config.params,
    locale: currentLanguage,
  };
  return config;
});

export default api_file;
