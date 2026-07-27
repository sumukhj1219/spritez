"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "radix-ui"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

const SheetOpenContext = React.createContext(false)

function Sheet({
  open,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return (
    <SheetOpenContext.Provider value={!!open}>
      <SheetPrimitive.Root data-slot="sheet" open={open} {...props} />
    </SheetOpenContext.Provider>
  )
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" forceMount {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay asChild forceMount data-slot="sheet-overlay" {...props}>
      <motion.div
        className={cn("fixed inset-0 z-50", className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
    </SheetPrimitive.Overlay>
  )
}

const SIDE_OFFSET: Record<"top" | "right" | "bottom" | "left", { x: number; y: number }> = {
  right: { x: 40, y: 0 },
  left: { x: -40, y: 0 },
  top: { x: 0, y: -40 },
  bottom: { x: 0, y: 40 },
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  const open = React.useContext(SheetOpenContext)
  const { x, y } = SIDE_OFFSET[side]

  return (
    <AnimatePresence>
      {open && (
        <SheetPortal>
          <SheetOverlay />
          <SheetPrimitive.Content
            asChild
            forceMount
            data-slot="sheet-content"
            data-side={side}
            {...props}
          >
            <motion.div
              initial={{ opacity: 0, x: 100, y }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 32, ease:"easeInOut" }}
              style={{ transformOrigin: "calc(100% - 26px) 26px" }}
              className={cn(
                "fixed z-50 flex flex-col gap-4 rounded-xl border ring ring-background bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg data-[side=bottom]:inset-x-4 data-[side=bottom]:bottom-4 data-[side=bottom]:h-auto data-[side=left]:inset-y-4 data-[side=left]:left-4 data-[side=left]:right-4 data-[side=left]:h-auto data-[side=left]:w-auto data-[side=left]:sm:right-auto data-[side=left]:sm:w-3/4 data-[side=right]:inset-y-4 data-[side=right]:right-4 data-[side=right]:left-4 data-[side=right]:h-auto data-[side=right]:w-auto data-[side=right]:sm:left-auto data-[side=right]:sm:w-3/4 data-[side=top]:inset-x-4 data-[side=top]:top-4 data-[side=top]:h-auto data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
                className
              )}
            >
              {children}
              {showCloseButton && (
                <SheetPrimitive.Close data-slot="sheet-close" asChild>
                  <Button
                    variant="secondary"
                    className="absolute top-3 right-3"
                    size="icon-sm"
                  >
                    <XIcon />
                    <span className="sr-only">Close</span>
                  </Button>
                </SheetPrimitive.Close>
              )}
            </motion.div>
          </SheetPrimitive.Content>
        </SheetPortal>
      )}
    </AnimatePresence>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "text-base font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
