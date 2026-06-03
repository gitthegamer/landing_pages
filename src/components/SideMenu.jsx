import React, { useEffect, useState } from "react";
import { Button, ListItem } from "framework7-react";
import { useTranslation } from "react-i18next";
import useSideMenu from "./action/Sidemenu";
import { useTokenAndUser } from "./action/user-data";
import { useDialog } from "./action/Dialognew";
import useCommon from "./action/Common";
import { deleteToken, getLanguage, setLanguage } from "./action/preferences";
import i18n from "../i18n";
import navigate from "./action/navigate";

function SideMenu() {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const { open_confirm_message } = useDialog();
  const { user, isLoading, checkTokenChange } = useTokenAndUser();
  const { formatAmount } = useCommon();
  const { open_sidemenu, close_sidemenu, sidemenu_open } = useSideMenu();

  const languageList = [
    { name: "en", label: "english" },
    { name: "cn", label: "中文" },
    { name: "bm", label: "melayu" },
  ];

  useEffect(() => {
    const fetchLanguage = async () => {
      const lng = await getLanguage();
      setCurrentLanguage(lng ?? "en");
    };

    fetchLanguage();
  }, []);

  const sideMenuItem = [
    { title: "Reward", name: "reward", path: "/reward" },
    { title: "Mall", name: "mall", path: "/mall" },
    { title: "VIP", name: "vip", path: "/vip" },
    { title: "Leaderboard", name: "leaderboard", path: "/leaderboard" },
    { title: "Feed back", name: "feedback", path: "/feedback" },
  ];

  const handleDropdownChange = (value) => {
    setCurrentLanguage(value);
    i18n.changeLanguage(value);
    setLanguage(value);
    window.location.reload();
  };

  const hanldeLogout = () => {
    open_confirm_message("", t("Do you sure to log out?")).then((res) => {
      if (res) {
        deleteToken();
        checkTokenChange();
      }
    });
  };

  const handleNavigate = (path) => {
    navigate(path);
    close_sidemenu();
  };

  return (
    <>
      <div
        onClick={close_sidemenu}
        className={`position-absolute sidemenu-backdrop w-100 h-100 ${
          sidemenu_open ? "open" : ""
        }`}
      />
      <div
        id={"sidemenu"}
        className={`sidemenu position-absolute w-100 h-100 px-3 px-md-4 py-4 rounded-start-4 ${
          sidemenu_open ? "open" : ""
        }`}
      >
        <div className="w-75 text-color-white">
          {user && !isLoading ? (
            <div>
              <div className="d-flex align-items-center">
                <img
                  className="icon32 me-2"
                  src="/assets/image/icon/rank_4.webp"
                />

                <div className="w-100 fw-bold text-color-white">
                  {user?.username}
                </div>
              </div>
              <div className="text-secondary-sub2">
                MYR {formatAmount(user?.lockable_balance)}
              </div>
            </div>
          ) : null}
          <div className="d-flex align-items-center w-100 my-4">
            <img
              className="icon20 me-2"
              src="/assets/image/icon/language.webp"
            />
            <div className="w-100">
              <ListItem
                className={`selector mt-0 ${
                  currentLanguage !== "" ? "selector-active" : ""
                }`}
                title="select language"
                smartSelect
                smartSelectParams={{ openIn: "sheet" }}
              >
                <select
                  value={currentLanguage}
                  name="selector-sheet"
                  onChange={(e) => handleDropdownChange(e.target.value)}
                >
                  {languageList.map((language) => (
                    <option key={language.name} value={language.name}>
                      {language.label}
                    </option>
                  ))}
                </select>
                <div className="item-after">
                  {
                    languageList.find(
                      (language) => language.name === currentLanguage
                    )?.label
                  }
                </div>
              </ListItem>
            </div>
          </div>
          {sideMenuItem.map((item, index) => (
            <div
              className="pointer mb-12"
              key={index}
              onClick={() => handleNavigate(item.path)}
            >
              {t(item.title)}
            </div>
          ))}

          {user && (
            <Button
              onClick={hanldeLogout}
              className="small-btn bg-gradient-primary-main border-primary-sub border mt-3"
            >
              {t("Log Out")}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default SideMenu;
