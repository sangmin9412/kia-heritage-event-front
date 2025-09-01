import { cn } from "@/lib/utils";

export const Loading = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className='text-primary'>Loading...</div>
    </div>
  );
};
