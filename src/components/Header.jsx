import React, { useEffect, useRef, useState } from "react";
import { Page, Navbar, NavLeft, NavRight, Button } from "framework7-react";
import useSideMenu from "./action/Sidemenu";
import SideMenu from "./SideMenu";
import navigate from "./action/navigate";
import { useTokenAndUser } from "./action/user-data";
import GlobalState from "../atoms/GlobalState";
import { useRecoilState, useRecoilValue } from "recoil";
import CommonState from "../atoms/CommonState";
import { useTranslation } from "react-i18next";
import useCommon from "./action/Common";

function Header(props) {
  const { t } = useTranslation();
  const { formatAmount } = useCommon();
  const { user, isLoading } = useTokenAndUser();
  const global = useRecoilValue(GlobalState);

  const { open_sidemenu, close_sidemenu, sidemenu_open } = useSideMenu();

  const vipImg = [
    {
      name: "green",
      title: "GREEN",
      img_id: "rank_1",
    },
    {
      name: "bronze",
      title: "BRONZE",
      img_id: "rank_2",
    },
    {
      name: "silver",
      title: "SILVER",
      img_id: "rank_3",
    },
    {
      name: "gold",
      title: "GOLD",
      img_id: "rank_4",
    },
    {
      name: "platinum",
      title: "PLATINUM",
      img_id: "rank_5",
    },
    {
      name: "diamond",
      title: "DIAMOND",
      img_id: "rank_6",
    },
  ];

  return (
    <div className=" w-100">
      <div className="header header-bg w-100">
        <div className="d-flex align-items-center jsutify-content-space-between w-100 h-100 mx-auto">
          <img
            onClick={() => navigate("/")}
            className="pointer logo-icon ms-3"
            src="/assets/image/logo/logo.webp"
          />

          <div className="d-flex align-items-center ms-auto">
            {user && !isLoading ? (
              <>
                <div className="me-3">
                  <div className="d-flex justify-content-end align-items-center">
                    <img
                      className="icon24 h-auto me-2"
                      src={`/assets/image/icon/${
                        vipImg.find(
                          (item) => item.title === user?.ranks?.name.en
                        )?.img_id
                      }.webp`}
                    />

                    <div className="fw-bold text-color-white text12 text-md16">
                      {user?.username}
                    </div>
                  </div>
                  <div className="d-flex text-secondary-sub2">
                    <div className="me-2">MYR </div>
                    <div>
                      <div>{formatAmount(user?.lockable_balance)}</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="d-none d-md-flex">
                <Button
                  loginScreenOpen={"#login-modal"}
                  className="small-btn rounded-3 text12 text-md16 border border-primary-sub text-color-white px-3 me-2"
                >
                  {t("Login")}
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  className="small-btn rounded-3 text12 text-md16 text-color-white btn-primary px-2 me-3"
                >
                  {t("Register")}
                </Button>
              </div>
            )}
            <img
              onClick={open_sidemenu}
              className="pointer icon24 me-3"
              src="/assets/image/icon/menu.webp"
              alt="Spin Wheel"
              style={{ marginRight: "16px", height: "14px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
