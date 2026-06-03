import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRecoilValue } from "recoil";
import GlobalState from "../../atoms/GlobalState";
import { useEffect, useState } from "react";
import useAuthenticate from "../../actions/Authenticate";
import useCommon from "../action/Common";
import { useDialog } from "../action/Dialognew";
import { f7 } from "framework7-react";
import usePopup from "../action/Popup";
import { useTranslation } from "react-i18next";
import DialogApp from "../modal/dialog-app";
import LanguageState from "../../atoms/LanguageState";

const HorizontalSwiper = () => {
  const { t } = useTranslation();
  const currentLanguage = useRecoilValue(LanguageState);
  const global = useRecoilValue(GlobalState);
  const { launch_game } = useAuthenticate();
  const { openInAppBrowser } =
    useCommon();
  const { open_message, open_dialog_component } = useDialog();

  const { open_popup_lobby } = usePopup();
  /* load global product detail */
  const hot_games = global.hot_games;

  const [categoryGameItemList, setCategoryGameItemList] = useState([
    {
      product_code: "JILI",
      game_code: "JILI-SLOT-023",
      game_name: "Golder Bank",
      name: "",
    },
    {
      product_code: "JILI",
      game_code: "JILI-SLOT-042",
      game_name: "Golden Empire",
    },
    {
      product_code: "JILI",
      game_code: "JILI-SLOT-096",
      game_name: "Fortune Gems 3",
    },
    {
      product_code: "JILI",
      game_code: "JILI-SLOT-102",
      game_name: "Super Ace Deluxe",
    },
    {
      product_code: "PP",
      game_code: "PP-SLOT-189",
      game_name: "Starlight Princess",
    },
    {
      product_code: "SPADE",
      game_code: "SG-SLOT-139",
      game_name: "Clash of the Giants",
    },
  ]);

  useEffect(() => {
    // setCategoryGameItemList(global.hot_games);
  }, [global]);

  /* ============================================================================ */
  const gameClick = async (product_code, game_code) => {
    f7.preloader.show();
    await launch_game({ game: game_code, code: product_code }).then((res) => {
      f7.preloader.hide();
      if (res.status) {
        if (res.type === "redirect") {
          /*  window.open(res.launcher.url, "_blank"); */
          openInAppBrowser(res.launcher.url);
        } else if (res.type === "app") {
          open_dialog_component("", DialogApp, {
            account: res.launcher.member_account.username,
            password: res.launcher.member_account.password,
            balance: res.launcher.balance,
            ios_url: res.launcher.ios_url,
            android_url: res.launcher.android_url,
            onDownloadApp: (url) => openInAppBrowser(url),
          });
        } else if (res.type === "lobby") {
          const dataToSend = {
            gameList: res.launcher.gamelist,
            code: code,
          };
          //TODO:Add Labby Page to show this

          open_popup_lobby(dataToSend);
        } else if (res.type === "deeplink" && code === "LK") {
          openInAppBrowser(res.launcher.url);
        }
      } else {
        open_message(res.message);
      }
    });
  };

  return (
    <>
      {categoryGameItemList?.length > 0 && (
        <div className="horizontal-swiper-wrapper text16 text-md20 fw-bold text-align-center mb-md-4 mb-3">
          <div className="d-flex align-items-center justify-content-center mb-1">
            <div>
              <img
                src="/assets/image/icon/hot.webp"
                alt="hot"
                className="icon24 icon-md32 me-2 rounded-3"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="title text-primary-sub">{t("Hot Game")}</div>
          </div>
          <div className="horizontal-line"></div>
          <div className="px-2">
            <Swiper
              slidesPerView={3}
              spaceBetween={10} // Set the space between slides in pixels
              modules={[Autoplay]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              allowTouchMove={true}
              loop={true}
              breakpoints={
                // Responsive breakpoints
                {
                  825: { spaceBetween: 20, slidesPerView: 5 },
                  425: { spaceBetween: 10, slidesPerView: 4 },
                }
              }
            >
              {categoryGameItemList?.map((hotgame, index) => (
                <SwiperSlide key={index}>
                  <div
                    onClick={() =>
                      gameClick(hotgame.product_code, hotgame.game_code)
                    }
                  >
                    <img
                      src={`/assets/image/hot_game/${hotgame?.product_code}/${
                        hotgame?.game_code
                      }/${currentLanguage === "cn" ? "cn" : "en"}.webp`}
                      // src={getImgUrl(hotgame.game_image)}
                      alt={hotgame.game_name}
                      className="hot-game-item d-block w-100 rounded-1"
                    />
                    <div className="text10 text-md16 text-color-white">
                      {hotgame.game_name}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default HorizontalSwiper;
