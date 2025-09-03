import React, { useState } from "react";

const SkeletonLoading = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "8px",
      }}
      className="skeleton-block skeleton-effect-wave"
    ></div>
  );
};

export default SkeletonLoading;
