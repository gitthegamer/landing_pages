import React, { useState } from "react";
import GlobalState from "../../atoms/GlobalState";
import { useRecoilValue } from "recoil";
import SkeletonLoading from "./skeleton-loading";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import LanguageState from "../../atoms/LanguageState";
import useCommon from "../action/Common";

const Banner = () => {
  const global = useRecoilValue(GlobalState);
  const { getImgUrl } = useCommon();
  const banner_lists = global.banners;
  const currentLanguage = useRecoilValue(LanguageState);

  return (
    <>
      {banner_lists.length > 0 ? (
        <Swiper
          className="banner w-100"
          modules={[Autoplay, Pagination]}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<div class="${className} bg-primary-sub mx-1"></div>`;
            },
          }}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={15}
        >
          {banner_lists.map((banner, index) => (
            <SwiperSlide key={index} className="p-2">
              <img
                className="w-100 h-100 "
                src={getImgUrl(banner.mobile_image[currentLanguage])}
                alt="Banner 1"
                style={{ objectFit: "cover" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div style={{ height: "180px" }}>
          <SkeletonLoading />
        </div>
      )}
    </>
  );
};

export default Banner;
