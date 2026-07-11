import ClaudeMascot1 from "./claude-mascot-1/ClaudeMascot1";
import ClaudeMascot2 from "./claude-mascot-2/ClaudeMascot2";

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
];
