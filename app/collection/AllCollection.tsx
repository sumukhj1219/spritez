"use client";

import React from "react";
import { COLLECTION_CONFIG } from "./config";
import SpriteCard from "@/components/common/SpriteCard";
import { useSpriteStore } from "@/store/sprite-store";

const AllCollection = () => {
  const { addSprite } = useSpriteStore();
  return (
    <div className="flex sm:px-18 mt-6 px-6 w-full">
      <div className="grid md:grid-cols-5 grid-cols-12 gap-2 md:gap-5">
        {COLLECTION_CONFIG.map((item, index) => (
          <SpriteCard
            key={index}
            label={item.label}
            imgSrc={item.imgSrc}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              addSprite(item);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AllCollection;
