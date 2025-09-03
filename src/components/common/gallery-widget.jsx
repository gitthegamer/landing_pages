import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import YouTube from "react-youtube";

import { useRecoilValue } from "recoil";
import GlobalState from "../../atoms/GlobalState";

export default function GalleryWidget() {
  const [currentImages, setCurrentImages] = useState(0);
  const global = useRecoilValue(GlobalState);
  const videoList = global.settings.Video;

  const selectImage = (index) => {
    setCurrentImages(index);
  };

  useEffect(() => {});
  return (
    <div className="gallery-wrapper mb-1">
      {videoList && videoList.length > 0 && (
        <div>
          <YouTube
            className="youtube-size"
            videoId={getYoutubeVideoId(videoList[currentImages].url)}
            containerClassName="video-container w-100 mx-2 rounded-3"
            opts={{
              playerVars: { autoplay: 1, controls: 1, mute: 1 },
              width: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )}
      <div className="mb-2 p-2">
        <Swiper
          slidesPerView={2.2}
          spaceBetween={10}
          grabCursor={true}
          // modules={[Autoplay]}
          // autoplay={{ delay: 2000, disableOnInteraction: true }}
          allowTouchMove={true}
          loop={videoList.length > 3}
          breakpoints={{
            768: {
              spaceBetween: 20,
              slidesPerView: 3.7,
            },
          }}
        >
          {videoList &&
            videoList.map((imgPair, index) => {
              const currentresolution = "maxresdefault";
              const imgUrl = `https://img.youtube.com/vi/${getYoutubeVideoId(
                imgPair.url
              )}/${currentresolution}.jpg`;
              return (
                <SwiperSlide key={index} onClick={() => selectImage(index)}>
                  <div className="video-container w-100 rounded-3">
                    <img
                      style={{ aspectRatio: "16/9" }}
                      src={imgUrl}
                      onLoad={(event) => {}}
                      className={
                        currentImages === index
                          ? "shadow"
                          : "grey-filter shadow "
                      }
                    />

                    <div className="video-content d-flex-column overflow-hidden p-2">
                      <div className="title text-md18 px-2 textline-xs-2 lh-sm mb-2">
                        {videoList[index].title}
                      </div>
                      <div id="content-box" className="flex-1 overflow-hidden">
                        <div
                          id="content"
                          className="subtitle lh-1 text-color-white text10 text-md14 px-2"
                        >
                          {videoList[index].subtitle}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}

// Function to extract video ID from YouTube link
function getYoutubeVideoId(urlOrId) {
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
    return urlOrId;
  }
  if (!url) return null;

  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = urlOrId.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}
