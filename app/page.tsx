import React from "react";
import AllCollection from "./collection/AllCollection";
import ActiveSprite from "@/components/common/ActiveSprite";

const page = () => {
  return (
    <div className="w-full h-full relative">
      <div className="max-w-7xl w-full flex items-center justify-center mx-auto">
        <AllCollection />
      </div>
      <ActiveSprite />
    </div>
  );
};

export default page;
