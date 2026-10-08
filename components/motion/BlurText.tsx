"use client";

import React from "react";
import { m, type Variants } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: stagger } },
  // Leaves faster than it arrives, last letter first.
  exit: { transition: { staggerChildren: stagger / 2, staggerDirection: -1 } },
});

const letter = (duration: number): Variants => ({
  hidden: { opacity: 0, filter: "blur(12px)", y: 8 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    filter: "blur(12px)",
    y: -8,
    transition: { duration: duration * 0.6, ease: [0.64, 0, 0.78, 0] },
  },
});

const BlurText = ({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  duration = 0.6,
}: BlurTextProps) => {
  const letterVariants = letter(duration);
  const words = text.split(" ");

  return (
    <m.span
      variants={container(delay, stagger)}
      initial="hidden"
      animate="show"
      exit="exit"
      className={className}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, w) => (
        <React.Fragment key={w}>
          {/* Letters of a word stay together so lines only wrap between words. */}
          <span aria-hidden className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, c) => (
              <m.span key={c} variants={letterVariants} className="inline-block">
                {char}
              </m.span>
            ))}
          </span>
          {/* A plain space between words: it disappears at line ends, so wrapped lines stay centered. */}
          {w < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </m.span>
  );
};

export default BlurText;
