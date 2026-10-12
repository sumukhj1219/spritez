"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { m } from "framer-motion";
import GithubIcon from "@/components/svgs/GithubIcon";
import { siteConfig } from "@/lib/seo";

// WebGL only exists in the browser, and three.js stays out of the initial bundle.
const CloudBanner = dynamic(() => import("./CloudBanner"), { ssr: false });

// Hidden until the extension is live on the Chrome Web Store.
const SHOW_EXTENSION = false;

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
    <div className="relative isolate mx-auto w-full px-6 sm:px-9 md:pl-18 pt-9 md:pt-18 tracking-tight">
      <CloudBanner />
      {/* Only the content slides in; the cloud banner stays put and fades on its own. */}
      <m.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:gap-y-3 gap-y-1"
      >
        <h1 className="sm:text-7xl text-4xl text-left">ClaudeSpritez</h1>
        <h3 className="md:text-2xl text-xs px-1 text-left">
          A curated collection of highly interactive sprites of claude.
        </h3>
        <div className="sm:text-lg text-xs text-left sm:my-5 my-3 w-full flex overflow-hidden flex-row items-stretch sm:items-center gap-3">
          <div className="flex min-w-0 sm:shrink-0 overflow-x-auto  border px-3 md:py-1  rounded-lg inset-shadow-xs inset-shadow-white bg-secondary">
            <code className="flex sm:block items-center justify-center">
              {command}
            </code>
          </div>
          <Button
            onClick={handleCopy}
            size={"lg"}
            className="shrink-0"
            aria-label={copied ? "Copied" : "Copy install command"}
          >
            {/* Both labels share one grid cell so the button keeps the width of the longer one. */}
            <span className="grid [&>*]:col-start-1 [&>*]:row-start-1">
              <span className={copied ? "invisible" : undefined}>Copy</span>
              <span className={copied ? undefined : "invisible"}>Copied!</span>
            </span>
          </Button>
          <Button asChild variant="secondary" size="icon-lg" className="shrink-0">
            <a
              href={siteConfig.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View the source on GitHub"
            >
              <GithubIcon className="size-5" />
            </a>
          </Button>
          {SHOW_EXTENSION && (
            <button
              aria-label="Get the Chrome extension"
              className="group/ext group/button inline-flex shrink-0 items-center justify-center rounded-lg bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 h-9 px-2 bg-radial-[at_50%_25%] from-background/80 via-background/90 border border-white to-background to-90% text-secondary-foreground hover:bg-background/90  overflow-hidden cursor-pointer"
            >
              <img className="size-6 shrink-0 p-0.25" src={"/app/chrome.svg"} alt="Chrome logo" />

              {/* 0fr → 1fr grid column animates the label's width without JS. Only from
                  sm up: on phones the row has no spare room, so expanding would squeeze its neighbours. */}
              <span className="grid grid-cols-[0fr] opacity-0 transition-all duration-250 ease-in-out sm:group-hover/ext:ml-2 sm:group-hover/ext:grid-cols-[1fr] sm:group-hover/ext:opacity-100 sm:group-focus-visible/ext:ml-2 sm:group-focus-visible/ext:grid-cols-[1fr] sm:group-focus-visible/ext:opacity-100">
                <span className="overflow-hidden whitespace-nowrap">Get Extension</span>
              </span>
            </button>
          )}
        </div>
      </m.div>
    </div>
  );
};

export default Heading;
