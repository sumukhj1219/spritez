"use client";

import React, { useEffect, useState, useRef } from "react";
import "./golang-gopher.css";

export type GolangGopherAnimationStates = "idle" | "walk" | "hit" | "touch";

export interface GolangGopherActions {
  onClickStage?: GolangGopherAnimationStates;
  onClickSprite?: GolangGopherAnimationStates;
  onHoverNear?: GolangGopherAnimationStates;
}

export interface GolangGopherProps {
  initialX?: number;
  initialY?: number;
  size?: number;
  hoverRange?: number;
  damageRange?: number;
  actions?: GolangGopherActions;
}

const defaultActions: GolangGopherActions = {
  onClickStage: "walk",
  onClickSprite: "hit",
  onHoverNear: "touch",
};

const defaultGolangGopherProps = {
  initialX: 100,
  initialY: 100,
  size: 1,
  hoverRange: 50,
  damageRange: 20,
  actions: defaultActions,
};

const GolangGopher = (props: GolangGopherProps) => {
  const { initialX, initialY, size, hoverRange, damageRange, actions } = {
    ...defaultGolangGopherProps,
    ...props,
    actions: {
      ...defaultGolangGopherProps.actions,
      ...props.actions,
    },
  };

  const [animation, setAnimation] =
    useState<GolangGopherAnimationStates>("idle");
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isFlipped, setIsFlipped] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const speeds: Record<GolangGopherAnimationStates, string> = {
    idle: "1.25s",
    walk: "0.6s",
    touch: "0.8s",
    hit: "1.5s",
  };

  useEffect(() => {
    if (animation === "walk" || !actions.onClickStage) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.closest(".golang-gopher-sprite")
      )
        return;

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

  useEffect(() => {
    if (!actions.onHoverNear || animation === "walk" || animation === "hit")
      return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mascotCenterX = rect.left + rect.width / 2;
      const mascotCenterY = rect.top + rect.height / 2;

      const distX = e.clientX - mascotCenterX;
      const distY = e.clientY - mascotCenterY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance <= hoverRange) {
        if (animation !== actions.onHoverNear) {
          setAnimation(actions.onHoverNear!);
        }
      } else {
        if (animation === actions.onHoverNear) {
          setAnimation("idle");
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [animation, actions.onHoverNear, hoverRange]);

  const handleTransitionEnd = () => {
    if (animation !== "walk") return;
    setAnimation("idle");
  };

  return (
    <div
      ref={containerRef}
      className="golang-gopher-container"
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
        className={`golang-gopher-sprite ${animation}`}
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

export default GolangGopher;
