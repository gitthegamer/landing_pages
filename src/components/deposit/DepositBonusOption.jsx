import React from "react";
import { ListItem } from "framework7-react";
import { useTranslation } from "react-i18next";

const DepositBonusOption = ({ value, changeBonus, bonusList }) => {
  const { t } = useTranslation();
  return (
    <div className="my-3">
      <div className="mb-2">
        <span className="text-color-white fw-bold text16 text-md20">
          {t("Bonus")}
        </span>
      </div>
      <ListItem
        className={`selector border rounded-2 border-primary-sub mt-0 ${
          value ? "selector-active" : ""
        }`}
        title={t("Please select a bonus")}
        smartSelect
        smartSelectParams={{
          openIn: "sheet",
          sheetPush: true,
          pageBackLinkText: "Back",
          sheetBackdrop: true,
        }}
      >
        <select
          name="selector-sheet"
          value={value}
          onChange={(e) => changeBonus(e.target.value)}
        >
          <option value="">{t("Please select a bonus")}</option>
          {bonusList.map((promotion, index) => (
            <option key={index} value={promotion.value}>
              {promotion.label}
            </option>
          ))}
        </select>

        <div className="item-after custom">
          {bonusList.find((item) => item.value === value)?.label || null}
        </div>
      </ListItem>
      <div className="mb-3" />
    </div>
  );
};

export default DepositBonusOption;
