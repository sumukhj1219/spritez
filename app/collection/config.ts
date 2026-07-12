import ClaudeMascot1 from "./claude-mascot-1/ClaudeMascot1";
import ClaudeMascot2 from "./claude-mascot-2/ClaudeMascot2";
import ClaudeMascot3 from "./claude-mascot-3/ClaudeMascot3";
import ClaudeMascot4 from "./claude-mascot-4/ClaudeMascot4";
import ClaudeMascot5 from "./claude-mascot-5/ClaudeMascot5";
import ClaudeMascot6 from "./claude-mascot-6/ClaudeMascot6";
import ClaudeMascot7 from "./claude-mascot-7/ClaudeMascot7";

export type CollectionConfig = {
  label: string;
  component: React.FunctionComponent;
  imgSrc: string;
  title?: string;
};

export const COLLECTION_CONFIG: CollectionConfig[] = [
  {
    label: "ClaudeMascot 1",
    component: ClaudeMascot1,
    imgSrc: "/preview/c1-preview.png",
    title: "ClaudeMascot 1",
  },
  {
    label: "ClaudeMascot 2",
    component: ClaudeMascot2,
    imgSrc: "/preview/c2-preview.png",
    title: "ClaudeMascot 2",
  },
  {
    label: "ClaudeMascot 3",
    component: ClaudeMascot3,
    imgSrc: "/preview/c3-preview.png",
    title: "ClaudeMascot 3",
  },
  {
    label: "ClaudeMascot 4",
    component: ClaudeMascot4,
    imgSrc: "/preview/c4-preview.png",
    title: "ClaudeMascot 4",
  },
  {
    label: "ClaudeMascot 5",
    component: ClaudeMascot5,
    imgSrc: "/preview/c5-preview.png",
    title: "ClaudeMascot 5",
  },
  {
    label: "ClaudeMascot 6",
    component: ClaudeMascot6,
    imgSrc: "/preview/c6-preview.png",
    title: "ClaudeMascot 6",
  },
  {
    label: "ClaudeMascot 7",
    component: ClaudeMascot7,
    imgSrc: "/preview/c7-preview.png",
    title: "ClaudeMascot 7",
  }
];
