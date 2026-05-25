import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setNavigate } from "./action/navigate";
import { useTranslation } from "react-i18next";
import { useDialog } from "./action/Dialog";
import useEdnexDocumentScroll from "./home/useEdnexDocumentScroll";

const Layout = () => {
  useEdnexDocumentScroll();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { open_message } = useDialog();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get("Message");
    const errorMessage = urlParams.get("errorMessage");

    if (message) {
      open_message(t(message));
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete("Message");
      window.history.replaceState(null, "", currentUrl.href);
    }

    if (errorMessage) {
      open_message(t(errorMessage));
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete("errorMessage");
      window.history.replaceState(null, "", currentUrl.href);
    }
  }, [location.search, open_message, t]);

  return (
    <div className="ednex-layout position-relative">
      <Outlet />
    </div>
  );
};

export default Layout;
