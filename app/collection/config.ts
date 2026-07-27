import dynamic from "next/dynamic";


export type CollectionConfig = {
  label: string;
  component: React.ComponentType;
  imgSrc: string;
  title?: string;
};

const ClaudeMascot1 = dynamic(() => import("./claude-mascot-1/ClaudeMascot1"));
const ClaudeMascot2 = dynamic(() => import("./claude-mascot-2/ClaudeMascot2"));
const ClaudeMascot3 = dynamic(() => import("./claude-mascot-3/ClaudeMascot3"));
const ClaudeMascot4 = dynamic(() => import("./claude-mascot-4/ClaudeMascot4"));
const ClaudeMascot5 = dynamic(() => import("./claude-mascot-5/ClaudeMascot5"));
const ClaudeMascot6 = dynamic(() => import("./claude-mascot-6/ClaudeMascot6"));
const ClaudeMascot7 = dynamic(() => import("./claude-mascot-7/ClaudeMascot7"));
const ClaudeMascot8 = dynamic(() => import("./claude-mascot-8/ClaudeMascot8"));
const ClaudeMascot9 = dynamic(() => import("./claude-mascot-9/ClaudeMascot9"));
const ClaudeMascot10 = dynamic(() => import("./claude-mascot-10/ClaudeMascot10"));
const ClaudeMascot11 = dynamic(() => import("./claude-mascot-11/ClaudeMascot11"));
const ClaudeMascot12 = dynamic(() => import("./claude-mascot-12/ClaudeMascot12"));
const ClaudeMascot13 = dynamic(() => import("./claude-mascot-13/ClaudeMascot13"));
const ClaudeMascot14 = dynamic(() => import("./claude-mascot-14/ClaudeMascot14"));
const ClaudeMascot15 = dynamic(() => import("./claude-mascot-15/ClaudeMascot15"));
const ClaudeMascot16 = dynamic(() => import("./claude-mascot-16/ClaudeMascot16"));
const ClaudeMascot17 = dynamic(() => import("./claude-mascot-17/ClaudeMascot17"));
const ClaudeMascot18 = dynamic(() => import("./claude-mascot-18/ClaudeMascot18"));

export const COLLECTION_CONFIG: CollectionConfig[] = [
  {
    label: "Thinker",
    component: ClaudeMascot1,
    imgSrc: "/preview/c1-preview.png",
    title: "ClaudeMascot 1",
  },
  {
    label: "Sage",
    component: ClaudeMascot2,
    imgSrc: "/preview/c2-preview.png",
    title: "ClaudeMascot 2",
  },
  {
    label: "Magician",
    component: ClaudeMascot3,
    imgSrc: "/preview/c3-preview.png",
    title: "ClaudeMascot 3",
  },
  {
    label: "Footballer",
    component: ClaudeMascot4,
    imgSrc: "/preview/c4-preview.png",
    title: "ClaudeMascot 4",
  },
  {
    label: "Programmer",
    component: ClaudeMascot5,
    imgSrc: "/preview/c5-preview.png",
    title: "ClaudeMascot 5",
  },
  {
    label: "Lazy",
    component: ClaudeMascot6,
    imgSrc: "/preview/c6-preview.png",
    title: "ClaudeMascot 6",
  },
  {
    label: "Fighter",
    component: ClaudeMascot7,
    imgSrc: "/preview/c7-preview.png",
    title: "ClaudeMascot 7",
  },
  {
    label: "Crazy",
    component: ClaudeMascot8,
    imgSrc: "/preview/c8-preview.png",
    title: "ClaudeMascot 8",
  },
  {
    label: "Grump",
    component: ClaudeMascot9,
    imgSrc: "/preview/c9-preview.png",
    title: "ClaudeMascot 9",
  },
  {
    label: "Boxer",
    component: ClaudeMascot10,
    imgSrc: "/preview/c10-preview.png",
    title: "ClaudeMascot 10",
  },
  {
    label: "Cowboy",
    component: ClaudeMascot11,
    imgSrc: "/preview/c11-preview.png",
    title: "ClaudeMascot 11",
  },
  {
    label: "Grandpa",
    component: ClaudeMascot12,
    imgSrc: "/preview/c12-preview.png",
    title: "ClaudeMascot 12",
  },
  {
    label: "Shocked",
    component: ClaudeMascot13,
    imgSrc: "/preview/c13-prewiew.png",
    title: "ClaudeMascot 13",
  },
  {
    label: "Partier",
    component: ClaudeMascot14,
    imgSrc: "/preview/c14-preview.png",
    title: "ClaudeMascot 14",
  },
  {
    label: "Dreamer",
    component: ClaudeMascot15,
    imgSrc: "/preview/c15-preview.png",
    title: "ClaudeMascot 15",
  },
  {
    label: "Rockstar",
    component: ClaudeMascot16,
    imgSrc: "/preview/c16-preview.png",
    title: "ClaudeMascot 16",
  },
  {
    label: "Curious",
    component: ClaudeMascot17,
    imgSrc: "/preview/c17-preview.png",
    title: "ClaudeMascot 17",
  },
  {
    label: "Luffy",
    component: ClaudeMascot18,
    imgSrc: "/preview/c18-preview.png",
    title: "ClaudeMascot 18",
  },
];
