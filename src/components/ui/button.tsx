import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap desktop:text-[1.8rem] text-[1.4rem] desktop:leading-[3rem] leading-[2.2rem] font-bold disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-[2.4rem] shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer transition-[transform,background-color,scale] duration-200 ease-in-out active:scale-90 focus-visible:scale-90",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-black bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default:
          "desktop:h-[5.6rem] h-[4.8rem] desktop:px-[1.6rem] px-[1.2rem] desktop:py-[1.6rem] py-[1.2rem] has-[>svg]:px-[1.6rem]",
        sm: "h-[4.8rem] gap-[1.2rem] px-[1.6rem] text-[1.4rem] leading-[2.2rem] has-[>svg]:px-[1.2rem]",
        xs: "h-[3.6rem] gap-[0.8rem] px-[1.2rem] text-[1.4rem] leading-[2.2rem] has-[>svg]:px-[1.2rem]",
        lg: "desktop:h-[7.2rem] h-[5.8rem] desktop:px-[1.6rem] px-[1.2rem] desktop:py-[1.6rem] py-[1.2rem] desktop:text-[2rem] text-[1.6rem] desktop:leading-[3.2rem] leading-[2.6rem] has-[>svg]:px-[1.6rem]",
        icon: "size-[2.4rem]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return <Comp data-slot='button' className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
