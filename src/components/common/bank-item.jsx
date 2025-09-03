import { useTranslation } from "react-i18next";
import useCommon from "../action/Common";

const BankItem = ({ item }) => {
  const { t } = useTranslation();
  const { getImgUrl } = useCommon();
  return (
    <div className="bank-wrapper">
      <div className="background bg-gradient-primary-sub m-0 p-md-4 py-md-3">
        <div className="d-flex align-items-center">
          <img
            className="icon24 icon-md32 me-md-3"
            src={getImgUrl(item?.img)}
            style={{ marginRight: "8px" }}
          ></img>
          <span className="text14 text-md18 text-color-white">
            {item?.bank}
          </span>
        </div>
        <div className="mb-2 mb-md-3"></div>
        <div>
          <div className="text12 text-md16 text-color-white">
            {item?.name} - {item?.account}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankItem;
