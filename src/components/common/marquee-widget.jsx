import { useRecoilValue } from "recoil";
import GlobalState from "../../atoms/GlobalState";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import LanguageState from "../../atoms/LanguageState";

const MarqueeWidget = () => {
  const { t } = useTranslation();
  const global = useRecoilValue(GlobalState);
  const marquee = global.marquee;
  const currentLanguage = useRecoilValue(LanguageState);
  return (
    <>
      <div
        id="notification-bar"
        className="marquee-wrapper mb-2 mx-2 border-2 rounded-3 border-primary-sub"
      >
        <div className="background rounded-1 d-flex align-items-center p-1 rounded-3 ">
          <marquee className="text fw-black text12 text-md16">
            {marquee[currentLanguage] ? t(marquee[currentLanguage]) : "NULL"}
          </marquee>
        </div>
      </div>

      <div className="px-2 mb-0 my-md-4">
        <img className="w-100" src="/assets/image/test1-remove.png" />
      </div>
    </>
  );
};

export default MarqueeWidget;
