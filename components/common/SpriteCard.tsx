"use client";
import React from "react";
import Image from "next/image";
import BottomSheet from "./BottomSheet";
import { Button } from "../ui/button";

interface SpriteCardProps {
  label: string;
  imgSrc: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  title?: string;
}

const SpriteCard = ({ label, imgSrc, onClick, title }: SpriteCardProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    window.navigator.clipboard.writeText(
      `import {${title}} from "react-web-spritez"`,
    );
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <BottomSheet
      trigger={
        <div
          onClick={onClick}
          className="flex items-center justify-center mx-auto rounded-lg relative cursor-pointer size-16"
        >
          <Image
            src="/app/banner2.png"
            alt="slot"
            width={62}
            height={62}
            className="object-contain absolute -z-10"
          />
          <div className="relative z-10">
            <Image src={imgSrc} alt={label} width={32} height={32} />
          </div>
        </div>
      }
    >
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center lowercase px-1.5 gap-y-3">
          <h3 className="text-sm font-bold text-secondary">{label}</h3>

          <div className="relative w-32 h-32 flex items-center justify-center">
            <Image
              src="/app/banner2.png"
              alt="slot"
              width={64}
              height={64}
              className="absolute inset-0 size-full z-0 object-cover"
            />
            <div className="relative z-10">
              <Image
                src={imgSrc}
                alt={label}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
          </div>
          <Button size={"sm"} onClick={handleCopy}>
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default SpriteCard;
