import React from "react";
import { useRecoilValue } from "recoil";
import GlobalState from "../../atoms/GlobalState";
import useCommon from "../action/Common";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const global = useRecoilValue(GlobalState);
  const { getImgUrl } = useCommon();
  const Payment = global?.settings?.Payment || [];
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];

  const imagePayment = Payment.filter((item) => {
    const extension = item.img.split(".").pop().toLowerCase();
    return imageExtensions.includes(`.${extension}`);
  }).map((item) => getImgUrl(item.img));

  const socialMedia = global?.settings?.Social || [];
  const imageSocial = socialMedia
    .filter((item) => {
      const extension = item.social_image.split(".").pop().toLowerCase();
      return imageExtensions.includes(`.${extension}`);
    })
    .map((item) => ({
      image: getImgUrl(item.social_image),
      link: item.social_link,
    }));

  return (
    <>
      <div className="footer px-md-3 px-4 gap-lg-5 gap-md-3 pe-4">
        <div className="col-md-4 col-12">
          <div className="text-color-white font-secondary fw-bold text16 text-md20 mb-0 mb-md-2">
            © 2025 label1landing. {t("All Rights Reserved.")}{" "}
            {t("Trusted Online Casino Malaysia")}
          </div>
          <div className="text-color-white font-secondary text12 text-md16 mb-2 mb-md-3">
            {t(
              "Trusted Online Casino Malaysia 2023 - label1landing Online Casino Malaysia has evolved drastically in the last few years. It has been drawing comparisons from the Western countries. label1landing, an online casino Malaysia has become the most trusted online gambling platform for bettors. We have emerged as a top choice of casino games for all Malaysians. We offer a wide range of games as much as you can expect from any top operator in the country."
            )}
          </div>
          <div className="text-color-white font-secondary text12 text-md16 mb-2 mb-md-3">
            {t(
              "At our online casino in Malaysia, you can play live poker games in mobile, online roulette, and live casino games. These are easy to play,and you can also check out our best online sport betting and e-sports betting at our site with the most competitive odds to consider. If you crave for slot games, don’t worry, we have it too for you. Ixn short, label1landing, is compatible with mobile and desktop versions whether its an iOS or Android OS mobile device."
            )}
          </div>
        </div>

        <div className="col-md-4 col-12 px-0 px-lg-2 px-md-3">
          {/* footer img */}
          <div className="d-flex flex-wrap row-gap-2">
            {Array.from({ length: "5" }).map((item, index) => (
              <img
                key={index}
                style={{ objectFit: "contain" }}
                className="icon16 icon-md24 w-auto me-3"
                src={`/assets/image/footer/footer_${index + 1}.webp`}
              />
            ))}
          </div>
          {/* Certificated */}
          <div className="text-color-white text16 mt-3 mb-1">
            {t("Certificated")}
          </div>
          <div className="d-flex flex-wrap row-gap-2">
            {Array.from({ length: "4" }).map((item, index) => (
              <img
                key={index}
                style={{ objectFit: "contain" }}
                className="icon16 icon-md24 w-auto me-3"
                src={`/assets/image/footer/certificated_${index + 1}.webp`}
              />
            ))}
          </div>
          {/* Responsible Gaming */}
          <div className="text-color-white text16 mt-3 mb-1">
            {t("Responsible Gaming")}
          </div>
          <div className="d-flex flex-wrap row-gap-2">
            {Array.from({ length: "3" }).map((item, index) => (
              <img
                key={index}
                style={{ objectFit: "contain" }}
                className="icon16 icon-md24 w-auto me-3"
                src={`/assets/image/footer/responsible_${index + 1}.webp`}
              />
            ))}
          </div>
        </div>

        <div className="col-md-4 col-12 px-0 px-lg-2 px-md-3">
          {/* Payment Method */}
          <div className="text-color-white text16 mt-3 mb-1">
            {t("Payment Method")}
          </div>
          <div className="d-flex flex-wrap row-gap-2">
            {imagePayment.map((item, index) => (
              <img
                key={index}
                style={{ objectFit: "contain" }}
                className="icon16 icon-md24 w-auto me-3"
                src={item}
              />
            ))}
          </div>

          {/* Suggest Browser */}
          <div className="text-color-white text16 mt-3 mb-1">
            {t("Suggest Browser")}
          </div>
          <div className="d-flex flex-wrap row-gap-2">
            {Array.from({ length: "3" }).map((item, index) => (
              <img
                key={index}
                style={{ objectFit: "contain" }}
                className="icon16 icon-md32 w-auto me-3"
                src={`/assets/image/footer/browser_${index + 1}.webp`}
              />
            ))}
          </div>

          {/* Security */}
          <div className="text-color-white text16 mt-3 mb-1">
            {t("Security")}
          </div>
          <div className="d-flex flex-wrap row-gap-2">
            {Array.from({ length: "2" }).map((item, index) => (
              <img
                key={index}
                style={{ objectFit: "contain" }}
                className="icon20 icon-md24 w-auto me-3"
                src={`/assets/image/footer/security_${index + 1}.webp`}
              />
            ))}
          </div>
          <div className="iconh60" />
        </div>
      </div>
    </>
  );
};

export default Footer;
