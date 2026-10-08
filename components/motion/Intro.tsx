"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { figtree } from "@/lib/font";
import MotionProvider from "./MotionProvider";
import BlurText from "./BlurText";

// Each line blurs in, holds, then blurs out for the next one. `at` is when it starts (ms).
const STEPS = [
  { at: 0, text: "Introducing", stagger: 0.05 },
  { at: 1900, text: "ClaudeSpritez", stagger: 0.05 },
  // Long line, so a quicker stagger keeps it to about a second.
  { at: 4400, text: "A curated collection of highly interactive sprites of claude.", stagger: 0.015 },
];

const Intro = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = STEPS.slice(1).map(({ at }, i) => setTimeout(() => setStep(i + 1), at));
    return () => timers.forEach(clearTimeout);
  }, []);

  const { text, stagger } = STEPS[step];

  return (
    <MotionProvider>
      <div
        className={`flex items-center justify-center mx-auto min-h-screen max-w-4xl px-6 text-center text-4xl sm:text-5xl ${figtree.className}`}
      >
        <AnimatePresence mode="wait">
          <BlurText key={text} text={text} stagger={stagger} />
        </AnimatePresence>
      </div>
    </MotionProvider>
  );
};

export default Intro;
