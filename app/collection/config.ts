import ClaudeMascot from "./claude-mascot/ClaudeMascot";

export type CollectionConfig = {
  label: string;
  component: React.FunctionComponent;
  imgSrc: string;
  title?: string;
};

export const COLLECTION_CONFIG: CollectionConfig[] = [
  {
    label: "Claude Mascot",
    component: ClaudeMascot,
    imgSrc: "/preview/claude-mascot-preview.png",
    title: "ClaudeMascot",
  },
];
