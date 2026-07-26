"use client";

import React, { useState } from "react";
import { COLLECTION_CONFIG, CollectionConfig } from "./config";
import SpriteCard from "@/components/common/SpriteCard";
import { useSpriteStore } from "@/store/sprite-store";
import SpriteDetailSheet from "@/components/common/SpriteDetailSheet";

const AllCollection = () => {
  const { addSprite } = useSpriteStore();
  const [selectedSprite, setSelectedSprite] = useState<CollectionConfig | null>(
    null,
  );
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <div className="w-full px-4 sm:px-8 md:px-12 lg:px-18 mt-6">
      {/* Responsive Grid System */}
      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 sm:gap-4 lg:gap-5">
        {COLLECTION_CONFIG.map((item, index) => {
          return (
            <div
              key={index}
              className="group relative flex flex-col items-center justify-center w-full"
            >
              <SpriteCard
                label={item.label}
                imgSrc={item.imgSrc}
                title={item.label}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.stopPropagation();
                  addSprite(item);
                  setSelectedSprite(item);
                  setDetailOpen(true);
                }}
              />
            </div>
          );
        })}
      </div>

      <SpriteDetailSheet
        open={detailOpen}
        onOpenChange={setDetailOpen}
        sprite={selectedSprite}
      />
    </div>
  );
};

export default AllCollection;
