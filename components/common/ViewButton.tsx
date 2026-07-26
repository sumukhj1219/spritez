"use client";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface ViewButtonProps {
  title?: string;
}

// Destructured the title prop with a fallback default
const ViewButton = ({ title = "Sprite Details" }: ViewButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full m-1"
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size={"xs"}
            variant={"secondary"}
            className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            view
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>This action cannot be undone.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
};

export default ViewButton;
