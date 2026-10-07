"use client";

import React, { useEffect, useState, useRef } from "react";
import "./c3.css";
import { defaultActions, ClaudeMascotProps, ClaudeMascotAnimationStates } from "@/lib/types";


const defaultClaudeMascotProps = {
  initialX: 100,
  initialY: 100,
  size: 1,
  hoverRange: 50,
  damageRange: 20,
  actions: defaultActions,
};

// Walk at a constant pace so long trips don't look like teleporting.
const WALK_PX_PER_SEC = 73;
const MIN_WALK_DURATION = 0.4;
const MAX_WALK_DURATION = 9;

const ClaudeMascot3 = (props: ClaudeMascotProps) => {
  const { initialX, initialY, size, hoverRange, damageRange, actions } = {
    ...defaultClaudeMascotProps,
    ...props,
    actions: {
      ...defaultClaudeMascotProps.actions,
      ...props.actions,
    },
  };

  const [animation, setAnimation] =
    useState<ClaudeMascotAnimationStates>("idle");
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [walkDuration, setWalkDuration] = useState(MIN_WALK_DURATION);
  const [isFlipped, setIsFlipped] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const speeds: Record<ClaudeMascotAnimationStates, string> = {
    idle: "0.8s",
    walk: "0.6s",
    touch: "0.8s",
    hit: "0.8s",
    exercise: "0.8s",
  };

  useEffect(() => {
    if (animation === "walk" || !actions.onClickStage) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.closest(".c3-sprite")
      )
        return;

      const x = e.clientX - 32;
      const y = e.clientY - 32;

      setIsFlipped(x < position.x);
      setAnimation(actions.onClickStage!);

      if (actions.onClickStage === "walk") {
        const distance = Math.hypot(x - position.x, y - position.y);
        setWalkDuration(
          Math.min(
            Math.max(distance / WALK_PX_PER_SEC, MIN_WALK_DURATION),
            MAX_WALK_DURATION,
          ),
        );
        setPosition({ x, y });
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [position.x, position.y, animation, actions.onClickStage]);

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
      className="c3-container"
      onTransitionEnd={handleTransitionEnd}
      style={{
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `scale(${size}) scaleX(${isFlipped ? -1 : 1})`,
        transition:
          animation === "walk"
            ? `left ${walkDuration}s linear, top ${walkDuration}s linear`
            : "none",
        zIndex: 9999,
      }}
    >
      <div
        className={`c3-sprite ${animation}`}
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

export default ClaudeMascot3
