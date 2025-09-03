import React from "react";
import { Page, Navbar, Block, f7, Button } from "framework7-react";
import navigate from "../components/action/navigate";
import { useTranslation } from "react-i18next";

const LandingPage = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <div className="container">
        <div className="img-bg h-100">
          <div className="img-bg-inner d-flex-column">
            <div className="d-flex-center p-32 mt-auto">
              <div className="position-relative col-9 ">
                <img className="w-100" src="assets/image/others/btn.gif" />
                <Button
                  // onClick={() => navigate("/deposit")}
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
