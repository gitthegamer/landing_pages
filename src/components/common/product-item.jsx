import { Button } from "framework7-react";
import useCommon from "../action/Common";

const ProductItem = ({ item, handleClick, index }) => {
  const { getImgUrl } = useCommon();

  const statusItem = [
    { index: 1, status: "active" },
    {
      index: 2,
      status: "new",
      icon: "https://label1landing-admin.com//images/status/new.png",
    },
    {
      index: 3,
      status: "hot",
      icon: "https://label1landing-admin.com//images/status/hot.png",
    },
    {
      index: 4,
      status: "maintenance",
      icon: "https://label1landing-admin.com//images/status/maintance.png",
    },
    {
      index: 5,
      status: "coming soon",
      icon: "https://label1landing-admin.com//images/status/comingsoon.png",
    },
    { index: 7, status: "hidden" },
  ];
  return (
    <>
      {item.status !== 7 && (
        <div className="product-wrapper d-flex-column pointer">
          <div className="product-item position-relative rounded-1 w-100 h-100">
            <div className="frame position-relative overflow-hidden rounded-3 opacity-0">
              <div
                onClick={() => handleClick(item.code, item.status)}
                className={`product-img text-color-white`}
              >
                {/* backdrop */}
                {(item.status === 4 || item.status === 5) && (
                  <div
                    className="position-absolute w-100 h-100 rounded-3"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                  />
                )}
                {/* img top right */}
                {statusItem.map((status) => {
                  if (item.status === status.index && status.icon) {
                    return (
                      <img
                        key={status.index}
                        src={status.icon}
                        className="position-absolute w-100 h-100 rounded-3"
                      />
                    );
                  }
                  return null;
                })}
                <img
                  src={getImgUrl(item?.new_image || item?.image)}
                  className="product-img w-100 rounded-3"
                  style={{
                    objectFit: "cover",
                  }}
                  onLoad={(e) => {
                    e.target.closest(".frame").classList.remove("opacity-0");
                  }}
                  onError={(e) => {
                    e.target.closest(".frame").classList.add("opacity-0");
                  }}
                />
                <div className="title-background position-absolute bottom-0 start-0 rounded-bottom-1 w-100 p-2 text-align-center">
                  <div className="title position-absolute start-50 translate-middle text14 text-md18 fw-medium lh-sm w-100">
                    {/* {item.name} */}

                    <img
                      style={{
                        width: "100%",
                        objectFit: "contain",
                      }}
                      className="game-logo-icon col-10"
                      src={getImgUrl(item?.logo) || "error"}
                      onError={(e) => {
                        e.target
                          .closest(".game-logo-icon")
                          .classList.add("opacity-0");
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductItem;
