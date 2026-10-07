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
