const CurrencyOption = ({
  image,
  label,
  rate,
  onClick,
  selected,
  showRate,
}) => (
  <div onClick={onClick}>
    <div
      className={`currency-wrapper rounded-3 d-flex align-items-center justify-content-center ${
        selected ? "bg-gradient-primary-main" : ""
      }`}
    >
      <img className="icon32" src={image} alt={label} />
      <span className="text14 text-md18" style={{ marginLeft: "8px" }}>
        {label}
      </span>
    </div>
    {showRate && (
      <div className="text-align-center">
        <span className="text12 text-md16 text-color-white">
          {rate ? `${rate} rate` : null}
        </span>
      </div>
    )}
  </div>
);

export default CurrencyOption;
