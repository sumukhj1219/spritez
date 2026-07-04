import Soldier from "./soldier/Soldier";
import NyanCat from "./nyan-cat/NyanCat";
import ClaudeMascot from "./claude-mascot/ClaudeMascot";
import GolangGopher from "./golang-gopher/GolangGopher";
import Rust from "./rust/Rust";

export type CollectionConfig = {
  label: string;
  component: React.FunctionComponent;
  imgSrc: string;
  title?: string;
};

export const COLLECTION_CONFIG: CollectionConfig[] = [
  {
    label: "Nyan Cat",
    component: NyanCat,
    imgSrc: "/preview/nyan-cat-preview.png",
    title: "NyanCat",
  },
  {
    label: "Claude Mascot",
    component: ClaudeMascot,
    imgSrc: "/preview/claude-mascot-preview.png",
    title: "ClaudeMascot",
  },
  {
    label: "Golang Gopher",
    component: GolangGopher,
    imgSrc: "/preview/golang-gopher-preview.png",
    title: "GolangGopher",
  },
  {
    label: "Rust",
    component: Rust,
    imgSrc: "/preview/rust-preview.png",
    title: "Rust",
  },
];
