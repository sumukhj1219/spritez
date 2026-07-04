import React from "react";

const Duck = () => {
  return (
    <>
      <style>{`
        @keyframes duck-swim {
          from { background-position: 0px 0px; }
          to { background-position: -96px 0px; }
        }
        .animate-duck {
          animation: duck-swim 0.6s steps(3) infinite;
        }
      `}</style>

      <div
        className="animate-duck"
        style={{
          position: "absolute",
          left: "100px",
          top: "100px",
          width: "32px",
          height: "32px",
          backgroundImage: `url('/app/duck.png')`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
        }}
        aria-label="Swimming rubber duck"
      />
    </>
  );
};

export default Duck;
