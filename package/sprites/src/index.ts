export type ClaudeMascotAnimationStates =
  | "idle"
  | "walk"
  | "hit"
  | "touch"
  | "exercise";

export interface ClaudeMascotActions {
  onClickStage?: ClaudeMascotAnimationStates;
  onClickSprite?: ClaudeMascotAnimationStates;
  onHoverNear?: ClaudeMascotAnimationStates;
}

export interface ClaudeMascotProps {
  initialX?: number;
  initialY?: number;
  size?: number;
  hoverRange?: number;
  damageRange?: number;
  actions?: ClaudeMascotActions;
}

export const defaultActions: ClaudeMascotActions = {
  onClickStage: "walk",
  onClickSprite: "hit",
  onHoverNear: "touch",
};

export { SPRITE_SHEET_URLS } from "./sprite-urls";

export { default as ClaudeMascot1 } from "./claude-mascot-1/ClaudeMascot1";
export { default as ClaudeMascot2 } from "./claude-mascot-2/ClaudeMascot2";
export { default as ClaudeMascot3 } from "./claude-mascot-3/ClaudeMascot3";
export { default as ClaudeMascot4 } from "./claude-mascot-4/ClaudeMascot4";
export { default as ClaudeMascot5 } from "./claude-mascot-5/ClaudeMascot5";
export { default as ClaudeMascot6 } from "./claude-mascot-6/ClaudeMascot6";
export { default as ClaudeMascot7 } from "./claude-mascot-7/ClaudeMascot7";
export { default as ClaudeMascot8 } from "./claude-mascot-8/ClaudeMascot8";
export { default as ClaudeMascot9 } from "./claude-mascot-9/ClaudeMascot9";
export { default as ClaudeMascot10 } from "./claude-mascot-10/ClaudeMascot10";
export { default as ClaudeMascot11 } from "./claude-mascot-11/ClaudeMascot11";
export { default as ClaudeMascot12 } from "./claude-mascot-12/ClaudeMascot12";
export { default as ClaudeMascot13 } from "./claude-mascot-13/ClaudeMascot13";
export { default as ClaudeMascot14 } from "./claude-mascot-14/ClaudeMascot14";
export { default as ClaudeMascot15 } from "./claude-mascot-15/ClaudeMascot15";
export { default as ClaudeMascot16 } from "./claude-mascot-16/ClaudeMascot16";
export { default as ClaudeMascot17 } from "./claude-mascot-17/ClaudeMascot17";
export { default as ClaudeMascot18 } from "./claude-mascot-18/ClaudeMascot18";
export { default as ClaudeMascot19 } from "./claude-mascot-19/ClaudeMascot19";
export { default as ClaudeMascot20 } from "./claude-mascot-20/ClaudeMascot20";
