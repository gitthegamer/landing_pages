import React, { useEffect } from "react";
import { Page, Navbar, Block, f7 } from "framework7-react";
import navigate from "../components/action/navigate";
import { useToast } from "../components/action/Toast";

const NotFoundPage = () => {
  const { show_toast } = useToast();
  useEffect(() => {
    if (!navigate) return;

    const timeout = setTimeout(() => {
      try {
        show_toast("Page Not Found");
        navigate("/");
      } catch (e) {
        console.error(e.message);
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, []);
  return <Page></Page>;
};

export default NotFoundPage;
