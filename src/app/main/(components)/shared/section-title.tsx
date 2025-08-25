import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export const SectionTitle = ({ asChild, className, ...props }: React.ComponentProps<"div"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot='section-title'
      className={cn(
        "flex w-max px-[2.4rem] text-[1.8rem] font-bold text-white leading-[4.8rem] rounded-[4.8rem] bg-black",
        className
      )}
      {...props}
    />
  );
};
