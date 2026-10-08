"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

const loadFeatures = () => import("./features").then((mod) => mod.default);

const MotionProvider = ({ children }: { children: React.ReactNode }) => (
  <LazyMotion features={loadFeatures}>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </LazyMotion>
);

export default MotionProvider;
