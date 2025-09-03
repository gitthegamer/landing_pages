import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { setNavigate } from "./action/navigate";
import routes from "../library/routes";
import { useTranslation } from "react-i18next";
import { useDialog } from "./action/Dialog";

const Layout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const route = routes[0].children;

  const currentPath = route
    .filter((item) => item.path !== "/")
    .find((item) => location.pathname.startsWith(item.path));

  const isTabPage = [
    "/",
    "/promotion",
    "/deposit",
    "/withdraw",
    "/settings",
    "/feedback",
  ].includes(location.pathname);

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  const reactLocation = useLocation();
  const { open_message } = useDialog();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get("Message");
    const errorMessage = urlParams.get("errorMessage");

    if (message) {
      const messages = {
        depositpending: "Your deposit is being processed, please wait.",
        depositsuccessful:
          "Your deposit is successful, please wait for the approval.",
      };

      open_message(t(messages[message] || message));

      const currentUrl = new URL(window.location.href);
      if (currentUrl.searchParams.has("Message")) {
        currentUrl.searchParams.delete("Message");
        window.history.replaceState(null, "", currentUrl.href);
      }
    }

    if (errorMessage) {
      const messages = {
        PAYMENT: "Payment failed, please try again.",
      };
      open_message(t(messages?.[errorMessage] || errorMessage));

      const currentUrl = new URL(window.location.href);
      if (currentUrl.searchParams.has("errorMessage")) {
        currentUrl.searchParams.delete("errorMessage");
        window.history.replaceState(null, "", currentUrl.href);
      }
    }
  }, [location.search]);

  return (
    <div className="d-flex-column h-100 overflow-hidden position-relative">
      {/* {isTabPage ? (
        <>
          <Header />
        </>
      ) : (
        <>
          <div className="d-md-block d-none">
            <Header />
          </div>
          <div className="d-md-none d-block">
            <BackHeader name={currentPath?.name || "Not Found"} />
          </div>
        </>
      )} */}

      <div className="position-relative bg-color-black bg-primary-sub3 h-100">
        <div style={{ maxWidth: "425px" }} className={`h-100 mx-auto`}>
          {/* <div className={`header-shadow position-relative`} /> */}
          <Outlet />
        </div>
      </div>

      {/* Bottom Menu */}
      {isTabPage && (
        <>
          {/* <Toolbar
            tabbar
            icons
            bottom
            className="d-md-none d-block position-fixed bottom-menu"
          >
            <BottomMenu />
          </Toolbar> */}
          {/* Center Floating Button */}
          {/* <div className="d-md-none d-block btn-nav-bottom-center icon64 position-absolute start-50 bottom-0 translate-middle-x p-12 pt-2 mb-3">
            <Button
              style={{ backgroundColor: "transparent" }}
              onClick={() => navigate("/deposit")}
              className={`d-flex-column tab-link ${
                location.pathname === "/deposit" ? "tab-link-active" : ""
              }`}
            >
              <img
                className="icon40 h-auto me-1"
                src={`/assets/image/bottommenu/deposit${
                  location.pathname === "/deposit" ? "_active" : "_inactive"
                }.webp`}
                alt="Deposit"
              />
              <div
                style={{
                  color: location.pathname === "/deposit" ? "white" : "#002a2b",
                }}
                className="label text-align-center fw-black text10"
              >
                {t("Deposit")}
              </div>
            </Button>
          </div> */}
        </>
      )}
    </div>
  );
};

export default Layout;
