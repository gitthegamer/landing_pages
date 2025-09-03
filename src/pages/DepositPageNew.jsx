import React, { useEffect, useRef, useState } from "react";
import { Page, Block, Input, Button, f7 } from "framework7-react";
import { useRecoilValue } from "recoil";
import GlobalState from "../atoms/GlobalState";
import useAuthenticate from "../actions/Authenticate";
import { useTokenAndUser } from "../components/action/user-data";
import { Clipboard } from "@capacitor/clipboard";
import { useTranslation } from "react-i18next";
import { useToast } from "../components/action/Toast";
import PreLoader from "../components/common/pre-loader";
import useCommon from "../components/action/Common";
import AmountOption from "../components/common/amount-option";
import DepositPaymentOption from "../components/deposit/DepositPaymentOption";
import DepositBankOption from "../components/deposit/DepositBankOption";
import DepositTypeOption from "../components/deposit/DepositTypeOption";
import DepositGameOption from "../components/deposit/DepositGameOption.jsx";
import navigate from "../components/action/navigate.jsx";
import { useDialog } from "../components/action/Dialog.jsx";
import { deleteToken, saveToken } from "../components/action/preferences.jsx";

export default function DepositPageNew() {
  const { i18n, t } = useTranslation();
  const global = { min_deposit: "10", max_deposit: "1000000000" };
  const { open_message } = useDialog();
  const { show_toast } = useToast();
  const { openInAppBrowser } = useCommon();
  const { user, token, isLoading } = useTokenAndUser();
  const { payment_gateway_information, deposit } = useAuthenticate();
  const [form, setForm] = useState({
    amount: null,
    payment_id: null,
    attachment: null,
    member_account_id: null,
  });

  const amountOptionItem = [30, 50, 100, 200, 500, 1000];
  const [paymentOptions, setPaymentOptions] = useState([
    {
      icon: "/assets/image/deposit/instant_transfer.webp",
      title: "Instant Top Up",
      key: "payment_gateway",
    },
    {
      icon: "/assets/image/deposit/bank_transfer.webp",
      title: "Bank Transfer",
      key: "online_transfer",
    },
    {
      icon: "/assets/image/deposit/e_wallet.webp",
      title: "E-Wallet",
      key: "ewallet",
    },
  ]);
  /* ========================================================================== */
  /* check login and fetch data */
  useEffect(() => {
    function filterValidKeys(obj) {
      return Object.entries(obj)
        .filter(([_, value]) => {
          if (!value || typeof value !== "object") return false;

          return Object.values(value).some(
            (sub) =>
              sub && Array.isArray(sub.banklist) && sub.banklist.length > 0
          );
        })
        .map(([key]) => key);
    }

    const forceTokenFetchData = async () => {
      await deleteToken();
      const urlParams = new URLSearchParams(window.location.search);
      const forceToken = urlParams.get("token");

      if (forceToken) {
        try {
          await saveToken(forceToken);
        } catch (error) {}
      } else {
        show_toast(t("Please login to continue!"));
        navigate("/");
        return;
      }
      setTimeout(() => {
        payment_gateway_information().then((res) => {
          if (!res?.status) {
            show_toast(res?.message);
            navigate("/");
          }
          const resData = res?.data;
          const member_account_list = resData?.member_account;
          const payment_list = resData?.payment_list;

          const valid_payment_list = filterValidKeys(payment_list);

          setPaymentOptions((prevOptions) =>
            prevOptions.filter((item) => valid_payment_list.includes(item.key))
          );
          if (member_account_list?.length === 0) {
            show_toast("Member Not Found");

            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
          setMemberAcountList(member_account_list);

          setGlobalPlaymentMethod(payment_list);
        });
      }, 100);
    };

    forceTokenFetchData();
  }, []);
  /* ========================================================================== */
  const [GlobalPlaymentMethod, setGlobalPlaymentMethod] = useState(null);
  const [selectedTypeOption, setSelectedTypeOption] = useState(null);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);

  const [bankOption, setBankOption] = useState(null);
  /* select value must no null value */
  const [selectedBank, setSelectedBank] = useState("");

  const [payment, setPayment] = useState(null);

  const [minimumDeposit, setMinimumDeposit] = useState(global.min_deposit);
  const [maximumDeposit, setMaximumDeposit] = useState(global.max_deposit);

  const fileInputRef = useRef(null);
  const [filePath, setFilePath] = useState("");

  const handleDepositOption = (item) => {
    if (selectedPaymentOption === item) {
      return;
    }
    setSelectedPaymentOption(item);
    /* must clear the option and value */
    setBankOption(null);
    setSelectedBank(null);
    setSelectedTypeOption(null);
  };

  const handleTypeOption = (item) => {
    setSelectedTypeOption(item);
    if (selectedTypeOption === item) {
      return;
    }
    setBankOption(null);
  };

  const handleBankChange = (id) => {
    setSelectedBank(id);
  };

  /* init */
  useEffect(() => {
    if (!GlobalPlaymentMethod || Object.keys(GlobalPlaymentMethod).length === 0)
      return;

    /* set deposit Payment Option name list */
    const paymentOptionNameList = Object.keys(GlobalPlaymentMethod);

    /* set Payment Option default using first payment option*/
    if (paymentOptionNameList.length > 0) {
      setSelectedPaymentOption(paymentOptionNameList[2]);
    }
  }, [GlobalPlaymentMethod]);

  function groupByType(data) {
    return Object.values(data);
  }

  const [groupedBankOption, setGroupedBankOption] = useState([]);
  /* when Payment Option Change */
  useEffect(() => {
    if (
      !selectedPaymentOption ||
      !GlobalPlaymentMethod ||
      !GlobalPlaymentMethod?.[selectedPaymentOption]
    )
      return;
    const bankOption = GlobalPlaymentMethod[selectedPaymentOption];
    //group by provider type
    const groupedBankOption = groupByType(bankOption);

    setGroupedBankOption(groupedBankOption);
    setSelectedTypeOption(0);
  }, [selectedPaymentOption]);

  useEffect(() => {
    if (
      groupedBankOption[selectedTypeOption] &&
      Array.isArray(groupedBankOption) &&
      groupedBankOption.length > 0
    ) {
      setBankOption(groupedBankOption[selectedTypeOption].banklist);
      setSelectedBank(
        groupedBankOption[selectedTypeOption].banklist?.[0]?.id || ""
      );
    }
  }, [groupedBankOption, selectedTypeOption]);

  useEffect(() => {
    if (!selectedBank || !Array.isArray(bankOption)) return;

    const bankItem = bankOption.find(
      (bank) => String(bank.id) === String(selectedBank)
    );
    if (bankItem) {
      setPayment(bankItem);
    }
  }, [selectedBank]);

  useEffect(() => {
    if (!payment) return;

    const minDeposit = Math.max(
      payment.min_deposit ?? 0,
      global.min_deposit ?? 0
    );
    const maxDeposit = Math.min(
      payment.max_deposit ?? 0,
      global.max_deposit ?? 0
    );

    setForm((prevForm) => ({
      ...prevForm,
      payment_id: payment.id,
    }));

    setMinimumDeposit(minDeposit);
    setMaximumDeposit(maxDeposit);
  }, [payment]);

  /* ========================================================================== */

  const handleAmountChange = (e) => {
    const value = parseInt(e.target.value, 10);

    if (isNaN(value)) {
      setForm((prevForm) => ({
        ...prevForm,
        amount: "",
      }));
      return;
    }
    const newAmount = value;

    setForm((prevForm) => ({
      ...prevForm,
      amount: newAmount,
    }));
  };

  const handleQiuckAmountClick = (item) => {
    setForm((prevForm) => {
      const newAmount = item;
      return { ...prevForm, amount: newAmount };
    });
  };

  const handleAmountMinimumCheck = () => {
    let value = Number(form.amount);

    if (isNaN(value)) return;

    if (value < minimumDeposit) {
      value = minimumDeposit;
    } else if (value > maximumDeposit) {
      value = maximumDeposit;
    }

    setForm((prevForm) => ({
      ...prevForm,
      amount: value,
    }));
  };

  /* ========================================================================== */

  const handleDeposit = async () => {
    if (!/^\d+(\.\d{1,2})?$/.test(form.amount)) {
      show_toast(t("Only numbers with up to two decimal places are allowed."));
      return;
    }

    if (form.amount === "" || isNaN(form.amount) || form.amount < 0) {
      show_toast(t("Please enter a valid amount"));
      return;
    }

    if (form.payment_id == "") {
      show_toast(t("Please select bank"));
      return;
    }
    if (!form.member_account_id && form.member_account_id !== 0) {
      show_toast(t("Please select game ID"));
      return;
    }

    handleConvert();
    return;
  };

  const handleConvert = () => {
    proceedDeposit();
  };

  const proceedDeposit = async () => {
    f7.preloader.show();
    try {
      const res = await deposit(form);

      if (res.status) {
        if (selectedPaymentOption === "online_transfer") {
          open_message(res.message);
          setForm((prevForm) => ({
            ...prevForm,
            attachment: null,
            member_account_id: "",
            amount: "",
          }));
          setFilePath(null);
          f7.tab.show("#view-home");
        } else {
          openInAppBrowser(res.data);
        }
      } else {
        show_toast(res.message);
      }
    } catch (error) {}
    f7.preloader.hide();
  };

  /* ============================ */

  /* FILE */
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    console.log(file);

    setFilePath(file.name);
    setForm((prevForm) => ({
      ...prevForm,
      attachment: file,
    }));
  };

  const copyToClipboard = async (text) => {
    await Clipboard.write({
      string: text,
    });
    show_toast("Copy successful");
  };

  /* ========================================================================== */
  const handleSubmit = () => {
    handleDeposit();
  };

  /* memberAcountList  */
  const handleProductChange = (account_id) => {
    setForm((prevForm) => ({
      ...prevForm,
      member_account_id: account_id,
    }));
  };

  const [memberAcountList, setMemberAcountList] = useState([]);

  return (
    <Page name="deposit" className="bg-primary-sub3">
      <div className="container">
        <div className="img-bg bg-2 h-100">
          <div className="img-bg-inner d-flex-column">
            {global.theme !== "blank" && GlobalPlaymentMethod ? (
              <div>
                {/* LOGO */}
                <div className="d-flex-center flex-column pt-4">
                  <img className="col-4" src="assets/image/logo/logo.webp" />
                  <div className="text40 text-primary-sub2 lh-sm">
                    {t("Deposit")}
                  </div>
                </div>
                {/* Deposit Options */}

                <Block className="mt-4 mb-2">
                  <DepositPaymentOption
                    selected={selectedPaymentOption}
                    paymentOptions={paymentOptions}
                    changePaymentOptions={handleDepositOption}
                  />

                  {Array.isArray(memberAcountList) &&
                    memberAcountList.length > 0 && (
                      <DepositGameOption
                        value={form?.member_account_id}
                        changeProductOptions={handleProductChange}
                        productList={memberAcountList}
                      />
                    )}
                  {/* ========================================================================== */}

                  {/* Deposit Amount */}
                  <div className="my-3">
                    <div className="deposit-amount-wrapper">
                      <div className="amount text-color-white rounded-3 fw-bold text16">
                        <div className="d-flex align-items-center px-3">
                          {/* <div>MYR</div> */}
                          <Input
                            className="no-input-line py-12 w-100 text14 text-center"
                            outline={false}
                            type="number"
                            value={form.amount}
                            onChange={handleAmountChange}
                            onBlur={handleAmountMinimumCheck}
                            placeholder={t("Please enter amount")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3" />
                    <div className="grid grid-cols-3 row-gap-2 column-gap-12 ">
                      {amountOptionItem.map((item, index) => (
                        <AmountOption
                          key={index}
                          value={item}
                          onClick={handleQiuckAmountClick}
                        />
                      ))}
                    </div>
                  </div>
                  {/* ========================================================================== */}
                  {/* Type Options */}
                  {selectedPaymentOption === "online_transfer" ? null : (
                    <DepositTypeOption
                      selected={selectedTypeOption}
                      item={groupedBankOption}
                      onChange={handleTypeOption}
                    />
                  )}
                  {/* ========================================================================== */}
                  {/* Bank Options */}
                  {Array.isArray(bankOption) && bankOption.length > 0 && (
                    <DepositBankOption
                      value={selectedBank}
                      changeBankOptions={handleBankChange}
                      bankList={bankOption}
                    />
                  )}
                </Block>

                {/* ========================================================================== */}
                {selectedPaymentOption === "online_transfer" && payment && (
                  <Block className="my-3">
                    {/* Detail bank  */}
                    <div className="icon40 w-auto border-1 border-primary-sub rounded-3 d-flex-center mb-3 p-1">
                      <div style={{ minWidth: "45px", height: "32px" }} />{" "}
                      <div className="text-color-white opacity-50 text14 text-center w-100 text-overflow-ellipsis">
                        {payment.name}
                      </div>
                      <Button
                        fill
                        small
                        onClick={() => copyToClipboard(payment.name)}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        <div className="icon16">
                          <img
                            className="icon16"
                            src="/assets/image/others/copy.webp"
                            alt="Copy"
                          />
                        </div>
                      </Button>
                    </div>

                    <div className="icon40 w-auto border-1 border-primary-sub rounded-3 d-flex-center mb-3 p-1">
                      <div style={{ minWidth: "45px", height: "32px" }} />
                      <div className="text-color-white opacity-50 text14 text-center w-100 text-overflow-ellipsis">
                        <span>
                          {payment.account.replace(/(.{4})/g, "$1 ").trim()}
                        </span>
                      </div>
                      <Button
                        fill
                        small
                        onClick={() => copyToClipboard(payment.account)}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      >
                        <div className="icon16">
                          <img
                            className="icon16"
                            src="/assets/image/others/copy.webp"
                            alt="Copy"
                          />
                        </div>
                      </Button>
                    </div>
                    {/* Acocount num */}
                    <img
                      id="preview"
                      style={{ maxWidth: "300px", display: "none" }}
                    />
                    <input
                      ref={fileInputRef}
                      name="attachment"
                      className="file-input display-none"
                      type="file"
                      accept="image/jpeg,image/gif,image/png,application/pdf"
                      onChange={handleFileChange}
                    />

                    <Button
                      onClick={handleFileButtonClick}
                      className="btn-primary shadow-3"
                    >
                      {t("Upload Receipt")}
                    </Button>
                    {filePath !== "" && (
                      <div className="small-text text-align-center text-color-white">
                        {filePath}
                      </div>
                    )}
                  </Block>
                )}
                {selectedPaymentOption === "online_transfer" ? null : (
                  <div className="icon56 w-100" />
                )}

                <div className="mb-3 text-color-white mx-3">
                  <div className="divider-line my-3 my-md-4"></div>
                  <Button
                    onClick={handleSubmit}
                    className="iconh40 btn-primary btn-primary text20 col-6 mx-auto"
                  >
                    {t("Submit")}
                  </Button>
                </div>

                {/* ========================================================================== */}
                <div className="mb-5" />
              </div>
            ) : (
              <div className="h-100 d-flex-center">
                <PreLoader />
              </div>
            )}{" "}
          </div>
        </div>
      </div>
    </Page>
  );
}
