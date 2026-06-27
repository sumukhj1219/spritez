"use client";
import { useSpriteStore } from "@/store/sprite-store";
import React from "react";

const ActiveSprite = () => {
  const { sprites } = useSpriteStore();
  return (
    <div>
      {sprites.map((sprite, index) => (
        <div key={index}>
          <sprite.component />
        </div>
      ))}
    </div>
  );
};

export default ActiveSprite;
