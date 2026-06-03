import { Preloader } from "framework7-react";
import React, { useState } from "react";

const PreLoader = () => {
  return (
    <div className="w-100 h-100 d-flex-center flex-column">
      <img className="logo" src={"/assets/image/logo/logo.png"} />

      {/* <Preloader /> */}
    </div>
  );
};

export default PreLoader;
