import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export const SectionTitle = ({ asChild, className, ...props }: React.ComponentProps<"div"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot='section-title'
      className={cn(
        "flex w-max desktop:px-[2.4rem] px-[1.6rem] desktop:text-[1.8rem] text-[1.6rem] font-bold text-white desktop:leading-[4.8rem] leading-[4.2rem] rounded-[4.8rem] bg-black",
        className
      )}
      {...props}
    />
  );
};
