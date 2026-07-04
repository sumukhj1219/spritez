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
        className="h-[50vh] border ring ring-primary md:w-[10vw] w-[36vw] p-2 mx-auto rounded-lg my-5"
      >
        {children}
      </SheetContent>
    </Sheet>
  );
}
