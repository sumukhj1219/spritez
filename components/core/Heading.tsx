"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Heading = () => {
  const [copied, setCopied] = useState(false);
  const command = "npm install claudesprites";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex mx-auto w-full flex-col px-6 sm:px-9 md:pl-18 pt-9 md:pt-18 sm:gap-y-3 gap-y-1 tracking-tight">
      <h1 className="sm:text-7xl text-4xl text-left">ClaudeSpritez</h1>
      <h3 className="md:text-2xl text-xs px-1 text-left">
        A curated collection of highly interactive sprites of claude.
      </h3>
      <div className="sm:text-lg text-xs text-left sm:my-5 my-3 w-full flex max-w-lg overflow-hidden flex-row items-stretch sm:items-center gap-3">
        <div className="flex min-w-0 overflow-x-auto  border px-3 md:py-1  rounded-lg ring ring-background">
          <code className="flex sm:block items-center justify-center">
            {command}
          </code>
        </div>
        <Button onClick={handleCopy} size={"lg"} className="shrink-0">
          {copied ? "Copied!" : "Copy"}
        </Button>
        <motion.button
          initial="initial"
          whileHover="hover"
          className="group/button inline-flex shrink-0 items-center justify-center rounded-lg bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 h-9 px-2 bg-radial-[at_50%_25%] from-background/80 via-background/90 border border-white to-background to-90% text-secondary-foreground hover:bg-background/90  overflow-hidden cursor-pointer"
        >
          <img className="size-6 shrink-0 p-0.25" src={"/app/chrome.svg"} alt="Chrome logo" />

          <motion.span
            variants={{
              initial: { width: 0, opacity: 0, marginLeft: 0 },
              hover: { width: "auto", opacity: 1, marginLeft: 8 },
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="inline-block overflow-hidden whitespace-nowrap w-0 opacity-0"
          >
            Get Extension
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
};

export default Heading;
