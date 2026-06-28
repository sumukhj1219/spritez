import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface BottomSheetProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export default function BottomSheet({ trigger, children }: BottomSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-[50vh] border ring ring-white w-full md:w-[45vw] p-4 mx-auto rounded-lg my-5"
      >
        {children}
      </SheetContent>
    </Sheet>
  );
}
