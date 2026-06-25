"use client"

import React, { useEffect, useState } from "react"
import "./nyan-cat.css"

export type NyanCatAnimationStates = "idle" | "walk" | "rub"

export interface NyanCatSpriteActions {
  onClickStage?: NyanCatAnimationStates
  onClickSprite?: NyanCatAnimationStates
}

export interface NyanCatProps {
  initialX?: number
  initialY?: number
  size?: number
  damageRange?: number
  actions?: NyanCatSpriteActions
}

const defaultActions: NyanCatSpriteActions = {
  onClickStage: "walk",
  onClickSprite: "rub"
}

const defaultNyanCatProps = {
  initialX: 100,
  initialY: 100,
  size: 1,
  damageRange: 20,
  actions: defaultActions,
}

const NyanCat = (props: NyanCatProps) => {
  const {
    initialX,
    initialY,
    size,
    damageRange,
    actions,
  } = {
    ...defaultNyanCatProps,
    ...props,
    actions: {
      ...defaultNyanCatProps.actions,
      ...props.actions,
    },
  }

  const [animation, setAnimation] = useState<NyanCatAnimationStates>("idle")
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const [isFlipped, setIsFlipped] = useState(false)

  const speeds: Record<NyanCatAnimationStates, string> = {
    idle: "0.8s",
    walk: "0.6s",
    rub: "0.8s"
  }

  useEffect(() => {
    if (animation === "walk" || !actions.onClickStage) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "BUTTON" || target.closest(".nyan-cat-sprite"))
        return

      const x = e.clientX - 31
      const y = e.clientY - 16

      setIsFlipped(x < position.x)
      setAnimation(actions.onClickStage!)

      if (actions.onClickStage === "walk") {
        setPosition({ x, y })
      }
    }

    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [position.x, animation, actions.onClickStage])

  const handleTransitionEnd = () => {
    if (animation !== "walk") return

    const el = document.querySelector(".nyan-cat-container")
    if (!el) {
      setAnimation("idle")
      return
    }

    const rect = el.getBoundingClientRect()

    const hit =
      rect.left < damageRange ||
      rect.right > window.innerWidth - damageRange ||
      rect.top < damageRange ||
      rect.bottom > window.innerHeight - damageRange

    setAnimation(hit ? "idle" : "idle")
  }

  return (
    <div
      className="nyan-cat-container"
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
        className={`nyan-cat-sprite ${animation}`}
        style={{
          ["--playback-speed" as any]: speeds[animation],
          pointerEvents: "auto",
        }}
        onClick={(e) => {
          e.stopPropagation()
          if (actions.onClickSprite) {
            setAnimation(actions.onClickSprite)
          }
        }}
        onAnimationEnd={() => {
          if (animation === actions.onClickSprite) {
            setAnimation("idle")
          }
        }}
      />
    </div>
  )
}

export default NyanCat