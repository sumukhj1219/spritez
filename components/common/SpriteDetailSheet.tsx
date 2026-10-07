"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight, Copy, Download } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
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
  step: number;
  label: string;
  code: string;
  lang: "bash" | "tsx";
  copied: boolean;
  onCopy: () => void;
}

const CodeStep = ({ step, label, code, lang, copied, onCopy }: CodeStepProps) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
      <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[0.7rem] text-foreground tabular-nums">
        {step}
      </span>
      {label}
    </div>
    <div className="flex items-center gap-2 rounded-lg border bg-muted/40 py-2.5 pr-1.5 pl-3">
      <CodeBlock
        code={code}
        lang={lang}
        className="scrollbar-hairline min-w-0 flex-1 overflow-x-auto py-0.5 font-mono text-xs leading-relaxed whitespace-pre"
      />
      <Button
        size="icon-xs"
        variant="secondary"
        className="shrink-0 bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
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

  const activeIndex = COLLECTION_CONFIG.indexOf(sprite);
  const total = COLLECTION_CONFIG.length;
  const variantNumber = activeIndex + 1;
  const componentName = `ClaudeMascot${variantNumber}`;
  const spriteSheetSrc = `/sprites/c${variantNumber}.png`;
  const prevSprite = COLLECTION_CONFIG[(activeIndex - 1 + total) % total];
  const nextSprite = COLLECTION_CONFIG[(activeIndex + 1) % total];

  const installCode = "npm install claudesprites";
  const importCode = `import { ${componentName} } from "claudesprites";\nimport "claudesprites/styles.css";`;
  const useCode = `<${componentName} />`;

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
      <SheetContent
        side="right"
        className="gap-0 overflow-hidden data-[side=right]:top-1/2 data-[side=right]:bottom-auto data-[side=right]:-translate-y-1/2 max-h-[calc(100dvh-2rem)]"
      >
        <SheetHeader className="border-b px-5 py-4 pr-14">
          <SheetTitle className="capitalize">{sprite.label}</SheetTitle>
          <SheetDescription className="font-mono text-xs">
            {componentName} · {String(variantNumber).padStart(2, "0")}/
            {String(total).padStart(2, "0")}
          </SheetDescription>
        </SheetHeader>

        <div className="scrollbar-hairline flex min-h-0 flex-auto flex-col gap-6 overflow-y-auto px-5 pt-5 pb-5">
          <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border bg-muted/30">
            <div className="absolute inset-0 opacity-60">
              <Pattern />
            </div>
            <Image
              src={sprite.imgSrc}
              alt={sprite.label}
              width={96}
              height={96}
              className="relative object-contain [image-rendering:pixelated]"
            />
          </div>

          <div className="flex flex-col gap-5">
            <CodeStep
              step={1}
              label="Install"
              code={installCode}
              lang="bash"
              copied={copiedId === "install"}
              onCopy={() => handleCopy(installCode, "install")}
            />
            <CodeStep
              step={2}
              label="Import"
              code={importCode}
              lang="tsx"
              copied={copiedId === "import"}
              onCopy={() => handleCopy(importCode, "import")}
            />
            <CodeStep
              step={3}
              label="Use"
              code={useCode}
              lang="tsx"
              copied={copiedId === "use"}
              onCopy={() => handleCopy(useCode, "use")}
            />
          </div>
        </div>

        <SheetFooter className="mt-0 flex-row items-center gap-2 border-t px-5 py-3">
          <Button
            variant="secondary"
            size="icon-sm"
            onClick={() => goTo(prevSprite)}
            aria-label="Previous sprite"
          >
            <ChevronLeft />
          </Button>
          <Button asChild size="sm" className="flex-1">
            <a href={spriteSheetSrc} download={`claude-mascot-${variantNumber}.png`}>
              <Download />
              Download sprite sheet
            </a>
          </Button>
          <Button
            variant="secondary"
            size="icon-sm"
            onClick={() => goTo(nextSprite)}
            aria-label="Next sprite"
          >
            <ChevronRight />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SpriteDetailSheet;
