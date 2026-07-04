import React from "react";
import AllCollection from "./collection/AllCollection";
import ActiveSprite from "@/components/common/ActiveSprite";
import Heading from "@/components/core/Heading";

const page = () => {
  return (
    <div className="max-w-5xl relative flex flex-col items-center justify-center mx-auto md:p-1 md:gap-y-1 gap-y-2 p-2 overflow-hidden">
      <Heading />
      <AllCollection />
      <ActiveSprite />
    </div>
  );
};

export default page;
