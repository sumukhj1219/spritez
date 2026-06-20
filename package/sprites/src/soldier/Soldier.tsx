"use client"

import React, { useEffect, useState } from 'react'
import "./soldier.css"

export type AnimationStates = 'idle' | 'walk' | 'attack1' | 'attack2' | 'attack3' | 'hit' | 'dead'

export interface SpriteActions {
  onHoverNear?: AnimationStates;  
  onClickSprite?: AnimationStates; 
  onClickStage?: AnimationStates;  
  onBoundaryHit?: AnimationStates; 
}

interface SoldierProps {
  initialX?: number;
  initialY?: number;
  size?: number;
  attackRange?: number;
  damageRange?: number;
  actions?: SpriteActions; 
}

const Soldier = ({
  initialX = 100,
  initialY = 100,
  size = 1,
  attackRange = 80,
  damageRange = 20,
  actions = {
    onHoverNear: 'attack1',
    onClickSprite: 'hit',
    onClickStage: 'walk',
    onBoundaryHit: 'hit'
  } 
}: SoldierProps) => {
  const [animation, setAnimation] = useState<AnimationStates>('idle')
  const [position, setPosition] = useState({ x: initialX, y: initialY })
  const [isFlipped, setIsFlipped] = useState(false)

  const speeds: Record<AnimationStates, string> = {
    idle: '0.8s', walk: '0.6s', attack1: '0.5s', attack2: '0.5s', attack3: '0.5s', hit: '0.25s', dead: '0.6s'
  }

  useEffect(() => {
    if (animation === 'dead' || animation === 'walk' || !actions.onHoverNear) return;

    const checkCursor = (e: MouseEvent) => {
      const soldierElement = document.querySelector('.soldier-container');
      if (!soldierElement) return;

      const rect = soldierElement.getBoundingClientRect();
      const soldierCenterX = rect.left + rect.width / 2;
      const soldierCenterY = rect.top + rect.height / 2;

      const distanceX = Math.abs(e.clientX - soldierCenterX);
      const distanceY = Math.abs(e.clientY - soldierCenterY);

      if (distanceX < attackRange && distanceY < attackRange) {
        setAnimation(actions.onHoverNear!);
      } else if (animation === actions.onHoverNear) {
        setAnimation('idle'); 
      }
    };

    window.addEventListener('mousemove', checkCursor);
    return () => window.removeEventListener('mousemove', checkCursor);
  }, [animation, attackRange, actions.onHoverNear]);

  useEffect(() => {
    if (animation === 'dead' || !actions.onClickStage) return;

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('.soldier-sprite')) return;

      const targetX = e.clientX - 50;
      const targetY = e.clientY - 50;

      setIsFlipped(targetX < position.x);
      
      setAnimation(actions.onClickStage!);
      
      if (actions.onClickStage === 'walk') {
        setPosition({ x: targetX, y: targetY });
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [position.x, animation, actions.onClickStage]);

  const handleTransitionEnd = () => {
    if (animation !== 'walk') return;

    const soldierElement = document.querySelector('.soldier-container');
    if (!soldierElement || !actions.onBoundaryHit) {
      setAnimation('idle');
      return;
    }

    const rect = soldierElement.getBoundingClientRect();
    const touchingLeft = rect.left < damageRange;
    const touchingRight = rect.right > (window.innerWidth - damageRange);
    const touchingTop = rect.top < damageRange;
    const touchingBottom = rect.bottom > (window.innerHeight - damageRange);

    if (touchingLeft || touchingRight || touchingTop || touchingBottom) {
      setAnimation(actions.onBoundaryHit);
    } else {
      setAnimation('idle');
    }
  };

  return (
    <div
      className="soldier-container"
      onTransitionEnd={handleTransitionEnd}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `scale(${size}) scaleX(${isFlipped ? -1 : 1})`,
        transition: (animation === 'walk') ? 'left 2s ease-in-out, top 2s ease-in-out' : 'none',
        zIndex: 9999
      }}
    >
      <div
        className={`soldier-sprite ${animation}`}
        style={{ ['--playback-speed' as any]: speeds[animation], pointerEvents: 'auto' }}
        onClick={(e) => {
          e.stopPropagation();
          if (actions.onClickSprite && animation !== 'dead') {
            setAnimation(actions.onClickSprite);
          }
        }}
        onAnimationEnd={() => {
          if (animation === actions.onClickSprite || animation === 'hit') {
            setAnimation('idle');
          }
        }}
      />
    </div>
  )
}

export default Soldier;