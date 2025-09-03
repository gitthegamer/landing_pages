import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useCommon from "../action/Common";

const Wallet = ({ user }) => {
  const { t } = useTranslation();
  const { formatAmount } = useCommon();
  const [selected, setSelected] = useState("game");

  const walletTypes = [
    { id: "game", name: "lockable_balance" },
    { id: "main", name: "main_balance" },
    { id: "profit", name: "reward_balance" },
  ];
  return (
    <>
      <div className="tab-wrapper text-align-center mb-3 rounded-3">
        <div className="grid grid-cols-3 rounded-3 text-color-white mb-2">
          {walletTypes.map((type) => (
            <div
              key={type.id}
              style={{ textTransform: "capitalize" }}
              className={`item pointer text12 text-md16 fw-bold rounded-3 py-2 px-1  ${
                selected === type.id ? "btn-primary" : ""
              }`}
              onClick={() => setSelected(type.id)}
            >
              {t(`${type.id} Wallet`)}
            </div>
          ))}
        </div>

        <div className="mb-1"></div>
      </div>
      <div className="d-flex flex-md-row justify-content-md-between flex-column border border-primary-sub text-color-white rounded-2 mb-3 px-3 px-md-5 py-2 py-md-4">
        <div className="text14 text-md18 fw-semibold">
          <span>{t("Balance")}</span>
        </div>
        <div className="d-flex align-items-start justify-content-center align-items-md-center mb-1 mb-md-0">
          <div className="text14 text-md18 fw-medium me-1">{"MYR "}</div>
          <div className="text24 fw-bold lh-1">
            {user &&
              formatAmount(
                user[
                  walletTypes.find((walletTypes) => walletTypes.id === selected)
                    ?.name
                ]
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallet;
