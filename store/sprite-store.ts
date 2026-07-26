import { create } from "zustand";
import React from "react";



interface Sprite {
  component: React.ComponentType;
}

interface SpriteStore {
  sprites: Sprite[];
  addSprite: (sprite: Sprite) => void;
  removeSprite: (sprite: Sprite) => void;
  clearSprites: () => void;
}

export const useSpriteStore = create<SpriteStore>((set) => ({
  sprites: [],

  addSprite: (sprite) =>
    set((state) => {
      if (state.sprites.length > 0) {
        return { sprites: [sprite] };
      }
      return { sprites: [...state.sprites, sprite] };
    }),

  removeSprite: (sprite) =>
    set((state) => ({
      sprites: state.sprites.filter((s) => s !== sprite),
    })),

  clearSprites: () => set({ sprites: [] }),
}));
