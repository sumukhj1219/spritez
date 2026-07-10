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
    </div>
  );
};

export default page;
