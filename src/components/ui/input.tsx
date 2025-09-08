import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex px-[1.6rem] desktop:h-[5.6rem] h-[4.8rem] w-full border border-border rounded-none bg-background py-2 text-primary placeholder:text-muted-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 [&[data-error=true]]:border-destructive",
          className
        )}
        ref={ref}
        {...props}
        value={props.value || ""}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
