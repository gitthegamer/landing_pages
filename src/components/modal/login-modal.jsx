import React, { useEffect, useState } from "react";
import {
  View,
  Page,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  BlockFooter,
  f7,
  Button,
  Icon,
} from "framework7-react";
import useAuth from "../../actions/Authenticate";
import { useToast } from "../action/Toast";
import navigate from "../action/navigate";
import { useDialog } from "../action/Dialog";
import ForgotPassword from "./ForgotPassword";
import { useTranslation } from "react-i18next";

const LoginModal = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const { login, forgot_password } = useAuth();
  const { show_toast } = useToast();
  const { open_dialog_component } = useDialog();

  const [form, setForm] = useState({
    username: "",
    phone: "",
    username_or_phone: "",
    password: "",
    isSubmited: false,
  });
  const handleLogin = (e) => {
    e.preventDefault();

    f7.preloader.show();

    login(form).then((res) => {
      f7.preloader.hide();
      if (!res.status) {
        show_toast(res.message);
        return;
      }
      show_toast(res.message);
      f7.loginScreen.close();
      f7.tab.show("#view-home");
    });
  };

  const handleRegister = (e) => {
    navigate("/register");
    f7.loginScreen.close();
  };

  let forgotPasswordHandler = null;
  const handleForgotPassword = () => {
    open_dialog_component("", ForgotPassword, {
      onSubmit: (handler) => {
        forgotPasswordHandler = handler;
      },
      forgot_password,
    }).then((res) => {
      if (res) {
        forgotPasswordHandler();
      }
    });
  };

  return (
    <LoginScreen id="login-modal">
      <View>
        <Page className="bg-color-black">
          <div className="container">
            <div className="d-flex-center">
              <img
                src={"/assets/image/logo/logo.png"}
                className="logo mb-3"
                alt="label1landing"
              />
            </div>
            <List className="my-0">
              <ListInput
                type="text"
                name="username"
                placeholder={t("Username")}
                value={form.username_or_phone}
                className="no-input-line mb-2"
                onInput={(e) =>
                  setForm({ ...form, username_or_phone: e.target.value })
                }
              ></ListInput>
            </List>
            <List className="position-relative my-0">
              <ListInput
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={t("Password")}
                value={form.password}
                className="no-input-line"
                onInput={(e) => setForm({ ...form, password: e.target.value })}
                slot=""
              ></ListInput>
              <div className="position-absolute end-0 top-50 translate-middle-y pe-4 d-flex">
                {/* {showPassword ? (
                  <FaEyeSlash
                    className=" icon16 toggle-password-icon text-color-black my-auto"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FaEye
                    className=" icon16 toggle-password-icon text-color-black my-auto"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )} */}
              </div>
            </List>
            {/* forget password at right side */}
            <div className="d-flex justify-content-end">
              <Button
                onClick={handleForgotPassword}
                className="text-primary-sub"
              >
                {t("Forgot Password")}?
              </Button>
            </div>
            <List
              form
              style={{
                marginBottom: 0,
                marginTop: 0,
                marginLeft: "16px",
                marginRight: "16px",
              }}
            >
              <Button
                className="medium-btn bg-gradient-primary-main main text16 text-color-white mb-3"
                onClick={handleLogin}
              >
                {t("Login")}
              </Button>
              <Button
                className="medium-btn text16 text-color-white mb-3 border border-primary-sub"
                onClick={handleRegister}
              >
                {t("Register")}
              </Button>
              <div className="mb-3"></div>
              <Button
                className="main text16 text-color-white mb-3"
                onClick={() => f7.loginScreen.close()}
              >
                {t("Back")}
              </Button>

              <BlockFooter className="text-color-white text-align-center">
                © 2025 label1landing {t("All Rights Reserved.")}
              </BlockFooter>
            </List>
          </div>
        </Page>{" "}
      </View>
    </LoginScreen>
  );
};

export default LoginModal;
