import { ListItem } from "framework7-react";
import React from "react";
import useCommon from "../action/Common";
import { useTranslation } from "react-i18next";

const DepositBankOption = ({ value, changeBankOptions, bankList = [] }) => {
  const { t } = useTranslation();
  const { getImgUrl } = useCommon();

  return (
    <div className="my-3">
      {/* <div className="text-color-white text14 text-md20 fw-bold mb-2">
        <span>{t("Bank Options")}</span>
      </div> */}
      <ListItem
        className={`position-relative border rounded-2 border-primary-sub selector mt-2 ${
          value !== "" ? "selector-active" : ""
        }`}
        title={t("Please select payment method")}
        smartSelect
        smartSelectParams={{
          openIn: "sheet",
          pageBackLinkText: "Back",
          sheetBackdrop: true,
          closeOnSelect: true,
          on: {
            closed: function (ss) {
              changeBankOptions(ss.getValue());
            },
          },
        }}
      >
        <select
          value={value}
          name="selector-sheet"
          onChange={(e) => changeBankOptions(e.target.value)}
        >
          <option value="opacity-50">
            {t("Please select payment method")}
          </option>
          {bankList.map((bank, index) => (
            <option value={bank.id} key={index}>
              {bank.name}
            </option>
          ))}
        </select>

        <div
          className={`${
            bankList.find((item) => item.id === parseFloat(value))?.name
              ? ""
              : "opacity-50"
          } ${"item-after custom"}`}
        >
          {bankList.find((item) => item.id === parseFloat(value))?.name || null}
        </div>

        <i className="dropdown-arrow me-3" />
      </ListItem>
    </div>
  );
};

export default DepositBankOption;
