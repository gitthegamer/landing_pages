import { Button, f7 } from "framework7-react";
import { useTranslation } from "react-i18next";

const AskLogin = () => {
  const { t } = useTranslation();
  const handleLogin = () => {
    f7.loginScreen.open("#login-modal");
  };

  return (
    <>
      <div
        className="color-background"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <div>
          <img
            className="logo"
            src="/assets/image/logo/logo.webp"
            alt="Login"
          />
        </div>
        <span className="text-color-white mb-3">
          {t("Please login to continue!")}
        </span>
        <Button
          className="medium-btn bg-gradient-primary-main main text16 text-color-white"
          onClick={handleLogin}
        >
          {t("Login")}
        </Button>
      </div>
    </>
  );
};

export default AskLogin;
