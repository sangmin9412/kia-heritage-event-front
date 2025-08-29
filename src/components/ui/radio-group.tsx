"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot='radio-group'
      className={cn("grid gap-3", className)}
      {...props}
      value={props.value || ""}
    />
  );
}

function RadioGroupItem({
  className,
  mode = "default",
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & { mode?: "default" | "checkbox" }) {
  return (
    <RadioGroupPrimitive.Item
      data-slot='radio-group-item'
      className={cn(
        mode === "checkbox"
          ? "peer border-border dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-[2rem] shrink-0 rounded-full border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
          : "relative border border-border text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-[2rem] shrink-0 rounded-full shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot='radio-group-indicator'
        className={
          mode === "checkbox"
            ? "flex items-center justify-center text-current transition-none"
            : "absolute inset-[-1px]"
        }
      >
        {mode === "checkbox" ? (
          <CheckIcon className='w-[1.2rem] h-[1.2rem]' strokeWidth={4} />
        ) : (
          <span className='absolute inset-0 border-[5px] border-primary rounded-full'></span>
        )}
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
