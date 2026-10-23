// atoms/languageAtom.js
import { atom } from "recoil";

const LanguageState = atom({
  key: "languageState",
  default: "cn",
});

export default LanguageState;
