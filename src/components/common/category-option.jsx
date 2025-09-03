const CategoryOption = ({ title, icon, onClick, selected }) => (
  <div onClick={onClick}>
    <div
      className={`currency-wrapper rounded-3 d-flex align-items-center justify-content-center ${
        selected ? "bg-primary-main" : ""
      }`}
    >
      <img className="icon32" src={icon} alt={title} />
      <span className="text14 text-md18" style={{ marginLeft: "8px" }}>
        {title}
      </span>
    </div>
  </div>
);

export default CategoryOption;
