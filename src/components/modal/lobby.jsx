import React, { useEffect, useState } from "react";
import { Navbar, f7, Popup } from "framework7-react";
import { useRecoilValue } from "recoil";
import useCommon from "../action/Common";
import usePopup from "../action/Popup";
import { useDialog } from "../action/Dialog";
import useAuthenticate from "../../actions/Authenticate";
import LobbyState from "../../atoms/LobbyState";

export default function LobbyPage() {
  const modal = useRecoilValue(LobbyState);
  const { close_popup_lobby } = usePopup();
  const { open_message } = useDialog();
  const { openInAppBrowser, getImgUrl } = useCommon();
  const { launch } = useAuthenticate();

  const [gamelist, setGameList] = useState(null);

  useEffect(() => {
    setGameList(modal?.lobby_data);
  }, [modal.show]);

  const gameClick = async (gamecode) => {
    f7.preloader.show();
    await launch({ code: gamelist.code, game: gamecode }).then((res) => {
      f7.preloader.hide();
      if (res.status) {
        openInAppBrowser(res.launcher.url);
      } else {
        open_message(res.message);
      }
    });
  };

  return (
    <Popup
      id="lobby"
      opened={modal.show}
      onPopupClosed={() => close_popup_lobby()}
      tabletFullscreen={true}
    >
      <Navbar
        title="Lobby"
        className="navbar-black"
        sliding={false}
        backLink="Back"
        onBackClick={() => {
          close_popup_lobby();
        }}
      />
      <div className=" bg-primary-sub3 d-flex justify-content-center">
        <div
          style={{
            height: "calc(100vh - 60px)",
            maxWidth: "1024px",
            alignContent: "start",
          }}
          className="grid grid-cols-3 medium-grid-cols-6  p-2 gap-2 overflow-auto"
        >
          {gamelist?.gameList.map((item, index) => (
            <div
              key={index}
              className="display-flex flex-direction-column"
              onClick={() => gameClick(item.code, item.status)}
            >
              <div className="game-status-banner position-absolute">
                {item.status == 4 && (
                  <img
                    src="https://label1landing-admin.com//images/status/maintance.png"
                    className="w-100 h-100"
                  />
                )}
                {item.status == 5 && (
                  <img
                    src="https://label1landing-admin.com//images/status/comingsoon.png"
                    className="w-100 h-100"
                  />
                )}
              </div>

              <img
                className="flex-1 animation_image "
                src={getImgUrl(item.image)}
                style={{
                  filter:
                    item.status == 4 || item.status == 5
                      ? "grayscale(90%)"
                      : "none",
                }}
              />
              <div
                style={{
                  height: "2.5rem",
                  lineHeight: "1.25",
                }}
                className="text-align-center text-color-white mb-2 text14"
              >
                {item.name.en}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Popup>
  );
}
