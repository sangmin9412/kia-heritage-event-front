import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { IcTextPlaceholder } from "@/assets/icons";

export const PosterPreviewerParams = ({
  className,
  frameType,
  imageBase64,
  imageScale,
  imageVertical,
  imageHorizontal,
  carType,
  posterTitle
}: {
  className?: string;
  frameType?: string;
  imageBase64?: string;
  imageScale?: string;
  imageVertical?: string;
  imageHorizontal?: string;
  carType?: string;
  posterTitle?: string;
}) => {
  const imageStyle = useMemo(
    () => ({
      "--image-horizontal": `${imageHorizontal}%`,
      "--image-vertical": `${imageVertical}%`,
      "--image-scale": `${imageScale}`,
      transform: `translateX(var(--image-horizontal)) translateY(var(--image-vertical)) scale(var(--image-scale))`
    }),
    [imageHorizontal, imageVertical, imageScale]
  );

  if (frameType === "horizontal") {
    return (
      <section
        className={cn("relative w-[108rem] h-[135rem] bg-[linear-gradient(180deg,#DEDEDE_0%,#F7F7F7_100%)]", className)}
      >
        <div className='absolute inset-0 pointer-events-none'>
          <Image src='/images/create/poster_frame_bg_hrz.png' alt='frame' fill className='object-cover' unoptimized />
        </div>
        <div className='absolute left-0 top-[24.3rem] w-[90.5rem] h-[67.9rem] bg-white overflow-hidden'>
          <PosterImageFrame className='relative w-full h-full' imageBase64={imageBase64} imageStyle={imageStyle} />
          {!imageBase64 && (
            <IcTextPlaceholder className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[48rem] h-auto' />
          )}
        </div>
        <div className='absolute right-[8.1rem] top-[75.6rem] w-[34.5rem] h-[34.5rem]'>
          <PosterCar carType={carType} />
        </div>
        <div className='absolute left-[10.2rem] top-[101rem] min-h-[16rem] flex flex-col gap-[3.2rem] justify-end whitespace-normal'>
          <PosterTitle posterTitle={posterTitle} />
          <p className='text-[5rem] leading-[6.4rem] text-primary'>기아와 함께한 순간</p>
        </div>
      </section>
    );
  }

  if (frameType === "vertical") {
    return (
      <section
        className={cn(
          "relative w-[108rem] h-[135rem] bg-[linear-gradient(180deg,#DEDEDE_0%,#F7F7F7_100%)] z-[0]",
          className
        )}
      >
        <div className='absolute inset-0 pointer-events-none'>
          <Image src='/images/create/poster_frame_bg_vtc.png' alt='frame' fill className='object-cover' unoptimized />
        </div>
        <div className='absolute right-0 top-0 w-[71.5rem] h-[95.3rem] bg-white overflow-hidden z-[-1]'>
          <PosterImageFrame className='relative w-full h-full' imageBase64={imageBase64} imageStyle={imageStyle} />
          {!imageBase64 && (
            <IcTextPlaceholder className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[48rem] h-auto' />
          )}
        </div>
        <div className='absolute left-[16.3rem] top-[75.6rem] w-[34.5rem] h-[34.5rem]'>
          <PosterCar carType={carType} />
        </div>
        <div className='absolute right-[10.6rem] top-[102.1rem] min-h-[16rem] flex flex-col gap-[2.9rem] items-end justify-end whitespace-normal'>
          <PosterTitle posterTitle={posterTitle} />
          <p className='text-[5rem] leading-[6.4rem] text-primary'>기아와 함께한 순간</p>
        </div>
      </section>
    );
  }

  return <></>;
};

const PosterImageFrame = React.memo(
  ({
    className,
    imageBase64,
    imageStyle
  }: {
    className?: string;
    imageBase64?: string;
    imageStyle: React.CSSProperties;
  }) => {
    return (
      <div className={className} style={imageStyle}>
        {imageBase64 && <Image src={imageBase64} alt='poster' fill className='object-cover' unoptimized />}
      </div>
    );
  }
);
PosterImageFrame.displayName = "PosterImageFrame";

const PosterTitle = React.memo(({ posterTitle }: { posterTitle?: string }) => {
  if (!posterTitle) return null;
  return <p className='text-[5rem] leading-[6.4rem] font-bold text-primary'>{posterTitle}</p>;
});
PosterTitle.displayName = "PosterTitle";

const PosterCar = React.memo(({ carType }: { carType?: string }) => {
  if (!carType) return null;
  return <Image src={`/images/create/car/${carType}.png`} alt='car' fill className='object-cover' unoptimized />;
});
PosterCar.displayName = "PosterCar";
