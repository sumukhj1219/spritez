"use client";

import React from "react";
import { COLLECTION_CONFIG } from "./config";
import SpriteCard from "@/components/common/SpriteCard";
import { useSpriteStore } from "@/store/sprite-store";
import CopyButton from "@/components/common/CopyButton";

const AllCollection = () => {
  const { addSprite } = useSpriteStore();
  return (
    <div className="flex sm:px-18 mt-6 px-6 w-full ">
      <div className="grid md:grid-cols-12 grid-cols-4 gap-5">
        {COLLECTION_CONFIG.map((item, index) => {
          return (
            <div key={index} className="flex flex-col group items-center justify-center">
              <CopyButton />
              <SpriteCard
                label={item.label}
                imgSrc={item.imgSrc}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.stopPropagation();
                  addSprite(item);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllCollection;
