import React from "react";
import { Popup, Page, Navbar, Block } from "framework7-react";
import { useRecoilValue } from "recoil";
import { useTranslation } from "react-i18next";
import ConfirmMessageState from "./../../atoms/confirmMessageState";
import useConfirmMessage from "./../../actions/ConfirmMessage";

function ConfirmMessage() {
  const { t } = useTranslation();
  const modal = useRecoilValue(ConfirmMessageState);
  const { confirm, close } = useConfirmMessage();
  const modalBodyStyle = {};

  // Adding maxWidth to modal body to prevent text from overflowing
  const modalContentStyle = {
    maxWidth: "100%", // Adjust maxWidth as needed
    wordWrap: "break-word", // Wrap long words
    overflowWrap: "break-word", // Wrap long words
    color: "white", // Set text color to white
  };

  return (
    <Popup
      className="modalbackground"
      opened={modal.show}
      onPopupClosed={close}
      backdrop
    >
      <Page className="modal-content">
        <div className="container">
          <Navbar title={modal.title} />
          <Block style={{ ...modalBodyStyle, ...modalContentStyle }}>
            <div className="mb-4">
              <h3 className="logout-heading mb-3">{modal.title}</h3>
              {modal.is_image ? (
                <div
                  className="overflow-scroll mb-4"
                  style={{ height: "55vh" }}
                >
                  <img
                    src={modal.content}
                    alt={`4d payout`}
                    style={{ width: "100%" }}
                  />
                </div>
              ) : (
                <p
                  className="notification-full-text text-white text-start"
                  style={{
                    ...modalContentStyle,
                    maxHeight: "600px",
                    overflowY: "auto",
                  }}
                  dangerouslySetInnerHTML={{ __html: modal.content }}
                />
              )}
            </div>

            <div className="d-flex justify-content-end">
              <div
                className="d-flex align-items-center justify-content-center cancel-btn mb-2"
                style={{ marginRight: "10px" }}
                onClick={close}
              >
                {"Cancel"}
              </div>
              {modal.is_bet_now ? (
                <div
                  className="d-flex align-items-center justify-content-center flashing-btn mb-2 text16"
                  onClick={confirm}
                >
                  {"Bet Now"}
                </div> // This will render if modal.is_bet_now is true
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center confirm-btn mb-2 text16"
                  onClick={confirm}
                >
                  {"Confirm"}
                </div> // This will render if modal.is_bet_now is false
              )}
            </div>
          </Block>
        </div>
      </Page>{" "}
    </Popup>
  );
}

export default ConfirmMessage;
