import React from "react";

export default function EdnexLogo({ size = 48, nameClass = "", taglineClass = "" }) {
  return (
    <>
      <div className="ednex-logo-icon">
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <polygon
            points="24,2 44,13 44,35 24,46 4,35 4,13"
            fill="#1a1a1a"
            stroke="#d10812"
            strokeWidth="1.5"
          />
          <polygon
            points="24,7 39,16 39,32 24,41 9,32 9,16"
            fill="none"
            stroke="rgba(209,8,18,0.3)"
            strokeWidth="0.8"
          />
          <text
            x="24"
            y="32"
            textAnchor="middle"
            fontFamily="Rubik, sans-serif"
            fontSize="20"
            fontWeight="700"
            fill="#d10812"
          >
            E
          </text>
        </svg>
      </div>
      <div className="ednex-logo-texts">
        <div className={`ednex-logo-name ${nameClass}`}>EDNEX</div>
        <div className={`ednex-logo-tagline ${taglineClass}`}>SDN. BHD.</div>
      </div>
    </>
  );
}
