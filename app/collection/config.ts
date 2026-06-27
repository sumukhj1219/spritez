import Soldier from "./soldier/Soldier";
import NyanCat from "./nyan-cat/NyanCat";
import ClaudeMascot from "./claude-mascot/ClaudeMascot";

export type CollectionConfig = {
  label: string;
  sprite: React.FunctionComponent;
  imgSrc: string;
};

export const COLLECTION_CONFIG: CollectionConfig[] = [
  {
    label: "Soldier",
    sprite: Soldier,
    imgSrc: "/preview/soldier-preview.png",
  },
  {
    label: "Nyan Cat",
    sprite: NyanCat,
    imgSrc: "/preview/nyan-cat-preview.png",
  },
  {
    label: "Claude Mascot",
    sprite: ClaudeMascot,
    imgSrc: "/preview/claude-mascot-preview.png",
  },
];
