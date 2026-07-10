"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const Heading = () => {
  const [copied, setCopied] = useState(false);
  const command = "npm install react-web-spritez";

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
      <h1 className="sm:text-7xl text-4xl text-left">
        ClaudeSpritez
      </h1>
      <h3 className="md:text-2xl text-xs px-1 text-left">
        A curated collection of highly interactive Sprites for Claude.
      </h3>
      <div className="sm:text-lg text-xs text-left sm:my-5 my-3 w-full flex max-w-md overflow-hidden flex-row items-stretch sm:items-center gap-3">
        <div className="flex min-w-0 overflow-x-auto  border px-3 md:py-1  rounded-lg ring ring-background">
          <code className="flex sm:block items-center justify-center">{command}</code>
        </div>
        <Button onClick={handleCopy} size={"lg"} className="shrink-0">
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
};

export default Heading;
