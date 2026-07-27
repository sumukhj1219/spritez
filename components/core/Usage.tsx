"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const UsageComponent = () => {
  const [copiedText, setCopiedText] = useState("");

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(id);
      setTimeout(() => setCopiedText(""), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex mx-auto w-full max-w-5xl flex-col md:py-5 py-5 gap-y-3 relative">
      <div className="flex gap-x-2">
        <h1 className="md:text-4xl text-3xl tracking-tight text-left text-secondary relative">
          Usage
        </h1>
      </div>
      <h3 className="md:text-sm text-xs text-left text-secondary">
        This page demonstrates how to use spritez in your React project.
      </h3>
      <div className="flex flex-col gap-y-3 mt-8">
        <div className="flex flex-col gap-y-2">
          <h2 className="md:text-2xl text-xl tracking-tight text-left text-secondary">
            1. Getting Started
          </h2>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="md:text-sm text-xs text-left text-secondary flex items-center gap-x-4 justify-between ">
            <div>
              To get started, install claudesprites using npm or yarn:
              <br />
              <code>npm install claudesprites</code>
            </div>
            <Button
              size={"sm"}
              variant={"secondary"}
              onClick={() =>
                handleCopy("npm install claudesprites", "install")
              }
            >
              {copiedText === "install" ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-y-2 mt-8">
          <h2 className="md:text-2xl text-xl tracking-tight text-left text-secondary">
            2. Importing
          </h2>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="md:text-sm text-xs text-left text-secondary flex items-center gap-x-4 justify-between ">
            <div>
              <code>{`import { ClaudeMascot1 } from 'claudesprites';`}</code>
              <br />
              <code>{`import "claudesprites/styles.css";`}</code>
            </div>
            <Button
              size={"sm"}
              variant={"secondary"}
              onClick={() =>
                handleCopy(
                  `import { ClaudeMascot1 } from 'claudesprites';\nimport "claudesprites/styles.css";`,
                  "import",
                )
              }
            >
              {copiedText === "import" ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-y-2 mt-8">
          <h2 className="md:text-2xl text-xl tracking-tight text-left text-secondary">
            3. Using
          </h2>
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="md:text-sm text-xs text-left text-secondary flex items-center gap-x-4 justify-between ">
            <div>
              <code>{`<ClaudeMascot1 />`}</code>
            </div>
            <Button
              size={"sm"}
              variant={"secondary"}
              onClick={() => handleCopy("<ClaudeMascot1 />", "using")}
            >
              {copiedText === "using" ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageComponent;
