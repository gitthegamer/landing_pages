import { Block } from "framework7-react";
import React from "react";
import PaymentOption from "../common/payment-option";
import { useTranslation } from "react-i18next";

function DepositTypeOption({ selected, item, onChange }) {
  const { t } = useTranslation();
  return (
    <>
      {item?.length > 0 && item.some((i) => i.images !== "no-image") && (
        <div className="my-3">
          <div className="text-primary-sub2 text16 mb-2">
            <span>{t("Payment Channels")}</span>
          </div>
          <div className="d-flex column-gap-2">
            {item?.length > 0 &&
              item.map((item, index) => {
                return (
                  <div
                    className={
                      selected === index
                        ? "icon-md60 icon48 rounded-3 border-2 border-primary-main  mb-md-2 me-2"
                        : "icon-md60 icon48 rounded-3 me-2"
                    }
                    onClick={() => onChange(index)}
                    key={index}
                  >
                    {item.images === "no-image" ? (
                      <div
                        style={{ border: "1px solid white" }}
                        className="border h-100"
                      />
                    ) : (
                      <img
                        className="w-100 rounded-3"
                        src={item.logo}
                        alt={"Payment Logo"}
                      />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}

export default DepositTypeOption;
