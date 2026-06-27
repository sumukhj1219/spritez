import React from "react";
import Image from "next/image";

interface SpriteCardProps {
  label: string;
  imgSrc: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const SpriteCard = ({ label, imgSrc, onClick }: SpriteCardProps) => {
  return (
    <div
      onClick={(e) => onClick(e)}
      className="flex items-center justify-center mx-auto rounded-lg relative cursor-pointer size-16 bg-secondary hover:bg-neutral-200/30 transition-colors duration-300 border ring ring-white hover:shadow-sm shadow-neutral-200 overflow-hidden"
    >
      <div className="relative z-10">
        <Image src={imgSrc} alt={label} width={32} height={32} />
      </div>
    </div>
  );
};

export default SpriteCard;
