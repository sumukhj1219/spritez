"use client";
import React from "react";
import Image from "next/image";

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
    <div
      onClick={(e) => onClick(e)}
      className="flex items-center justify-center mx-auto rounded-lg cursor-pointer size-14 sm:size-16 bg-secondary transition-colors duration-300 relative border ring ring-background group hover:shadow-sm shadow-neutral-200 overflow-hidden"
    >
      <div className="flex items-center shadow absolute justify-center mx-auto rounded-lg cursor-pointer size-12 sm:size-13 bg-background/30 group-hover:bg-background/60 transition-colors duration-300 hover:shadow-sm shadow-neutral-200 overflow-hidden" />
      <div className="relative z-10 w-6 h-6 sm:w-8 sm:h-8">
        <Image
          src={imgSrc}
          alt={label}
          fill
          sizes="(max-width: 640px) 24px, 32px"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default SpriteCard;
