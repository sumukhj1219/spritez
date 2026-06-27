import React from "react";
import Pattern from "../svgs/Pattern";
import Image from "next/image";

interface SpriteCardProps {
  label: string;
  imgSrc: string;
}

const SpriteCard = ({ label, imgSrc }: SpriteCardProps) => {
  return (
    <div className="flex items-center justify-center mx-auto rounded-lg relative cursor-pointer size-16 bg-secondary border  ring ring-white  hover:shadow-sm shadow-neutral-200 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <Pattern />
      </div>
      <div className="relative z-10">
        <Image src={imgSrc} alt={label} width={32} height={32} />
      </div>
    </div>
  );
};

export default SpriteCard;
