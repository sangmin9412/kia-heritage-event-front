import { cn } from "@/lib/utils";

export const IconPlus = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn("w-[2.4rem] h-[2.4rem]", className)}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.5 11V2H13.5V11H22.5V13H13.5V22H11.5V13H2.5V11H11.5Z'
        fill='#05141F'
      />
    </svg>
  );
};
