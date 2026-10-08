"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import MotionProvider from "@/components/motion/MotionProvider";
import BlurText from "@/components/motion/BlurText";
import "@/app/collection/claude-mascot-17/c17.css";
import "./not-found.css";

const CloudBanner = dynamic(() => import("@/components/core/CloudBanner"), { ssr: false });

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
});

const NotFoundPage = () => {
  return (
    <MotionProvider>
      <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <CloudBanner />

        <h1 className="text-[7rem] leading-none tracking-tighter sm:text-[10rem]">
          <BlurText text="404" stagger={0.12} duration={0.8} />
        </h1>

        <m.div {...fadeUp(0.5)} className="mt-4 flex flex-col gap-1">
          <p className="text-xl sm:text-2xl">This page wandered off.</p>
          <p className="text-sm text-muted-foreground sm:text-base">
            Even our sprites get lost sometimes. This one is still looking for it.
          </p>
        </m.div>

        {/* The Curious mascot pacing back and forth, searching for the page. */}
        <m.div {...fadeUp(0.8)} aria-hidden className="relative mt-10 flex h-36 w-full max-w-md items-end justify-center">
          <div className="lost-pace-shadow absolute bottom-1 h-2 w-20 rounded-[50%] bg-foreground/10 blur-[2px]" />
          <div className="lost-pace">
            <div className="origin-bottom scale-[2] [image-rendering:pixelated]">
              <div className="c17-container">
                <div
                  className="c17-sprite walk"
                  style={{ "--playback-speed": "0.6s" } as React.CSSProperties}
                />
              </div>
            </div>
          </div>
        </m.div>

        <m.div {...fadeUp(1.1)} className="mt-8">
          <Button asChild size="lg">
            <Link href="/">Take me home</Link>
          </Button>
        </m.div>
      </main>
    </MotionProvider>
  );
};

export default NotFoundPage;
