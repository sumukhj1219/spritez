import React from "react";
import { COLLECTION_CONFIG } from "./config";
import SpriteCard from "@/components/common/SpriteCard";

const AllCollection = () => {
  return (
    <div className="flex items-center justify-center mx-auto max-w-7xl w-full min-h-screen">
      <div className="grid md:grid-cols-7 grid-cols-4 gap-3">
        {COLLECTION_CONFIG.map((item, index) => (
          <SpriteCard key={index} label={item.label} imgSrc={item.imgSrc} />
        ))}
      </div>
    </div>
  );
};

export default AllCollection;
