"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";

interface DialogContextValue {
  innerOpen: boolean;
  setInnerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DialogContext = React.createContext<DialogContextValue | undefined>(undefined);

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  const [outerOpen, setOuterOpen] = React.useState(false);
  const [innerOpen, setInnerOpen] = React.useState(false);

  return (
    <DialogContext.Provider value={{ innerOpen, setInnerOpen }}>
      <DialogPrimitive.Root open={outerOpen} onOpenChange={setOuterOpen} data-slot='dialog' {...props} />
    </DialogContext.Provider>
  );
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />;
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />;
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot='dialog-close' {...props} />;
}

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot='dialog-overlay'
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-[#000000]/70",
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal data-slot='dialog-portal'>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot='dialog-content'
        className={cn(
          "bg-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] desktop:gap-[4rem] gap-[3.2rem] border desktop:p-[7.2rem_4.8rem_4.8rem] p-[3.2rem_1.6rem_1.6rem] shadow-lg duration-200",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot='dialog-close'
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute desktop:top-[1.6rem] desktop:right-[2.4rem] top-[1rem] right-[1rem] transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[4rem] cursor-pointer"
          >
            <svg
              width='40'
              height='40'
              viewBox='0 0 40 40'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='desktop:size-[4rem] size-[2.4rem]'
            >
              <g transform='translate(8, 8)'>
                <path d='M22 2L2 22' stroke='#05141F' strokeWidth='2' strokeLinecap='square' strokeLinejoin='round' />
                <path d='M2 2L22 22' stroke='#05141F' strokeWidth='2' strokeLinecap='square' strokeLinejoin='round' />
              </g>
            </svg>
            <span className='sr-only'>Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot='dialog-header' className={cn("flex flex-col gap-2 text-center", className)} {...props} />;
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot='dialog-footer'
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot='dialog-title'
      className={cn(
        "desktop:text-[2.4rem] text-[1.6rem] desktop:leading-[3.8rem] leading-[2.6rem] font-semibold text-primary",
        className
      )}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot='dialog-description'
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

/**
 * Inner Dialog
 */

function InnerDialog({ children }: { children: React.ReactNode }) {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error("InnerDialog must be used within a Dialog");
  React.useEffect(() => {
    const handleEscapeKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && context.innerOpen) {
        context.setInnerOpen(false);
        event.stopPropagation();
      }
    };
    document.addEventListener("keydown", handleEscapeKeyDown);
    return () => {
      document.removeEventListener("keydown", handleEscapeKeyDown);
    };
  }, [context.innerOpen, context.setInnerOpen, context]);

  return (
    <DialogPrimitive.Root open={context.innerOpen} onOpenChange={context.setInnerOpen}>
      {children}
    </DialogPrimitive.Root>
  );
}
const InnerDialogTrigger = DialogPrimitive.Trigger;
const InnerDialogClose = DialogPrimitive.Close;
interface InnerDialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  position?: "default" | "bottom" | "top" | "left" | "right";
  draggable?: boolean;
}
const InnerDialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  InnerDialogContentProps
>(({ className, children, position = "default", draggable = false, ...props }, ref) => {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error("InnerDialogContent must be used within a Dialog");

  const [isDragging, setIsDragging] = React.useState(false);
  const [startY, setStartY] = React.useState(0);
  const [currentY, setCurrentY] = React.useState(0);
  const [isClosingByDrag, setIsClosingByDrag] = React.useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (context.innerOpen) {
      setCurrentY(0);
      setIsClosingByDrag(false);
    }
  }, [context.innerOpen]);
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggable) return;
    setIsDragging(true);
    setStartY(e.clientY - currentY);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !draggable) return;
    const newY = e.clientY - startY;
    setCurrentY(newY > 0 ? newY : 0);
  };
  const handlePointerUp = () => {
    if (!draggable) return;
    setIsDragging(false);
    if (currentY > (contentRef.current?.offsetHeight || 0) / 2) {
      setIsClosingByDrag(true);
      context.setInnerOpen(false);
    } else {
      setCurrentY(0);
    }
  };
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={cn(
          "bg-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-[4rem] border p-[7.2rem_4.8rem_2.4rem] shadow-lg duration-200 sm:max-w-lg",
          isClosingByDrag
            ? "data-[state=closed]:animate-none data-[state=closed]:fade-out-0"
            : "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          position === "default" && "",
          position === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full",
          position === "top" && "data-[state=closed]:slide-out-to-top-full data-[state=open]:slide-in-from-top-full",
          position === "left" && "data-[state=closed]:slide-out-to-left-full data-[state=open]:slide-in-from-left-full",
          position === "right" &&
            "data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full",
          draggable && "",
          className
        )}
        {...props}
      >
        <div ref={contentRef}>{children}</div>
        <InnerDialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-[1.6rem] right-[2.4rem] transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[4rem] cursor-pointer">
          <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <g transform='translate(8, 8)'>
              <path d='M22 2L2 22' stroke='#05141F' strokeWidth='2' strokeLinecap='square' strokeLinejoin='round' />
              <path d='M2 2L22 22' stroke='#05141F' strokeWidth='2' strokeLinecap='square' strokeLinejoin='round' />
            </g>
          </svg>
          <span className='sr-only'>Close</span>
        </InnerDialogClose>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
InnerDialogContent.displayName = "InnerDialogContent";
const InnerDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
InnerDialogHeader.displayName = "InnerDialogHeader";
const InnerDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:space-x-2", className)} {...props} />
);
InnerDialogFooter.displayName = "InnerDialogFooter";
const InnerDialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
InnerDialogTitle.displayName = "InnerDialogTitle";
const InnerDialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
InnerDialogDescription.displayName = "InnerDialogDescription";

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  InnerDialog,
  InnerDialogTrigger,
  InnerDialogContent,
  InnerDialogHeader,
  InnerDialogFooter,
  InnerDialogTitle,
  InnerDialogDescription,
  InnerDialogClose
};
