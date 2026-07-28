import React from "react";
import AllCollection from "./collection/AllCollection";
import ActiveSprite from "@/components/common/ActiveSprite";
import Heading from "@/components/core/Heading";

const page = () => {
  return (
    <div className=" w-full relative flex flex-col  overflow-hidden">
      <Heading />
      <AllCollection />
      <ActiveSprite />
      <div className="flex items-center justify-center mx-auto py-16 italic opacity-50">
        Stay tuned still plenty on deck
      </div>
    </div>
  );
};

export default page;
