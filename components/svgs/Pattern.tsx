import React from "react";

interface PatternProps {
  className?: string;
}

const Pattern = ({ className }: PatternProps) => {
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <pattern
          id="card-grid"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <rect width="48" height="48" fill="#fafafa" />
          <g opacity="0.05">
            <rect width="11" height="11" fill="#1C1F21"></rect>
            <rect y="24" width="11" height="11" fill="#1C1F21"></rect>
            <rect x="12" y="12" width="11" height="11" fill="#1C1F21"></rect>
            <rect x="12" y="36" width="11" height="11" fill="#1C1F21"></rect>
            <rect x="24" width="11" height="11" fill="#1C1F21"></rect>
            <rect x="24" y="24" width="11" height="11" fill="#1C1F21"></rect>
            <rect x="36" y="12" width="11" height="11" fill="#1C1F21"></rect>
            <rect x="36" y="36" width="11" height="11" fill="#1C1F21"></rect>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#card-grid)" />
    </svg>
  );
};

export default Pattern;
