"use client"

import React, { useEffect, useState, useRef } from 'react'
import './claude-mascot.css'

export type ClaudeMascotAnimationStates = "idle" | "walk" | "hit" | "touch"

export interface ClaudeMascotActions {
    onClickStage?: ClaudeMascotAnimationStates
    onClickSprite?: ClaudeMascotAnimationStates
    onHoverNear?: ClaudeMascotAnimationStates
}

export interface ClaudeMascotProps {
    initialX?: number
    initialY?: number
    size?: number
    attackRange?: number
    damageRange?: number
    actions?: ClaudeMascotActions
}

const defaultActions: ClaudeMascotActions = {
    onClickStage: "walk",
    onClickSprite: "hit",
    onHoverNear: "touch"
}

const defaultClaudeMascotProps = {
    initialX: 100,
    initialY: 100,
    size: 1,
    attackRange: 150, // Added default attack/hover detection range
    damageRange: 20,
    actions: defaultActions,
}

const ClaudeMascot = (props: ClaudeMascotProps) => {
    const {
        initialX,
        initialY,
        size,
        attackRange,
        damageRange,
        actions,
    } = {
        ...defaultClaudeMascotProps,
        ...props,
        actions: {
            ...defaultClaudeMascotProps.actions,
            ...props.actions,
        },
    }

    const [animation, setAnimation] = useState<ClaudeMascotAnimationStates>("idle")
    const [position, setPosition] = useState({ x: initialX, y: initialY })
    const [isFlipped, setIsFlipped] = useState(false)
    
    // Use a ref to get the actual center of the mascot for accurate distance math
    const containerRef = useRef<HTMLDivElement>(null)

    const speeds: Record<ClaudeMascotAnimationStates, string> = {
        idle: "0.8s",
        walk: "0.6s",
        touch: "0.8s",
        hit: "0.8s"
    }

    // 1. Handle Stage Clicks (Walking)
    useEffect(() => {
        if (animation === "walk" || !actions.onClickStage) return

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.tagName === "BUTTON" || target.closest(".claude-mascot-sprite"))
                return

            const x = e.clientX - 16
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

    // 2. Handle "Hover Near" Proximity Detection
    useEffect(() => {
        if (!actions.onHoverNear || animation === "walk" || animation === "hit") return

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return

            const rect = containerRef.current.getBoundingClientRect()
            const mascotCenterX = rect.left + rect.width / 2
            const mascotCenterY = rect.top + rect.height / 2

            // Calculate distance between mouse and mascot center
            const distX = e.clientX - mascotCenterX
            const distY = e.clientY - mascotCenterY
            const distance = Math.sqrt(distX * distX + distY * distY)

            if (distance <= attackRange) {
                if (animation !== actions.onHoverNear) {
                    setAnimation(actions.onHoverNear)
                }
            } else {
                // Return to idle if the mouse leaves the proximity zone
                if (animation === actions.onHoverNear) {
                    setAnimation("idle")
                }
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [animation, actions.onHoverNear, attackRange])

    const handleTransitionEnd = () => {
        if (animation !== "walk") return
        setAnimation("idle")
    }

    return (
        <div
            ref={containerRef}
            className="claude-mascot-container"
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
                className={`claude-mascot-sprite ${animation}`}
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
                    // Reset to idle if a one-shot animation finishes
                    if (animation === actions.onClickSprite) {
                        setAnimation("idle")
                    }
                }}
            />
        </div>
    )
}

export default ClaudeMascot