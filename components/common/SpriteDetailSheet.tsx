"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight, Copy } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { COLLECTION_CONFIG, CollectionConfig } from "@/app/collection/config";
import Pattern from "@/components/svgs/Pattern";
import CodeBlock from "./CodeBlock";

interface SpriteDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sprite: CollectionConfig | null;
  onSpriteChange: (sprite: CollectionConfig) => void;
}

interface CodeStepProps {
  label: string;
  code: string;
  lang: string;
  copied: boolean;
  onCopy: () => void;
}

const CodeStep = ({ label, code, lang, copied, onCopy }: CodeStepProps) => (
  <div className="flex flex-col gap-3">
    <label>{label}</label>
    <div className="group flex items-center gap-2 justify-center ring ring-background rounded-lg my-auto relative px-3 py-4">
      <CodeBlock
        code={code}
        lang={lang}
        className="flex min-w-0 flex-1  overflow-x-auto whitespace-pre text-xs text-secondary-foreground [&_pre]:flex-1 [scrollbar-width:thin] [scrollbar-color:var(--border)_transparent] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-scrollbar [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-scrollbar"
      />
      <Button
        size="icon-xs"
        variant="secondary"
        className="shrink-0 absolute right-0 top-0 hidden group-hover:flex"
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
      >
        {copied ? <Check className="text-primary" /> : <Copy />}
      </Button>
    </div>
  </div>
);

const SpriteDetailSheet = ({
  open,
  onOpenChange,
  sprite,
  onSpriteChange,
}: SpriteDetailSheetProps) => {
  const [copiedId, setCopiedId] = useState("");

  if (!sprite) return null;

  const variantNumber = sprite.label.match(/(\d+)\s*$/)?.[1] ?? "1";
  const componentName = `ClaudeMascot${variantNumber}`;
  const spriteSheetSrc = `/sprites/c${variantNumber}.png`;

  const activeIndex = COLLECTION_CONFIG.indexOf(sprite);
  const total = COLLECTION_CONFIG.length;
  const prevSprite = COLLECTION_CONFIG[(activeIndex - 1 + total) % total];
  const nextSprite = COLLECTION_CONFIG[(activeIndex + 1) % total];

  const goTo = (next: CollectionConfig) => {
    setCopiedId("");
    onSpriteChange(next);
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(""), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="lowercase">{sprite.label}</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4 pb-6 ">
          <div className="relative h-24 w-24 overflow-hidden rounded-lg ring ring-background border">
            <div className="absolute inset-0 ">
              <Pattern />
            </div>
            <Image
              src={sprite.imgSrc}
              alt={sprite.label}
              width={64}
              height={64}
              className="absolute inset-0 m-auto object-contain [image-rendering:pixelated]"
            />
          </div>

          <div className="flex flex-col gap-y-5  p-2 ">
            <CodeStep
              label="1. Install"
              code="npm install claudesprites"
              lang="bash"
              copied={copiedId === "install"}
              onCopy={() =>
                handleCopy("npm install claudesprites", "install")
              }
            />
            <CodeStep
              label="2. Import"
              code={`import { ${componentName} } from "claudesprites";\nimport "claudesprites/styles.css";`}
              lang="tsx"
              copied={copiedId === "import"}
              onCopy={() =>
                handleCopy(
                  `import { ${componentName} } from "claudesprites";\nimport "claudesprites/styles.css";`,
                  "import",
                )
              }
            />
            <CodeStep
              label="3. Use"
              code={`<${componentName} />`}
              lang="tsx"
              copied={copiedId === "use"}
              onCopy={() => handleCopy(`<${componentName} />`, "use")}
            />
          </div>
          <Button>Download Sprite Sheet</Button>

          <div className="flex items-center justify-between gap-2">
            <Button
              variant="secondary"
              size="icon-sm"
              onClick={() => goTo(prevSprite)}
              aria-label="Previous sprite"
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="secondary"
              size="icon-sm"
              onClick={() => goTo(nextSprite)}
              aria-label="Next sprite"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SpriteDetailSheet;
