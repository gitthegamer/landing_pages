import { Button } from "framework7-react";
import { useTranslation } from "react-i18next";
import useCommon from "../action/Common";
import { useRecoilValue } from "recoil";
import LanguageState from "../../atoms/LanguageState";

const PromotionItem = ({ item, onInfoClick, onApplyClick }) => {
  const { t } = useTranslation();
  const currentLanguage = useRecoilValue(LanguageState);
  const { getImgUrl } = useCommon();
  return (
    <div className="border border-primary-sub d-flex-column rounded-4 bg-primary-sub4">
      <div>
        <img
          className="promotion w-100 rounded-top-4"
          src={getImgUrl(item.image[currentLanguage])}
        />
      </div>
      <div className="promotion-item mb-3 text-align-start my-auto px-3">
        <div className="title text-color-white text20 px-2 fw-bold mb-2">
          {item.name[currentLanguage]}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: item.summary[currentLanguage] }}
          className="text-primary-sub text16 px-2"
        />
      </div>

      <div className="d-flex gap-2 mt-2 mb-3 px-4  text14 text-md18 text-color-white fw-normal">
        <Button
          className="small-btn border border-primary-sub rounded-3 px-3"
          onClick={onInfoClick}
        >
          {t("Read more")}
        </Button>
        {[0, 1, 3].includes(item?.promotion?.category) ? (
          <Button
            className="small-btn border border-primary-sub rounded-3 btn-primary fw-normal px-3"
            onClick={onApplyClick}
          >
            {t("Apply Now")}
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default PromotionItem;
