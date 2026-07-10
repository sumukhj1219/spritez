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
          <g opacity="0.15">
            {" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24 23H23V24H24V23Z"
              fill="#1C1F21"
            ></path>{" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24 47H23V48H24V47Z"
              fill="#1C1F21"
            ></path>{" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M47 23H48V24H47V23Z"
              fill="#1C1F21"
            ></path>{" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M48 47H47V48H48V47Z"
              fill="#1C1F21"
            ></path>{" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 11H11V12H12V11Z"
              fill="#1C1F21"
            ></path>{" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 35H11V36H12V35Z"
              fill="#1C1F21"
            ></path>{" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M35 11H36V12H35V11Z"
              fill="#1C1F21"
            ></path>{" "}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M36 35H35V36H36V35Z"
              fill="#1C1F21"
            ></path>{" "}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#card-grid)" />
    </svg>
  );
};

export default Pattern;
