import React from "react";
import { Page, Navbar, Block, f7, Button } from "framework7-react";
import navigate from "../components/action/navigate";
import { useTranslation } from "react-i18next";

const LandingPage = () => {
  const { t } = useTranslation();

  const handleClick = () => {
    if (window?.fbq) {
      window.fbq("track", "Contact", {
        method: "form",
        content_name: "Contact Us Button",
      });
    }
    window.open("http://t.me/TheGamer_77");
  };

  return (
    <Page>
      <div className="container">
        <div className="img-bg h-100">
          <div className="img-bg-inner d-flex-column">
            <div className="d-flex-center p-32 mt-auto">
              <div className="position-relative col-9 ">
                <img className="w-100" src="/assets/image/others/btn.gif" />
                <Button
                  onClick={handleClick}
                  className="position-absolute start-0 top-0 w-100 h-100 d-flex-center "
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default LandingPage;
