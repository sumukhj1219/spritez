import ClaudeMascot1 from "./claude-mascot-1/ClaudeMascot1";
import ClaudeMascot2 from "./claude-mascot-2/ClaudeMascot2";
import ClaudeMascot3 from "./claude-mascot-3/ClaudeMascot3";
import ClaudeMascot4 from "./claude-mascot-4/ClaudeMascot4";
import ClaudeMascot5 from "./claude-mascot-5/ClaudeMascot5";
import ClaudeMascot6 from "./claude-mascot-6/ClaudeMascot6";
import ClaudeMascot7 from "./claude-mascot-7/ClaudeMascot7";
import ClaudeMascot8 from "./claude-mascot-8/ClaudeMascot8";
import ClaudeMascot9 from "./claude-mascot-9/ClaudeMascot9";
import ClaudeMascot10 from "./claude-mascot-10/ClaudeMascot10";
import ClaudeMascot11 from "./claude-mascot-11/ClaudeMascot11";
import ClaudeMascot12 from "./claude-mascot-12/ClaudeMascot12";
import ClaudeMascot13 from "./claude-mascot-13/ClaudeMascot13";
import ClaudeMascot14 from "./claude-mascot-14/ClaudeMascot14";
import ClaudeMascot15 from "./claude-mascot-15/ClaudeMascot15";
import ClaudeMascot16 from "./claude-mascot-16/ClaudeMascot16";

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
  },
  {
    label: "ClaudeMascot 8",
    component: ClaudeMascot8,
    imgSrc: "/preview/c8-preview.png",
    title: "ClaudeMascot 8",
  },
  {
    label: "ClaudeMascot 9",
    component: ClaudeMascot9,
    imgSrc: "/preview/c9-preview.png",
    title: "ClaudeMascot 9",
  },
  {
    label: "ClaudeMascot 10",
    component: ClaudeMascot10,
    imgSrc: "/preview/c10-preview.png",
    title: "ClaudeMascot 10",
  },
  {
    label: "ClaudeMascot 11",
    component: ClaudeMascot11,
    imgSrc: "/preview/c11-preview.png",
    title: "ClaudeMascot 11",
  },
  {
    label: "ClaudeMascot 12",
    component: ClaudeMascot12,
    imgSrc: "/preview/c12-preview.png",
    title: "ClaudeMascot 12",
  },
  {
    label: "ClaudeMascot 13",
    component: ClaudeMascot13,
    imgSrc: "/preview/c13-prewiew.png",
    title: "ClaudeMascot 13",
  },
  {
    label: "ClaudeMascot 14",
    component: ClaudeMascot14,
    imgSrc: "/preview/c14-preview.png",
    title: "ClaudeMascot 14",
  },
  {
    label: "ClaudeMascot 15",
    component: ClaudeMascot15,
    imgSrc: "/preview/c15-preview.png",
    title: "ClaudeMascot 15",
  },
  {
    label: "ClaudeMascot 16",
    component: ClaudeMascot16,
    imgSrc: "/preview/c16-preview.png",
    title: "ClaudeMascot 16",
  },
];
