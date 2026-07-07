"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <div className="flex mx-auto w-full max-w-5xl flex-col md:py-5 py-5 gap-y-3">
      <div className="flex gap-x-2">
        <h1 className="md:text-4xl text-3xl tracking-tight text-left text-secondary relative">
          ReactWebSpritez
        </h1>
      </div>
      <h3 className="md:text-sm text-xs text-left text-secondary">
        An interactive floating and pixel sprites for React websites
      </h3>
      <Link
        href={"/usage"}
        className="md:text-sm text-xs text-left text-secondary hover:underline"
      >
        Wanna check out how to use ?
      </Link>

      <div className="md:text-sm text-xs text-left text-secondary my-5 w-full flex items-center justify-between ">
        <code className="font-mono">{command}</code>
        <Button onClick={handleCopy} variant={"secondary"} size={"xs"}>
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
};

export default Heading;
