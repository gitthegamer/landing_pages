import { f7 } from "framework7-react";

export function useToast() {
  function show_toast(text, position = "center", closeTimeout = 2000) {
    f7.toast.show({
      text: text,
      position: position,
      closeTimeout: closeTimeout,
      cssClass: "wider-toast white-bg-toast",
    });
  }

  return { show_toast };
}
