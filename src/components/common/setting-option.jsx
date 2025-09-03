import { Button } from "framework7-react";
import { useTranslation } from "react-i18next";

const SettingOption = ({ image, label, path, onClick }) => {
  const { t } = useTranslation();
  return (
    <Button
      className="d-flex-column align-items-center justify-content-center h-auto p-0 px-2"
      onClick={() => onClick(path)}
    >
      <div className="icon40 icon-md64 rounded-circle mb-md-2">
        <img className="w-100 h-100 m-auto" src={image} alt={label} />
      </div>
      <div className="text-align-center d-flex">
        <span className="text14 text-md20 lh-base">{t(label)}</span>
      </div>
    </Button>
  );
};

export default SettingOption;
