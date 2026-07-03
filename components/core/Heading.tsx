import React from "react";
import Image from "next/image";

const Heading = () => {
  return (
    <div className="flex  mx-auto w-full max-w-5xl flex-col md:py-5 py-5">
      <div className="flex gap-x-2">
        <Image src="/app/logo.svg" alt="applogo" width={32} height={32} />
        <h1
          className={`md:text-4xl text-3xl tracking-tight text-left text-primary`}
        >
          ReactWebSpritez
        </h1>
      </div>
      <h3 className="md:text-sm text-xs text-left text-primary">
        An interactive floating and pixel sprites for React websites
      </h3>
      <div className="text-xs p-1 text-left rounded-sm bg-secondary ring ring-white my-5 w-full flex items-center justify-center mx-auto border ">
        npm install react-web-spritez
      </div>
    </div>
  );
};

export default Heading;
