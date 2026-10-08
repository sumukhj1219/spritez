import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Intro from "@/components/motion/Intro";
import React from "react";

// The intro is only used for recording promo footage, so it isn't part of the live site.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const IntroPage = () => {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div>
      <Intro />
    </div>
  );
};

export default IntroPage;
