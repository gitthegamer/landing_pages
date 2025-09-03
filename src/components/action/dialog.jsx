import { f7 } from "framework7-react";
import React from "react";
import { createRoot } from "react-dom/client";
import navigate from "./navigate";
import { useTranslation } from "react-i18next";
import { RecoilRoot } from "recoil";

export function useDialog() {
  const { t } = useTranslation();
  function open_message(content, navigate = null, title = "") {
    if (navigate) {
      f7.dialog.confirm(content, title, () => {
        navigate(navigate);
      });
    } else {
      f7.dialog.alert(content, title);
    }
  }

  function open_notification(title, htmlContent) {
    const dialog = f7.dialog.create({
      title: title,
      content: htmlContent,
      buttons: [
        {
          text: t("Close"),
          onClick: function () {
            dialog.close();
          },
        },
      ],
      /* cssClass: "custom-dialog",  */
    });

    dialog.open();
  }

  function open_confirm_message(
    title,
    content,
    {
      closeWhenConfirm = true,
      closeWhenCancel = true,
      closeByBackdropClick = false,
      hideCancelButton = false,
      hideConfirmButton = false,
      cssClass = "",
      confirmName = "Confirm",
      cancelName = "Cancel",
      onClose = () => { },
      onOpen = () => { },
    } = {}
  ) {
    return new Promise((resolve, reject) => {
      const dialog = f7.dialog.create({
        title: title,
        content: content,
        buttons: [
          !hideCancelButton && {
            text: t(cancelName),
            onClick: () => {
              resolve(false); // Return false
            },
            close: closeWhenCancel,
          },
          !hideConfirmButton && {
            text: t(confirmName),
            onClick: () => {
              resolve(true); // Return true
            },
            close: closeWhenConfirm,
          },
        ].filter(Boolean), // Filter out hidden buttons
        /* cssClass: "custom-confirm-dialog",  */
      });

      dialog.open();
    });
  }

  function open_dialog_component(
    title,
    ContentComponent,
    modalProps,
    {
      closeWhenConfirm = true,
      closeWhenCancel = true,
      closeByBackdropClick = false,
      hideBackdrop = true,
      hideCancelButton = false,
      hideConfirmButton = false,
      cssClass = "",
      confirmName = "Confirm",
      cancelName = "Cancel",
      onClose = () => { },
      onOpen = () => { },
    } = {}
  ) {
    return new Promise((resolve) => {
      const existingContent = document.getElementById("dialog-custom-content");
      if (existingContent) {
        existingContent.remove();
      }

      const tempDiv = document.createElement("div");
      tempDiv.id = "dialog-custom-content";

      const dialog = f7.dialog
        .create({
          title: title,
          content: tempDiv.outerHTML,
          cssClass: cssClass,
          backdrop: hideBackdrop,
          closeByBackdropClick: closeByBackdropClick,
          buttons: [
            !hideCancelButton && {
              text: t(cancelName),
              onClick: () => {
                resolve(false);
              },
              close: closeWhenCancel,
            },
            !hideConfirmButton && {
              text: t(confirmName),
              onClick: () => {
                resolve(true);
              },
              close: closeWhenConfirm,
            },
          ].filter(Boolean),
        })
        .on("open", () => {
          const container = document.getElementById("dialog-custom-content");
          if (container) {
            const root = createRoot(container);
            root.render(
              <RecoilRoot>
                <ContentComponent
                  {...modalProps}
                  onClose={() => dialog.close()}
                />
              </RecoilRoot>
            );
          }
          onOpen();
        })
        .on("close", () => {
          onClose();
        });

      dialog.open();
    });
  }

  return {
    open_notification,
    open_confirm_message,
    open_message,
    open_dialog_component,
  };
}
