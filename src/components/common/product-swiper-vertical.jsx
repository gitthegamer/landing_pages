import { Block, f7 } from "framework7-react";
import ProductItem from "./product-item";
import { useEffect, useState } from "react";
import LottoResults from "./../lotto/lottoeresult";
import { useTokenAndUser } from "../action/user-data";
import useAuthenticate from "../../actions/Authenticate";
import useCommon from "../action/Common";
import { useDialog } from "../action/Dialognew";
import { useRecoilValue } from "recoil";
import GlobalState from "../../atoms/GlobalState";
import { useTranslation } from "react-i18next";
import usePopup from "../action/Popup";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import DialogApp from "../modal/dialog-app";

const ProductSwiperVertical = () => {
  const { t } = useTranslation();
  const global = useRecoilValue(GlobalState);
  const gameList = global.category;
  const [categoryGameItemList, setCategoryGameItemList] = useState([]);
  const [activeTab, setActiveTab] = useState("hot_products");
  const { token, checkTokenChange, user } = useTokenAndUser();
  const { launch } = useAuthenticate();
  const { product_status, member_status, openInAppBrowser } = useCommon();
  const { open_message, open_dialog_component } = useDialog();
  const { open_popup_lobby } = usePopup();
  const categoryList = [
    {
      categoryIndex: "hot_products",
      name: "Popular",
      icon: "/assets/image/gameList/popular.webp",
      products: [],
    },
    {
      categoryIndex: 9,
      name: "Event",
      icon: "/assets/image/gameList/event.webp",
      products: [],
    },

    {
      categoryIndex: 3,
      name: "Slots",
      icon: "/assets/image/gameList/slot.webp",
      products: [],
    },

    {
      categoryIndex: 1,
      name: "Casino",
      icon: "/assets/image/gameList/casino.webp",
      products: [],
    },
    {
      categoryIndex: 14,
      name: "Fast Game",
      icon: "/assets/image/gameList/fast.webp",
      products: [],
    },
    {
      categoryIndex: 2,
      name: "Sports",
      icon: "/assets/image/gameList/sport.webp",
      products: [],
    },
    {
      categoryIndex: 4,
      name: "Lottery",
      icon: "/assets/image/gameList/lottery.webp",
      products: [],
    },

    // {
    //   categoryIndex: 5,
    //   name: "App",
    //   icon: "/assets/image/gameList/app.webp",
    //   products: [],
    // },
    // {
    //   name: "E-Game",
    //   icon: "/assets/image/gameList/e_sport.webp",
    //   categoryIndex: 8,
    //   products: [],
    // },
  ];

  useEffect(() => {
    if (gameList) {
      const updatedCategoryGameItemList = categoryList.map((listItem) => {
        if (listItem.categoryIndex === "hot_products") {
          const matchingItem = global.hot_products;
          return { ...listItem, products: matchingItem };
        } else {
          const matchingItem =
            global.category.find(
              (category) => category.category === listItem.categoryIndex
            )?.products || [];
          return { ...listItem, products: matchingItem };
        }
      });

      setCategoryGameItemList(updatedCategoryGameItemList);
    }
  }, [gameList]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentUrl = new URL(window.location.href);
    const promotion_event = urlParams.get("promotion_event");
    const targetElement = document.getElementById(
      "product-swiper-vertical-wrapper"
    );
    if (promotion_event) {
      if (targetElement) {
        scrollToElement("product-swiper-vertical-wrapper");
      }

      setActiveTab(9);
      currentUrl.searchParams.delete("promotion_event");
    }
  }, [location.pathname]);

  const gameClick = async (code, status) => {
    if (!user) return open_message(t("Please login to continue!"));

    if (
      user.status != member_status("Testing") &&
      (status == product_status("Maintenance") ||
        status == product_status("Comming Soon"))
    ) {
      open_message(t("This game is under maintenance or coming soon!"));
      return;
    }
    f7.preloader.show();
    await launch({ code: code }).then((res) => {
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
          open_popup_lobby(dataToSend);
        } else if (res.type === "deeplink" && code === "LK") {
          openInAppBrowser(res.launcher.url);
        }
      } else {
        open_message(res.message);
      }
    });
  };

  const handleActiveTabChange = (index) => {
    setActiveTab(index);
  };

  const scrollToElement = (targetId) => {
    const container = document.querySelector(".page-content");

    const targetElement = document.getElementById(targetId);

    if (container && targetElement) {
      container.scrollTo({
        top: targetElement.offsetTop - container.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="game-tab d-flex align-items-center position-relative mb-3 px-12">
        <img
          className="custom-navigation-prev"
          style={{ rotate: "180deg" }}
          src="/assets/image/others/right.png"
        />
        <Swiper
          slidesPerView={3.4}
          spaceBetween={8}
          modules={[Navigation, FreeMode]}
          freeMode={true}
          navigation={{
            enabled: true,
            prevEl: ".custom-navigation-prev",
            nextEl: ".custom-navigation-next",
          }}
          className="game-nav px-2 overflow-auto"
          breakpoints={{
            496: {
              slidesPerView: 3.5,
              spaceBetween: 8,
            },

            768: {
              slidesPerView: 4,
              spaceBetween: 12,
            },
          }}
        >
          {categoryList.map((item, index) => (
            <SwiperSlide key={index} className="minw-fit">
              <div
                onClick={() => handleActiveTabChange(item.categoryIndex)}
                className={`small-btn pointer text12 text-md16 d-flex-center text-nowrap lh-1 rounded-2 px-1 py-md-2 m-0 w-100 minw-fit ${
                  activeTab !== item.categoryIndex
                    ? "btn-primary border-primary-sub border"
                    : "btn-disable text-color-white border"
                }`}
              >
                <img
                  src={item.icon}
                  onError={(e) => e.target.classList.add("opacity-0")}
                  className="gameImg me-2"
                />
                <div
                  style={{ textTransform: "capitalize" }}
                  className="text-align-center"
                >
                  {t(item.name)}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <img
          className="custom-navigation-next"
          src="/assets/image/others/right.png"
        />
      </div>
      {activeTab !== 4 ? (
        <>
          <div
            id="product-swiper-vertical-wrapper"
            className="product-swiper-vertical-wrapper h-auto px-2 mb-md-4 mb-3"
          >
            <div className="h-auto">
              <div className="game-wrapper gap-3 gap-md-4" style={{}}>
                {categoryGameItemList
                  .find((item) => item.categoryIndex === activeTab)
                  ?.products.map((item, index) => (
                    <ProductItem
                      index={index}
                      key={index}
                      item={item}
                      handleClick={gameClick}
                    />
                  ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <LottoResults />
      )}
    </>
  );
};

export default ProductSwiperVertical;
