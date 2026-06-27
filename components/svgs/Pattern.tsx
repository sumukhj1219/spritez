import React from "react";

const Pattern = () => {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="card-grid"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <rect width="48" height="48" fill="#fafafa" opacity="1" />
          <g opacity="0.05">
            {" "}
            <rect width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect y="12" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect y="24" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect y="36" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="6" y="6" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="6" y="18" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="6" y="30" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="6" y="42" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="12" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="12" y="12" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="12" y="24" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="12" y="36" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="18" y="6" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="18" y="18" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="18" y="30" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="18" y="42" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="24" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="24" y="12" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="24" y="24" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="24" y="36" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="30" y="6" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="30" y="18" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="30" y="30" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="30" y="42" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="36" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="36" y="12" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="36" y="24" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="36" y="36" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="42" y="6" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="42" y="18" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="42" y="30" width="5" height="5" fill="#1C1F21"></rect>{" "}
            <rect x="42" y="42" width="5" height="5" fill="#1C1F21"></rect>{" "}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#card-grid)" />
    </svg>
  );
};

export default Pattern;
