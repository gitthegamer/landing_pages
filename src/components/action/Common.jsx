import { Browser } from "@capacitor/browser";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CommonState from "../../atoms/CommonState";
import AuthState from "../../atoms/AuthState";
import { useRecoilState } from "recoil";
import useAuthenticate from "../../actions/Authenticate";
import { saveUser } from "./preferences";
import { useDialog } from "./Dialog";

export default useCommon;

function useCommon() {
  const { t } = useTranslation();
  const [commonState, setCommonState] = useRecoilState(CommonState);
  const [authState, setAuthState] = useRecoilState(AuthState);
  const { auth } = useAuthenticate();
  const { open_confirm_message } = useDialog();
  return {
    formatDateToYMD,
    formatDate,
    formatTime,
    formatAmount,
    member_status,
    product_category,
    product_status,
    rebate_category,
    transaction_type,
    transaction_status,
    bonus_status,
    transaction_color_status,
    bet_color_status,
    bet_status,
    transfer_type,
    fd_status,
    fd_status_color,
    fd_list_types,
    forgot_password_type,
    verify_sms_type,
    currency,
    refresh_user,
    openInAppBrowser,
    currencyList,
    navigate,
    getImgUrl,
  };

  function formatDateToYMD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toString() !== "Invalid Date"
      ? date.toLocaleDateString()
      : "Invalid Date";
  }

  function formatTime(timeString) {
    const time = new Date(timeString);
    return time.toString() !== "Invalid Date"
      ? time.toLocaleTimeString()
      : "Invalid Date";
  }

  function formatAmount(amount, fraction_digits = 2) {
    if (
      typeof fraction_digits !== "number" ||
      fraction_digits < 0 ||
      !Number.isInteger(fraction_digits)
    ) {
      fraction_digits = 2;
    }

    if (amount === undefined || amount === null || isNaN(parseFloat(amount))) {
      amount = 0;
    }
    return parseFloat(amount).toLocaleString(undefined, {
      minimumFractionDigits: fraction_digits,
      maximumFractionDigits: fraction_digits,
    });
  }

  function member_status(data) {
    const MEMBER_STATUS = {
      0: "Disabled",
      1: "Enabled",
      2: "Suspended",
      3: "Testing",
    };
    if (Object.values(MEMBER_STATUS).includes(data)) {
      return (
        Object.keys(MEMBER_STATUS).find((key) => MEMBER_STATUS[key] === data) ??
        "Unknown"
      );
    }
    return MEMBER_STATUS[data] ?? "Unknown";
  }

  function product_category(data) {
    const PRODUCT_CATEGORY = {
      1: "Live Dealer",
      2: "Sportsbook",
      3: "Slots",
      4: "Lottery",
      5: "App",
      6: "Fishing",
      7: "Table Game",
      8: "EGame",
    };
    return PRODUCT_CATEGORY[data] ?? "Unknown";
  }

  function product_status(data) {
    const PRODUCT_STATUS = {
      1: "Active",
      2: "New",
      3: "Hot",
      4: "Maintenance",
      5: "Comming Soon",
      6: "Popular",
    };
    if (Object.values(PRODUCT_STATUS).includes(data)) {
      return (
        Object.keys(PRODUCT_STATUS).find(
          (key) => PRODUCT_STATUS[key] === data
        ) ?? "Unknown"
      );
    }
    return PRODUCT_STATUS[data] ?? "Unknown";
  }

  function rebate_category(data) {
    const REBATE_CATEGORY = {
      1: "Live Dealer",
      2: "Sportsbook",
      3: "Slots",
    };
    return REBATE_CATEGORY[data] ?? "Unknown";
  }

  function transaction_type(data) {
    const TRANSACTION_TYPES = {
      0: "All",
      1: "Deposit",
      2: "Withdrawal",
      5: "Adjustment",
      6: "Bonus",
      7: "Commission",
      8: "Rebate",
      9: "Transfer In",
      10: "Transfer Out",
      11: "FD Transfer In",
      12: "FD Transfer Out",
      13: "FD Interest",
      14: "Main Wallet Transfer In",
      15: "Main Wallet Transfer Out",
      16: "Game Wallet Transfer In",
      17: "Game Wallet Transfer Out",
    };
    return TRANSACTION_TYPES[data] ?? "Unknown";
  }

  function transaction_status(data) {
    const TRANSACTION_STATUS = {
      1: "In progress",
      2: "Pending",
      3: "Success",
      4: "Failed",
      5: "Approved",
      6: "Cancelled",
      7: "Revoke",
    };
    return TRANSACTION_STATUS[data] ?? "Unknown";
  }

  function transaction_color_status(data) {
    switch (data) {
      case 3:
        return "text-green";
      case 4:
      case 6:
      case 7:
        return "text-red";
      case 1:
      case 2:
        return "text-blue";

      default:
        return "text-white";
    }
  }

  function bet_color_status(data) {
    if (data < 0) {
      return "text-red";
    } else if (data > 0) {
      return "text-green";
    } else {
      return "text-white";
    }
  }

  function bet_status(data) {
    if (data < 0) {
      return "Lost";
    } else if (data > 0) {
      return "Win";
    } else {
      return "Draw";
    }
  }

  function bonus_status(data) {
    const BONUS_STATUS = {
      1: "Active",
      2: "Inactive",
      3: "Mission Completed",
      4: "Hit Winover",
    };
    return BONUS_STATUS[data] ?? "Unknown";
  }

  function transfer_type(data) {
    const TRANSFER_TYPE = {
      0: "Game Wallet",
      1: "Main Wallet",
      2: "Member",
      3: "Agent",
    };

    return TRANSFER_TYPE[data] ?? "Unknown";
  }

  function fd_status(data) {
    const FD_STATUS = {
      11: "Deposit",
      12: "Withdraw",
      13: "Interest",
    };
    return FD_STATUS[data] ?? "Unknown";
  }

  function fd_status_color(data) {
    switch (data) {
      case 11:
        return "text-gold";
      case 12:
        return "text-red";
      case 13:
        return "text-green";
      default:
        return "text-white";
    }
  }

  function fd_list_types() {
    return [
      { value: 11, label: "Deposit" },
      { value: 12, label: "Withdraw" },
      { value: 13, label: "Interest" },
    ];
  }

  function forgot_password_type() {
    return [
      { value: 0, label: "Password" },
      { value: 1, label: "Username" },
    ];
  }

  function verify_sms_type(data) {
    const SMS_TYPE = {
      0: "sms",
      1: "whatsapp",
    };
    return SMS_TYPE[data] ?? "sms";
  }

  function currency(data) {
    const CURRENCY = {
      1: "SGD",
      2: "MYR",
      3: "USD",
    };

    return CURRENCY[data] ?? null;
  }

  async function refresh_user() {
    try {
      const res = await auth(); // get user data and save to Preferences

      if (res.status) {
        await saveUser(res.data);
        setAuthState((prev) => ({ ...prev, user: res.data }));
      } else {
      }
    } catch (error) {}
  }

  async function openInAppBrowser(url) {
    // if (Device.getInfo().platform === "android") {
    //   const options = {
    //     zoom: "no", // Disable zooming
    //     toolbar: "yes", // Enable the toolbar
    //     hideurlbar: "no", // Don't hide the URL bar
    //     navigationbuttoncolor: "#ffffff", // Set color of navigation buttons (back/forward)
    //     closebuttoncolor: "#ffffff", // Set color of the close button
    //     toolbarcolor: "#000000", // Set the background color of the toolbar
    //     translucent: "no", // Disable transparency on iOS
    //     location: "yes",
    //     clearcache: "yes",
    //     javascript: "yes",
    //     allowInlineMediaPlayback: "yes",
    //     toolbarposition: "bottom",
    //   };

    //   try {
    //     const browser = InAppBrowser.create(url, "_blank", options);

    //     // Add a listener when the InAppBrowser is closed to lock ScreenOrientation in portrait
    //     browser.on("exit").subscribe(() => {
    //       refresh_user();
    //       ScreenOrientation.lock({ orientation: "portrait" });
    //     });

    //     browser.show();
    //     /*  ScreenOrientation.unlock(); */
    //   } catch (error) {}
    // }
    // if (Device.getInfo().platform === "ios") {
    const res = await open_confirm_message(
      t("Please click confirm to proceed")
    );
    if (res) {
      Browser.open({ url: url });
    }
    // } else {
    //   console.log("Error");
    //   await Browser.open({ url: url });
    // }
  }

  function currencyList() {
    return [
      {
        currency: "SGD",
        image: "/assets/image/transactions/singapore.webp",
      },
      {
        currency: "MYR",
        image: "/assets/image/transactions/malaysia.webp",
      },
      {
        currency: "USD",
        image: "/assets/image/transactions/usdt.webp",
      },
    ];
  }

  function navigate(path) {
    const navigate = useNavigate();

    if (path === "-1") navigate(-1);
    else navigate(path);
  }

  function getImgUrl(img) {
    if (!img) {
      return;
      // throw new Error("Image URL is required");
    }

    // If it's a complete HTTP(S) URL, return it directly (replace http with https)
    if (/^https?:/.test(img)) {
      return img.replace(/^http:\/\//, "https://");
    }

    // If the URL starts with "//", add "https:" to make it a valid URL
    if (/^\/\//.test(img)) {
      return `https:${img}`; // Add https: if the URL starts with //
    }

    // If the URL starts with "/" or not any "/", add the domain to form a complete URL
    else if (/^\//.test(img) || !/^\//.test(img)) {
      return `https://zues-admin.com${img.startsWith("/") ? img : `/${img}`}`;
    }
  }
}
