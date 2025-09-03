import { ListItem } from "framework7-react";
import React from "react";
import useCommon from "../action/Common";
import { useTranslation } from "react-i18next";

const DepositGameOption = ({
  value,
  changeProductOptions,
  productList = [],
}) => {
  const { t } = useTranslation();
  const { getImgUrl } = useCommon();

  return (
    <div className="my-3">
      {/* <div className="text-color-white text14 text-md20 fw-bold mb-2">
        <span>{t("product Options")}</span>
      </div> */}
      <ListItem
        className={`position-relative border rounded-2 border-primary-sub selector mt-2 ${
          value !== "" ? "selector-active" : ""
        }`}
        title={t("Game ID")}
        smartSelect
        smartSelectParams={{
          openIn: "sheet",
          pageBackLinkText: "Back",
          sheetBackdrop: true,
          closeOnSelect: true,
          on: {
            closed: function (ss) {
              changeProductOptions(ss.getValue());
            },
          },
        }}
      >
        <select
          value={value}
          name="selector-sheet"
          onChange={(e) => changeProductOptions(e.target.value)}
        >
          <option value="opacity-50">{t("Game ID")}</option>
          {productList.map((product, index) => (
            <option value={product.id} key={index}>
              {product.product}
            </option>
          ))}
        </select>

        <div
          className={`${
            productList.find((item) => String(item.id) === String(value))
              ?.product
              ? ""
              : "opacity-50"
          } ${"item-after custom"}`}
        >
          {productList.find((item) => String(item.id) === String(value))
            ?.product || null}
        </div>

        <i className="dropdown-arrow me-3" />
      </ListItem>
    </div>
  );
};

export default DepositGameOption;
