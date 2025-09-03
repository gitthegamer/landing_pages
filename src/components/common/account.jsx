import { Block, Button, f7 } from "framework7-react";
import React, { useEffect, useState } from "react";
import { useTokenAndUser } from "../action/user-data";
import navigate from "../action/navigate";
import useAuthenticate from "../../actions/Authenticate";
import { useRecoilValue } from "recoil";
import GlobalState from "../../atoms/GlobalState";
import { useTranslation } from "react-i18next";
import useCommon from "../action/Common";

const Account = () => {
  const { t } = useTranslation();
  const { amounts, user, isLoading } = useTokenAndUser();
  const { refresh_user, formatAmount } = useCommon();

  const global = useRecoilValue(GlobalState);

  const { auth } = useAuthenticate();

  const [userDetail, setUserDetail] = useState({
    username: "",
    banks: [],
    lockable_balance: 0,
    turnover: 0,
    remaining_turnover: 0,
    status: "Null",
  });

  const hanldeRefresh = async () => {
    f7.preloader.show();
    await refresh_user(); // this will authenticate again and save user data
    f7.preloader.hide();
  };

  useEffect(() => {
    setUserDetail((prevform) => ({
      ...prevform,
      username: user?.username || "",
      banks: user?.banks || [],
      lockable_balance: user?.lockable_balance || null,
      turnover: global.memmber_bonus?.turnover ?? "",
      remaining_turnover: global.memmber_bonus?.remaining_turnover ?? "",
      status: global.memmber_bonus?.status ?? "Null",
    }));
  }, [user]);

  return (
    <>
      {!user && !isLoading && (
        <div className="d-md-none login-section product-wrapper d-flex gap-2 mx-2 mb-2">
          <div className="product-item position-relative rounded-3 w-100">
            <div className="frame position-relative overflow-hidden rounded-3">
              <Button
                loginScreenOpen={"#login-modal"}
                className=" btn-primary m-0 fw-bold w-100"
              >
                {t("Login")}
              </Button>
            </div>
          </div>
          <div className="product-item position-relative rounded-3 w-100">
            <div className="frame position-relative overflow-hidden rounded-3">
              <Button
                onClick={() => navigate("/register")}
                className=" btn-primary m-0 fw-bold w-100"
              >
                {t("Register")}
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-primary-sub4 text-color-white p-3 mx-2 mb-md-4 mb-3 rounded-3">
        <div className="d-flex">
          {user && !isLoading ? (
            <div className="text-color-white text14 text-md18 ms-1 w-100">
              <div className="fw-bold mb-md-3">
                {t("Welcome")},
                <span className="text-secondary-sub">
                  {userDetail?.username}
                </span>
              </div>
              <div>
                {userDetail?.banks.length > 0
                  ? `${t("Account")}: ${userDetail?.banks[0]?.account}`
                  : ""}
              </div>
              <div className="mb-md-3">
                <span>
                  {userDetail?.banks.length > 0
                    ? `(${userDetail?.banks[0]?.bank})`
                    : ""}
                </span>
              </div>
              <div>
                <span className="text-secondary-sub">
                  {t("Credit Balance")}
                </span>
              </div>
              <div className="d-flex fw-medium">
                <span className="text12 text-md16 me-2">MYR</span>{" "}
                <span className="text32 lh-1">
                  {formatAmount(userDetail?.lockable_balance)}
                </span>
              </div>
              <div className="mb-3"></div>
              <div className="text-nowrap fw-medium">
                <div className="d-flex">
                  <div className="account-left text-primary-sub me-2">
                    {t("Turnover")}
                  </div>
                  <div className="w-25">
                    MYR {formatAmount(userDetail?.turnover)}
                  </div>
                </div>
                <div className="d-flex">
                  <div className="account-left text-primary-sub me-2">
                    {t("Remaining Turnover")}
                  </div>
                  <div className="w-25">
                    MYR {formatAmount(userDetail?.remaining_turnover)}
                  </div>
                </div>
                <div className="d-flex">
                  <div className="account-left text-primary-sub me-2">
                    {t("Status")}
                  </div>
                  <div className="w-25">{userDetail?.status}</div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="d-flex-column justify-content-space-between text-color-white text14 text-md18 pe-3 w-100">
                <div className="text14 text-md16 fw-bold mb-md-1">
                  {t("Credit Balance")}:
                </div>
                <div className="d-flex align-items-start text-md20 text16 fw-bold">
                  MYR <span className="text20 text-md32 ms-3">{"0.00"}</span>
                </div>

                <div>
                  <div className="text14 text-md16 d-flex flex-wrap">
                    <div className="account-left text-primary-sub me-2">
                      {t("Mininum Deposit")}
                    </div>
                    <div
                      style={{ width: "fit-content" }}
                      className="icon40 h-auto text-nowrap "
                    >
                      MYR {formatAmount(global.min_deposit)}
                    </div>
                  </div>

                  <div className="text14 text-md16 d-flex flex-wrap">
                    <div className="account-left text-primary-sub me-2">
                      {t("Mininum Withdrawal")}
                    </div>
                    <div className="icon40 h-auto text-nowrap">
                      MYR {formatAmount(global.min_withdrawal)}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="col-md-4 d-flex-column text-color-white">
            <Button
              onClick={() => navigate("/deposit")}
              className={`small-btn w-100 btn-secondary bg-gradient-secondary-main m-0 fw-bold px-4 mb-md-2 mb-1`}
            >
              {t("Deposit")}
            </Button>
            <Button
              onClick={() => navigate("/withdraw")}
              className={`small-btn btn-primary m-0 fw-bold px-4 mb-md-2 mb-1`}
            >
              {t("Withdraw")}
            </Button>
            <Button
              onClick={hanldeRefresh}
              className={`small-btn btn-primary m-0 fw-bold px-4 mb-1`}
            >
              {t("Refresh")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
