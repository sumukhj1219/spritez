"use client";

import React, { useState } from "react";
import { COLLECTION_CONFIG, CollectionConfig } from "./config";
import SpriteCard from "@/components/common/SpriteCard";
import { useSpriteStore } from "@/store/sprite-store";
import dynamic from "next/dynamic";
import { m, type Variants } from "framer-motion";

// The sheet pulls in framer-motion and the code highlighter, so it's only
// fetched once the pointer (or focus) reaches the grid, before the first click.
const loadSheet = () => import("@/components/common/SpriteDetailSheet");
const SpriteDetailSheet = dynamic(loadSheet, { ssr: false });

const preloadSheet = () => {
  loadSheet();
  import("@/components/common/CodeBlock").then((m) => m.preloadHighlighter());
};

// Cards rise in one after another, starting just after the heading settles.
const gridVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.25, staggerChildren: 0.03 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const AllCollection = () => {
  const { addSprite } = useSpriteStore();
  const [selectedSprite, setSelectedSprite] = useState<CollectionConfig | null>(
    null,
  );
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <div className="w-full px-4 sm:px-8 md:px-12 lg:px-18 mt-6">
      {/* Responsive Grid System */}
      <m.div
        variants={gridVariants}
        initial="hidden"
        animate="show"
        onPointerEnter={preloadSheet}
        onFocus={preloadSheet}
        className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 sm:gap-4 lg:gap-5"
      >
        {COLLECTION_CONFIG.map((item, index) => {
          return (
            <m.div
              key={index}
              variants={cardVariants}
              className="group relative flex flex-col items-center justify-center w-full"
            >
              <SpriteCard
                label={item.label}
                imgSrc={item.imgSrc}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.stopPropagation();
                  addSprite(item);
                  setSelectedSprite(item);
                  setDetailOpen(true);
                }}
              />
            </m.div>
          );
        })}
      </m.div>

      <SpriteDetailSheet
        open={detailOpen}
        onOpenChange={setDetailOpen}
        sprite={selectedSprite}
        onSpriteChange={(next) => {
          addSprite(next);
          setSelectedSprite(next);
        }}
      />
    </div>
  );
};

export default AllCollection;
