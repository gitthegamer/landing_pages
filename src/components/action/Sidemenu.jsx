import { useState } from "react";
import CommonState from "../../atoms/CommonState";
import { useRecoilState } from "recoil";

function useSideMenu() {
  const [common, setCommon] = useRecoilState(CommonState);

  const { sidemenu_open } = common;

  const open_sidemenu = () => {
    setCommon((prevState) => ({
      ...prevState,
      sidemenu_open: true,
    }));
  };
  const close_sidemenu = () => {
    setCommon((prevState) => ({
      ...prevState,
      sidemenu_open: false,
    }));
  };

  return {
    sidemenu_open,
    open_sidemenu,
    close_sidemenu,
  };
}

export default useSideMenu;
