import React from "react";

// Size of one checker square in px. The tile is 2×2 squares.
const SQUARE = 10;

const Pattern = () => {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="card-grid"
          width={SQUARE * 2}
          height={SQUARE * 2}
          patternUnits="userSpaceOnUse"
        >
          <rect width={SQUARE * 2} height={SQUARE * 2} fill="#fafafa" />
          <g fill="#110000" opacity="0.05">
            <rect width={SQUARE} height={SQUARE} />
            <rect x={SQUARE} y={SQUARE} width={SQUARE} height={SQUARE} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#card-grid)" />
    </svg>
  );
};

export default Pattern;
