import { useRecoilValue } from "recoil";
import GlobalState from "../../atoms/GlobalState";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ref, onValue, off, get } from "firebase/database";
import firebase from "../../library/firebase";
import { forEach } from "lodash";
import { useNavigate } from "react-router-dom";

const LiveTransactionWidget = ({ data }) => {
  const global = useRecoilValue(GlobalState);
  const navigateFn = useNavigate();
  const { t } = useTranslation();

  const [live_transaction_data, setLiveTransactionData] = useState([]);

  // get the live transaction data , and real time renew data
  useEffect(() => {
    const depositRef = ref(firebase, "deposit");
    const withdrawalRef = ref(firebase, "withdrawal");
    let currentDeposit = [];
    let currentWithdrawal = [];

    const handleValueChange = (depositSnapshot, withdrawalSnapshot) => {
      if (depositSnapshot) {
        currentDeposit = Object.values(depositSnapshot).slice(-5).reverse();
      }

      if (withdrawalSnapshot) {
        currentWithdrawal = Object.values(withdrawalSnapshot)
          .slice(-5)
          .reverse();
      }

      const live_transaction_data = Array.from({ length: 5 }, (_, i) => ({
        deposit: currentDeposit[i] || null,
        withdraw: currentWithdrawal[i] || null,
      }));

      setLiveTransactionData(live_transaction_data);
    };

    // Listen to deposit updates
    const unsubscribeDeposit = onValue(depositRef, (snapshot) => {
      try {
        const depositSnapshot = snapshot.exists() ? snapshot.val() : null;
        handleValueChange(depositSnapshot, null); // Only update deposit data
      } catch (error) {}
    });

    // Listen to withdrawal updates
    const unsubscribeWithdrawal = onValue(withdrawalRef, (snapshot) => {
      try {
        const withdrawalSnapshot = snapshot.exists() ? snapshot.val() : null;
        handleValueChange(null, withdrawalSnapshot); // Only update withdrawal data
      } catch (error) {}
    });

    // Cleanup listeners on unmount
    return () => {
      unsubscribeDeposit();
      unsubscribeWithdrawal();
    };
  }, [global]);

  const [userRecordItem] = useState({
    deposit: ["member_phone", "amount"],
    withdraw: ["member_phone", "amount", "product_name"],
  });

  const formatPhone = (phone) => {
    return phone?.replace(/(\d{2})\d+(\d{2})/, (_, start, end) => {
      return `${start}${"*".repeat(phone.length - 4)}${end}`;
    });
  };

  /* ============================================================ */

  const [onlineShow, setOnlineShow] = useState([]);
  const [updateInterval, setUpdateInterval] = useState(7);

  const initializeOnlineNumber = useCallback(
    (realMemberCount) => {
      const baseCount = realMemberCount * 10;
      const minCount = Math.max(baseCount - 5, 0);
      const maxCount = baseCount + 5;
      let lastNumber =
        Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;

      updateOnlineShow(lastNumber);

      const difference = Math.floor(baseCount * 0.25);

      const intervalId = setInterval(() => {
        let ran;
        do {
          ran =
            Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
        } while (Math.abs(lastNumber - ran) > difference);
        lastNumber = ran;
        updateOnlineShow(ran);
      }, 1000 * updateInterval);

      return () => clearInterval(intervalId);
    },
    [updateInterval]
  );

  const updateOnlineShow = (number) => {
    setOnlineShow(number);
  };

  useEffect(() => {
    const onlineUser =
      parseInt(global?.member_statistic?.online_user, 10) || 40;
    const cleanup = initializeOnlineNumber(onlineUser + 20);

    return cleanup; // Clean up interval on unmount or dependency change
  }, [initializeOnlineNumber, global?.member_statistic?.online_user]);

  return (
    <div className="live-transaction-wrapper text-align-center mx-2 mb-2 rounded-3 overflow-hidden mb-0 my-md-4">
      <div className="d-flex align-items-center title px-3 text14 text-md18 lh-1 fw-bold py-md-2 py-1">
        <div>{t("LIVE TRANSACTION")}</div>
        <div
          style={{
            animation: "brink 1s linear infinite",
          }}
          className="d-flex align-items-center bg-color-red px-2 rounded-1 text-color-white ms-auto"
        >
          <div className="rounded-circle p-1 bg-color-white me-2"></div>
          <div className="">{onlineShow}</div>
        </div>
        {/* <div className="rounded-circle p-1 bg-color-red mx-2"></div> */}
      </div>

      {/* ==================================== */}
      <div className="table text-color-white text10 text-md20 p-2 p-md-3">
        <div className="d-flex border-1 border-bottom-0 rounded-top-3 overflow-hidden text12 text-md24">
          <div className="deposit-col bg-gradient-primary-sub py-md-2">
            {t("Deposit")}
          </div>
          <div className="withdraw-col py-md-2">{t("Withdraw")}</div>
        </div>
        {/*  */}

        <div className="border-1 rounded-bottom-3 fw-bold">
          {/*  */}
          {live_transaction_data.map((data, idx) => (
            <div className="d-flex align-items-stretch" key={idx}>
              <div className="d-flex align-items-center deposit-col">
                {userRecordItem.deposit.map((item, index) => (
                  <div
                    style={{ textOverflow: "ellipsis", minHeight: "20px" }}
                    key={index}
                    className="d-flex-center flex-1 h-100 border-end-1 text-nowrap overflow-hidden px-2 py-md-2"
                  >
                    {item === "member_phone"
                      ? formatPhone(data?.deposit?.[item])
                      : data?.deposit?.[item]}
                  </div>
                ))}
              </div>
              <div className="d-flex align-items-center withdraw-col">
                {userRecordItem.withdraw.map((item, index) => (
                  <div
                    key={index}
                    style={{ textOverflow: "ellipsis", minHeight: "20px" }}
                    className={`d-flex-center flex-1 h-100 text-nowrap overflow-hidden px-2 py-md-2 ${
                      index !== userRecordItem.withdraw.length - 1
                        ? "border-end-1"
                        : ""
                    } `}
                  >
                    {item === "member_phone"
                      ? formatPhone(data?.withdraw?.[item])
                      : data?.withdraw?.[item]}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default LiveTransactionWidget;
