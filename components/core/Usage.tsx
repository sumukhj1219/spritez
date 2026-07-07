"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const UsageComponent = () => {
  const [copiedText, setCopiedText] = useState("");

  const handleCopy = async (text, id) => {
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
              To get started, install spritez using npm or yarn:
              <br />
              <code>npm install react-web-spritez</code>
            </div>
            <Button
              size={"sm"}
              variant={"secondary"}
              onClick={() =>
                handleCopy("npm install react-web-spritez", "install")
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
              <code>{`import { GolangGopher } from 'react-web-spritez';`}</code>
              <br />
              <code>{`import "react-web-spritez/styles.css";`}</code>
            </div>
            <Button
              size={"sm"}
              variant={"secondary"}
              onClick={() =>
                handleCopy(
                  `import { GolangGopher } from 'react-web-spritez';\nimport "react-web-spritez/styles.css";`,
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
              <code>{`<GolangGopher />`}</code>
            </div>
            <Button
              size={"sm"}
              variant={"secondary"}
              onClick={() => handleCopy("<GolangGopher />", "using")}
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
