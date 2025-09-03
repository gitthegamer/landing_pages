import React, { useEffect, useRef, useState } from "react";
import { Page, Block, ListItem, Input, Button, f7 } from "framework7-react";
import { useRecoilValue } from "recoil";
import GlobalState from "../atoms/GlobalState.jsx";
import useAuthenticate from "../actions/Authenticate.jsx";
import { useTokenAndUser } from "../components/action/user-data.jsx";
import { Clipboard } from "@capacitor/clipboard";
import { useTranslation } from "react-i18next";
import { useToast } from "../components/action/Toast.jsx";
import PreLoader from "../components/common/pre-loader.jsx";
import useCommon from "../components/action/Common.jsx";
import AmountOption from "../components/common/amount-option.jsx";
import DepositPaymentOption from "../components/deposit/DepositPaymentOption.jsx";
import DepositBankOption from "../components/deposit/DepositBankOption.jsx";
import DepositTypeOption from "../components/deposit/DepositTypeOption.jsx";
import DepositGameOption from "../components/deposit/DepositGameOption.jsx";

export default function DepositPageNew() {
  const { i18n, t } = useTranslation();
  const global = useRecoilValue(GlobalState);
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
  /* ========================================================================== */
  const amountOptionItem = [20, 50, 100, 200, 500, 1000];
  const paymentOptions = [
    {
      icon: "/assets/image/deposit/instant_transfer.webp",
      title: "Instant Top Up",
      key: "gateway",
    },
    {
      icon: "/assets/image/deposit/bank_transfer.webp",
      title: "Bank Transfer",
      key: "bank_transfer",
    },
    {
      icon: "/assets/image/deposit/e_wallet.webp",
      title: "E-Wallet",
      key: "e_wallet",
    },
  ];
  /* ========================================================================== */
  const GlobalPlaymentMethod = global.payment_methods;

  const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
  const [selectedTypeOption, setSelectedTypeOption] = useState(null);

  const [bankOption, setBankOption] = useState(null);
  /* select value must no null value */
  const [selectedBank, setSelectedBank] = useState("");

  const [payment, setPayment] = useState(null);

  const [minimumDeposit, setMinimumDeposit] = useState(global.min_deposit);
  const [maximumDeposit, setMaximumDeposit] = useState(global.max_deposit);

  const fileInputRef = useRef(null);
  const [filePath, setFilePath] = useState("");

  const handleDepositOption = (item) => {
    setSelectedPaymentOption(item);
    if (selectedPaymentOption === item) {
      return;
    }
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
      setSelectedPaymentOption(paymentOptionNameList[0]);
    }
  }, [GlobalPlaymentMethod]);

  const globalPaymentLogo = global.payment_logos;
  function groupByType(data) {
    return Object.values(
      data.reduce((acc, item) => {
        const type = item.type;

        const image = globalPaymentLogo?.[type] || "no-image";

        if (image === "no-image") {
          if (!acc["no-image"]) {
            acc["no-image"] = {
              type: "no-image",
              items: [],
              images: "no-image",
            };
          }
          acc["no-image"].items.push(item);
        } else {
          if (!acc[type]) {
            acc[type] = { type, items: [], images: image };
          }
          acc[type].items.push(item);
        }

        return acc;
      }, {})
    );
  }

  const [groupedBankOption, setGroupedBankOption] = useState([]);
  /* when Payment Option Change */
  useEffect(() => {
    if (!selectedPaymentOption) return;
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
      setBankOption(groupedBankOption[selectedTypeOption].items);
      setSelectedBank(groupedBankOption[selectedTypeOption].items[0].id);
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
      setForm({ ...form, amount: "" });
      return;
    }
    const newAmount = Math.min(value, maximumDeposit);

    setForm({ ...form, amount: newAmount });
  };

  const handleQiuckAmountClick = (item) => {
    setForm((prevForm) => {
      const newAmount = Math.min(
        maximumDeposit,
        Math.max(item, minimumDeposit)
      );

      return { ...prevForm, amount: newAmount };
    });
  };

  const handleAmountMinumumCheck = () => {
    const value = form.amount;
    const newAmount = Math.min(Math.max(value, minimumDeposit), maximumDeposit);
    setForm({ ...form, amount: newAmount });
  };

  /* ========================================================================== */

  const handleDeposit = async () => {
    if (!/^\d+(\.\d{1,2})?$/.test(form.amount)) {
      show_toast(t("Only numbers with up to two decimal places are allowed."));
      return;
    }

    if (form.amount === "" || isNaN(form.amount)) {
      show_toast(t("Please enter minimum amount of ") + minimumDeposit);
      return;
    }

    if (form.amount < 0) {
      show_toast(t("Please enter a valid amount"));
      return;
    }

    if (form.payment_id == "") {
      show_toast(t("Please select bank"));
      return;
    }

    // const isOngoingDeposit = await ongoing_deposit_check();
    // if (isOngoingDeposit) {
    //   f7.dialog.confirm(
    //     t("You have an ongoing deposit. Do you want to cancel it?"),
    //     "",
    //     () => {
    //       handleCancelDeposit();
    //     },
    //     () => {}
    //   );
    //   return;
    // }
    handleConvert();
    return;
  };

  // const ongoing_deposit_check = async () => {
  //   f7.preloader.show();
  //   try {
  //     const res = await deposit_check();
  //     f7.preloader.hide();
  //     if (res.status) {
  //       return true;
  //     }
  //     return false;
  //   } catch (error) {}
  //   f7.preloader.hide();
  // };

  const handleConvert = () => {
    proceedDeposit();
  };

  const proceedDeposit = async () => {
    f7.preloader.show();
    try {
      const res = await deposit(form);

      if (res.status) {
        if (selectedPaymentOption === "online_transfer") {
          show_toast(res.message);
          setForm({ ...form, attachment: null });
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

  const handleCancelDeposit = async () => {
    f7.preloader.show();
    const res = await deposit_cancel();
    f7.preloader.hide();
    show_toast(t(res.message));
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
  }, [user]);

  /* ============================ */

  /* FILE */
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFilePath(file.name);
    setForm({ ...form, attachment: file });
  };

  // const copyToClipboard = async (text) => {
  //   await Clipboard.write({
  //     string: text,
  //   });
  //   show_toast("Copy successful");
  // };

  /* ========================================================================== */
  const handleSubmit = () => {
    handleDeposit();
  };

  /* gameList  */
  const handleGameChange = (code) => {
    setSelectedGame(code);
  };

  const gameList = global?.products;
  const [selectedGame, setSelectedGame] = useState(gameList?.[0]?.code);

  return (
    <Page name="deposit" className="bg-primary-sub3">
      <div className="container">
        <div className="img-bg bg-2 h-100">
          <div className="img-bg-inner d-flex-column">
            {global.theme !== "blank" ? (
              <div>
                {/* LOGO */}
                <div className="d-flex-center flex-column pt-4">
                  <img className="col-4" src="/assets/image/logo/logo.webp" />
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

                  {Array.isArray(gameList) && gameList.length > 0 && (
                    <DepositGameOption
                      value={selectedGame}
                      changeGameOptions={handleGameChange}
                      gameList={gameList}
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
                            onBlur={handleAmountMinumumCheck}
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
                  {/* ========================================================================== */}
                  {/* Type Options */}
                  <DepositTypeOption
                    selected={selectedTypeOption}
                    item={groupedBankOption}
                    onChange={handleTypeOption}
                  />
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
                {selectedPaymentOption === "bank_transfer" && payment && (
                  <Block className="my-3">
                    {/* Detail bank  */}
                    <div className="icon40 w-auto border-1 border-primary-sub rounded-3 d-flex-center mb-3 p-1">
                      <div className="text-color-white opacity-50 text14 text-center w-100 text-overflow-ellipsis">
                        {payment.name}
                      </div>
                      {/* <Button
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
                      </Button> */}
                    </div>

                    <div className="icon40 w-auto border-1 border-primary-sub rounded-3 d-flex-center mb-3 p-1">
                      <div className="text-color-white opacity-50 text14 text-center w-100 text-overflow-ellipsis">
                        <span>
                          {payment.account.replace(/(.{4})/g, "$1 ").trim()}
                        </span>
                      </div>
                      {/* <Button
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
                      </Button> */}
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
                {selectedPaymentOption === "bank_transfer" ? null : (
                  <div className="icon56 w-100" />
                )}
                <div className="mb-3 text-color-white mx-3">
                  <div className="divider-line my-3 my-md-4"></div>
                  <Button
                    onClick={() => {}}
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
