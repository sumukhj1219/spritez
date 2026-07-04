"use client";

import React from "react";
import { COLLECTION_CONFIG } from "./config";
import SpriteCard from "@/components/common/SpriteCard";
import { useSpriteStore } from "@/store/sprite-store";

const AllCollection = () => {
  const { addSprite } = useSpriteStore();
  return (
    <div className="flex items-center justify-center mx-auto max-w-5xl w-full">
      <div className="grid md:grid-cols-5 grid-cols-5 gap-2 md:gap-5">
        {COLLECTION_CONFIG.map((item, index) => (
          <SpriteCard
            key={index}
            label={item.label}
            imgSrc={item.imgSrc}
            title={item.title}
            onClick={() => {
              addSprite(item);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AllCollection;
