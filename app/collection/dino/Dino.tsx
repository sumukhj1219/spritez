"use client";

import React, { useEffect, useState } from "react";
import "./dino.css";

export type DinoAnimationStates = "idle" | "walk" | "rub";

export interface DinoSpriteActions {
  onClickStage?: DinoAnimationStates;
  onClickSprite?: DinoAnimationStates;
}

export interface DinoProps {
  initialX?: number;
  initialY?: number;
  size?: number;
  damageRange?: number;
  actions?: DinoSpriteActions;
}

const defaultActions: DinoSpriteActions = {
  onClickStage: "walk",
  onClickSprite: "rub",
};

const defaultDinoProps = {
  initialX: 100,
  initialY: 100,
  size: 1,
  damageRange: 20,
  actions: defaultActions,
};

const Dino = (props: DinoProps) => {
  const { initialX, initialY, size, damageRange, actions } = {
    ...defaultDinoProps,
    ...props,
    actions: {
      ...defaultDinoProps.actions,
      ...props.actions,
    },
  };

  const [animation, setAnimation] = useState<DinoAnimationStates>("idle");
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isFlipped, setIsFlipped] = useState(false);

  const speeds: Record<DinoAnimationStates, string> = {
    idle: "0.8s",
    walk: "0.6s",
    rub: "0.8s",
  };

  useEffect(() => {
    if (animation === "walk" || !actions.onClickStage) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.closest(".dino-sprite")) return;

      const x = e.clientX - 32;
      const y = e.clientY - 32;

      setIsFlipped(x < position.x);
      setAnimation(actions.onClickStage!);

      if (actions.onClickStage === "walk") {
        setPosition({ x, y });
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [position.x, animation, actions.onClickStage]);

  const handleTransitionEnd = () => {
    if (animation !== "walk") return;

    const el = document.querySelector(".dino-container");
    if (!el) {
      setAnimation("idle");
      return;
    }

    const rect = el.getBoundingClientRect();

    const hit =
      rect.left < damageRange ||
      rect.right > window.innerWidth - damageRange ||
      rect.top < damageRange ||
      rect.bottom > window.innerHeight - damageRange;

    setAnimation(hit ? "idle" : "idle");
  };

  return (
    <div
      className="dino-container"
      onTransitionEnd={handleTransitionEnd}
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `scale(${size}) scaleX(${isFlipped ? -1 : 1})`,
        transition:
          animation === "walk"
            ? "left 4s ease-in-out, top 4s ease-in-out"
            : "none",
        zIndex: 9999,
      }}
    >
      <div
        className={`dino-sprite ${animation}`}
        style={{
          ["--playback-speed" as any]: speeds[animation],
          pointerEvents: "auto",
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (actions.onClickSprite) {
            setAnimation(actions.onClickSprite);
          }
        }}
        onAnimationEnd={() => {
          if (animation === actions.onClickSprite) {
            setAnimation("idle");
          }
        }}
      />
    </div>
  );
};

export default Dino;
