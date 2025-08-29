import { Button } from "@/components/ui/button";
import { createPosterFormSchemaType } from "@/features/poster/components/create-poster-form";
import { useEventEnterFormStore } from "@/features/poster/store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";

interface PosterPreviewProps {
  form: UseFormReturn<createPosterFormSchemaType>;
  onSubmit: (data: createPosterFormSchemaType) => void;
  isValid: boolean;
}

export const PosterPreview = ({ form, isValid, onSubmit }: PosterPreviewProps) => {
  return (
    <div>
      <div className='flex flex-col gap-[3.2rem]'>
        <div className='bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)]'>
          <div className='h-[53.8rem]'>
            <PosterPreviewer className='origin-top-left scale-[0.39814814814814814]' />
          </div>
        </div>
        <div>
          <Button size='lg' disabled={!isValid} type='submit' className='w-full'>
            포스터 생성하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export const PosterPreviewer = ({ className }: { className?: string }) => {
  const { posterForm } = useEventEnterFormStore(state => state);

  const { frameType, imageBase64, imageScale, imageVertical, imageHorizontal, carType, posterTitle } = posterForm;

  const imageStyle = {
    "--image-horizontal": `${imageHorizontal}%`,
    "--image-vertical": `${imageVertical}%`,
    "--image-scale": `${imageScale}`,
    transform: `translateX(var(--image-horizontal)) translateY(var(--image-vertical)) scale(var(--image-scale))`
  } as React.CSSProperties;

  if (!posterForm) return null;

  if (frameType === "horizontal") {
    return (
      <section
        className={cn("relative w-[108rem] h-[135rem] bg-[linear-gradient(180deg,#DEDEDE_0%,#F7F7F7_100%)]", className)}
      >
        <div className='absolute inset-0 pointer-events-none'>
          <Image src='/images/create/poster_frame_bg_hrz.png' alt='frame' fill className='object-cover' unoptimized />
        </div>
        <div className='absolute left-0 top-[24.3rem] w-[90.5rem] h-[67.9rem] overflow-hidden'>
          <div className={cn("relative w-full h-full")} style={imageStyle}>
            {imageBase64 && <Image src={imageBase64} alt='poster' fill className='object-cover' unoptimized />}
          </div>
        </div>
        <div className='absolute right-[8.1rem] top-[75.6rem] w-[34.5rem] h-[34.5rem]'>
          {carType && (
            <Image src={`/images/create/car/${carType}.png`} alt='car' fill className='object-cover' unoptimized />
          )}
        </div>
        <div className='absolute left-[10.2rem] top-[101rem] min-h-[16rem] flex flex-col gap-[3.2rem] justify-end whitespace-normal'>
          {posterTitle && <p className='text-[5rem] leading-[6.4rem] font-bold text-primary'>{posterTitle}</p>}
          <p className='text-[5rem] leading-[6.4rem] text-primary'>기아와 함께한 순간</p>
        </div>
      </section>
    );
  }

  if (frameType === "vertical") {
    return (
      <section
        className={cn("relative w-[108rem] h-[135rem] bg-[linear-gradient(180deg,#DEDEDE_0%,#F7F7F7_100%)]", className)}
      >
        <div className='absolute inset-0 pointer-events-none'>
          <Image src='/images/create/poster_frame_bg_vtc.png' alt='frame' fill className='object-cover' unoptimized />
        </div>
        <div className='absolute right-0 top-0 w-[71.5rem] h-[95.3rem] overflow-hidden z-[-1]'>
          <div className={cn("relative w-full h-full")} style={imageStyle}>
            {imageBase64 && <Image src={imageBase64} alt='poster' fill className='object-cover' unoptimized />}
          </div>
        </div>
        <div className='absolute left-[16.3rem] top-[75.6rem] w-[34.5rem] h-[34.5rem]'>
          {carType && (
            <Image src={`/images/create/car/${carType}.png`} alt='car' fill className='object-cover' unoptimized />
          )}
        </div>
        <div className='absolute right-[10.6rem] top-[102.1rem] min-h-[16rem] flex flex-col gap-[2.9rem] items-end justify-end whitespace-normal'>
          {posterTitle && <p className='text-[5rem] leading-[6.4rem] font-bold text-primary'>{posterTitle}</p>}
          <p className='text-[5rem] leading-[6.4rem] text-primary'>기아와 함께한 순간</p>
        </div>
      </section>
    );
  }

  return <></>;
};
