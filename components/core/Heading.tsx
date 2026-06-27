import React from "react";

const Heading = () => {
  return (
    <div className="flex mx-auto w-full max-w-5xl flex-col md:py-5 py-5">
      <h1
        className={`md:text-4xl text-3xl tracking-tight text-left text-primary/50`}
      >
        React Web Spritez
      </h1>
      <h3 className="md:text-sm text-xs text-primary/50 text-left">
        An interactive floating and pixel sprites for React websites
      </h3>
    </div>
  );
};

export default Heading;
