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

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClick}
      className="relative flex aspect-square w-full items-center justify-center rounded-lg border bg-secondary ring ring-background transition-colors duration-300 hover:shadow-sm shadow-neutral-200 cursor-pointer overflow-hidden group/card"
    >
      <div className="absolute inset-1 rounded-lg bg-background/30 group-hover/card:bg-background/60 transition-colors duration-300 shadow hover:shadow-sm shadow-neutral-200" />

      <div className="relative z-10 w-1/2 h-1/2 max-w-[48px] max-h-[48px] min-w-[24px] min-h-[24px]">
        <Image
          src={imgSrc}
          alt={label}
          fill
          sizes="(max-width: 640px) 32px, (max-width: 1024px) 40px, 48px"
          className="object-contain transition-transform duration-300 group-hover/card:scale-110"
        />
      </div>
    </div>
  );
};

export default SpriteCard;
