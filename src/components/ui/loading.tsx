import { cn } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const Loading = ({ className }: { className?: string }) => {
  return (
    <div className={cn("mx-auto tablet:max-w-[28rem] flex items-center justify-center", className)}>
      <DotLottieReact src={"/lotties/loading/Insider-loading.json"} loop autoplay />
    </div>
  );
};
