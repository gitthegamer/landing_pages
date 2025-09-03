import { Block } from "framework7-react";
import React from "react";
import PaymentOption from "../common/payment-option";
import { useTranslation } from "react-i18next";

function DepositPaymentOption({
  selected,
  paymentOptions,
  changePaymentOptions,
  checkinItemGroupId,
}) {
  const { t } = useTranslation();
  return (
    <>
      <div className="text-primary-sub2 text15 mb-2">
        <span>{t("Currency Methods")}</span>
      </div>
      <div
        className={`grid ${
          checkinItemGroupId != null ? "grid-cols-3" : "grid-cols-3"
        } gap-12`}
      >
        {paymentOptions?.length > 0 &&
          paymentOptions.map((item, index) => {
            if (item.key != "telco_pin") {
              return (
                <PaymentOption
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  selected={selected === item.key}
                  index={index}
                  itemLength={paymentOptions.length - 1}
                  onClick={() => changePaymentOptions(item.key)}
                />
              );
            }
          })}
      </div>
    </>
  );
}

export default DepositPaymentOption;
