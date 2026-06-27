"use client";

import React, { useEffect, useState } from "react";
import "./soldier.css";

export type SoldierAnimationStates =
  | "idle"
  | "walk"
  | "attack1"
  | "attack2"
  | "attack3"
  | "hit"
  | "dead";

export interface SoldierSpriteActions {
  onHoverNear?: SoldierAnimationStates;
  onClickSprite?: SoldierAnimationStates;
  onClickStage?: SoldierAnimationStates;
  onBoundaryHit?: SoldierAnimationStates;
}

export interface SoldierProps {
  initialX?: number;
  initialY?: number;
  size?: number;
  attackRange?: number;
  damageRange?: number;
  actions?: SoldierSpriteActions;
}

const defaultActions: SoldierSpriteActions = {
  onHoverNear: "attack1",
  onClickSprite: "hit",
  onClickStage: "walk",
  onBoundaryHit: "hit",
};

const defaultSoldierProps = {
  initialX: 100,
  initialY: 100,
  size: 1,
  attackRange: 80,
  damageRange: 20,
  actions: defaultActions,
};

const Soldier = (props: SoldierProps) => {
  const { initialX, initialY, size, attackRange, damageRange, actions } = {
    ...defaultSoldierProps,
    ...props,
    actions: {
      ...defaultSoldierProps.actions,
      ...props.actions,
    },
  };

  const [animation, setAnimation] = useState<SoldierAnimationStates>("idle");
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isFlipped, setIsFlipped] = useState(false);

  const speeds: Record<SoldierAnimationStates, string> = {
    idle: "0.8s",
    walk: "0.6s",
    attack1: "0.5s",
    attack2: "0.5s",
    attack3: "0.5s",
    hit: "0.25s",
    dead: "0.6s",
  };

  useEffect(() => {
    if (animation === "dead" || animation === "walk" || !actions.onHoverNear)
      return;

    const checkCursor = (e: MouseEvent) => {
      const el = document.querySelector(".soldier-container");
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = Math.abs(e.clientX - centerX);
      const dy = Math.abs(e.clientY - centerY);

      if (dx < attackRange && dy < attackRange) {
        setAnimation(actions.onHoverNear!);
      } else if (animation === actions.onHoverNear) {
        setAnimation("idle");
      }
    };

    window.addEventListener("mousemove", checkCursor);
    return () => window.removeEventListener("mousemove", checkCursor);
  }, [animation, attackRange, actions.onHoverNear]);

  useEffect(() => {
    if (animation === "dead" || !actions.onClickStage) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.closest(".soldier-sprite"))
        return;

      const x = e.clientX - 50;
      const y = e.clientY - 50;

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

    const el = document.querySelector(".soldier-container");
    if (!el || !actions.onBoundaryHit) {
      setAnimation("idle");
      return;
    }

    const rect = el.getBoundingClientRect();

    const hit =
      rect.left < damageRange ||
      rect.right > window.innerWidth - damageRange ||
      rect.top < damageRange ||
      rect.bottom > window.innerHeight - damageRange;

    setAnimation(hit ? actions.onBoundaryHit : "idle");
  };

  return (
    <div
      className="soldier-container absolute"
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
        className={`soldier-sprite ${animation}`}
        style={{
          ["--playback-speed" as any]: speeds[animation],
          pointerEvents: "auto",
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (actions.onClickSprite && animation !== "dead") {
            setAnimation(actions.onClickSprite);
          }
        }}
        onAnimationEnd={() => {
          if (animation === actions.onClickSprite || animation === "hit") {
            setAnimation("idle");
          }
        }}
      />
    </div>
  );
};

export default Soldier;
