import { Navbar } from "framework7-react";
import React from "react";
import navigate from "./action/navigate";
import { useTranslation } from "react-i18next";

function BackHeader({ name }) {
  const { t } = useTranslation();
  return (
    <Navbar
      title={t(name)}
      sliding={false}
      backLink="Back"
      className="navbar-custom"
      onBackClick={() => {
        navigate(-1);
      }}
    >
      {["/mall", "/vip", "/leaderboard"].includes(location.pathname) && (
        <div className="position-relative text-color-white text-align-center w-100">
          <div
            // style={{ transform: "translate(-25%,-50%)" }}
            style={{ transform: "translate(-16px,-50%)" }}
            className="position-absolute end-0 top-50 d-flex"
          >
            <img
              onClick={() => navigate("/notification")}
              className="icon24"
              src="/assets/image/icon/float_notification_icon.webp"
            />
            {/* <div className="notice-point icon16 lh-1 translate-middle">5</div> */}
          </div>
        </div>
      )}
    </Navbar>
  );
}

export default BackHeader;
