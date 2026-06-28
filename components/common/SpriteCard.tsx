import React from "react";
import Image from "next/image";
import BottomSheet from "./BottomSheet";
import Pattern from "../svgs/Pattern";

interface SpriteCardProps {
  label: string;
  imgSrc: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const SpriteCard = ({ label, imgSrc, onClick }: SpriteCardProps) => {
  return (
    <BottomSheet
      trigger={
        <div
          onClick={onClick}
          className="flex items-center justify-center mx-auto rounded-lg relative cursor-pointer size-16 bg-secondary hover:bg-neutral-200/30 transition-colors duration-300 border ring ring-white hover:shadow-sm shadow-neutral-200 overflow-hidden "
        >
          <div className="relative z-10">
            <Image src={imgSrc} alt={label} width={32} height={32} />
          </div>
        </div>
      }
    >
      <div className="flex flex-col text-left lowercase p-1">
        <h3 className="text-sm font-bold mb-2">{label}</h3>

        <div className="relative w-32 h-32 flex items-center justify-center border rounded-xl overflow-hidden bg-muted">
          <Pattern className="absolute inset-0 size-full z-0 object-cover" />

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
      </div>
    </BottomSheet>
  );
};

export default SpriteCard;
