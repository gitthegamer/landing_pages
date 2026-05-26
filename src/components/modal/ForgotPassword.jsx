import React, { useState, useEffect } from "react";
import { Block, f7, Input, List, ListInput, ListItem } from "framework7-react";
import { useDialog } from "../action/Dialog";
import { useTranslation } from "react-i18next";
import { useToast } from "../action/Toast";

function ForgotPassword({ onSubmit, forgot_password }) {
  const { t } = useTranslation();
  const { open_message } = useDialog();
  const { show_toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const fields = [
    { label: "Username", name: "username" },
    { label: "Phone", name: "phone" },
  ];

  const [form, setForm] = useState({
    phone: "",
  });

  const handleForgotPassword = async () => {
    f7.preloader.show();
    setIsVerifying(true);
    setCountdown(60);
    const res = await forgot_password(form);
    f7.preloader.hide();
    open_message(res.message);

    setIsVerifying(false);
  };

  useEffect(() => {
    if (onSubmit) {
      onSubmit(handleForgotPassword);
    }
  }, [onSubmit, form]);

  const [currentCountryCode, setCurrentCountryCode] = useState("+60");

  return (
    <Block className="no-padding text-color-white">
      <div className="display-flex justify-content-center align-items-center mb-3">
        <img
          src={"/assets/image/logo/logo.png"}
          className="logo margin-bottom-16"
        />
      </div>
      <List className="my-0">
        <ListInput
          type="tel"
          name="phone"
          placeholder={t("Enter your phone number")}
          value={form.phone}
          inputStyle={{ paddingLeft: "60px", backgroundColor: "transparent" }}
          className="no-input-line text16"
          onInput={(e) => setForm({ ...form, phone: e.target.value })}
        ></ListInput>

        <ListItem
          className={`phone-dropdown position-absolute top-50 translate-middle-y selector mt-0 ps-2 ${
            currentCountryCode !== "" ? "selector-active" : ""
          }`}
          title={"Code"}
          smartSelect
          smartSelectParams={{ openIn: "popover" }}
        >
          <select
            value={currentCountryCode}
            name="selector-sheet"
            onChange={(e) => setCurrentCountryCode(e.target.value)}
          >
            <option value={"+60"}>+60</option>
          </select>
        </ListItem>
      </List>
    </Block>
  );
}

export default ForgotPassword;
