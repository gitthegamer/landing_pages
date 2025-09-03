import { useTranslation } from "react-i18next";

const PaymentOption = ({
  title,
  icon,
  onClick,
  selected,
  index,
  itemLength,
}) => {
  const { t } = useTranslation();
  return (
    <div className="pointer" onClick={onClick}>
      <div
        className={`d-flex-center flex-column h-100 px-2 py-2 rounded-3 ${
          index !== itemLength - 1 ? "" : ""
        } ${selected ? "btn-primary" : " btn-outline-primary"}`}
      >
        {/* <img className="icon32 icon-md48 mb-md-2" src={icon} alt={title} /> */}
        {/* <div className="mb-2"></div> */}
        <span className="text14">{t(title)}</span>
      </div>
    </div>
  );
};

export default PaymentOption;
