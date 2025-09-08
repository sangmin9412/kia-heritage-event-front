import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

type DotListProps = {
  className?: string;
  children: React.ReactNode;
};

type DotItemProps = React.ComponentProps<"li"> & {
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
};

const DotList = ({ className, children }: DotListProps) => {
  return <ul className={cn("flex flex-col gap-[.8rem]", className)}>{children}</ul>;
};

const DotItem = ({ asChild, className, children, ...props }: DotItemProps) => {
  const Comp = asChild ? Slot : "li";

  return (
    <Comp
      className={cn(
        "relative flex flex-col desktop:pl-[1.6rem] pl-[1.2rem] text-[1.8rem] leading-[3rem] [--line-height:3rem] [--dot-size:0.4rem]",
        className
      )}
      {...props}
    >
      <span className='absolute left-0 top-0 flex items-center h-[var(--line-height)] before:size-[var(--dot-size)] before:rounded-full before:bg-[currentColor]'></span>
      {children}
    </Comp>
  );
};

export { DotList, DotItem };
