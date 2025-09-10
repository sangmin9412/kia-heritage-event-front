import React, { useMemo } from "react";
import { useEventEnterFormStore } from "@/features/poster/store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { IcTextPlaceholder } from "@/assets/icons";

export const PosterPreview = React.memo(() => {
  return (
    <div>
      <div className='flex flex-col'>
        <div className='desktop:w-auto w-[31.5rem] desktop:mx-0 mx-auto bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)]'>
          <div className='desktop:h-[70rem] h-[39.4rem]'>
            <PosterPreviewer className='origin-top-left desktop:scale-[0.5185185185185185] scale-[0.2916666666666667]' />
          </div>
        </div>
      </div>
    </div>
  );
});
PosterPreview.displayName = "PosterPreview";

export const PosterPreviewer = ({ className }: { className?: string }) => {
  const frameType = useEventEnterFormStore(state => state.posterForm.frameType);
  const imageBase64 = useEventEnterFormStore(state => state.posterForm.imageBase64);
  const imageScale = useEventEnterFormStore(state => state.posterForm.imageScale);
  const imageVertical = useEventEnterFormStore(state => state.posterForm.imageVertical);
  const imageHorizontal = useEventEnterFormStore(state => state.posterForm.imageHorizontal);
  const carType = useEventEnterFormStore(state => state.posterForm.carType);
  const posterTitle = useEventEnterFormStore(state => state.posterForm.posterTitle);

  const imageStyle = useMemo(
    () => ({
      "--image-horizontal": `${imageHorizontal}%`,
      "--image-vertical": `${imageVertical}%`,
      "--image-scale": `${imageScale}`,
      transform: `translateX(var(--image-horizontal)) translateY(var(--image-vertical)) scale(var(--image-scale))`,
      willChange: "transform"
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
        <PosterImageFrameWrapper
          frameType='horizontal'
          imageBase64={imageBase64}
          imageStyle={imageStyle}
          className='absolute left-0 top-[24.3rem]'
        />
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
        <PosterImageFrameWrapper
          frameType='vertical'
          imageBase64={imageBase64}
          imageStyle={imageStyle}
          className='absolute right-0 top-0'
        />
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

export const PosterImageFrameWrapper = React.memo(
  ({
    frameType,
    imageBase64,
    imageStyle,
    className
  }: {
    frameType: "horizontal" | "vertical";
    imageBase64?: string;
    imageStyle: React.CSSProperties;
    className?: React.HTMLAttributes<HTMLDivElement>["className"];
  }) => {
    if (frameType === "horizontal") {
      return (
        <div className={cn("w-[90.5rem] h-[67.9rem] bg-white overflow-hidden", className)}>
          <PosterImageFrame
            className='relative w-full h-full flex items-center justify-center'
            imageBase64={imageBase64}
            imageStyle={imageStyle}
          />
          {!imageBase64 && (
            <IcTextPlaceholder className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[48rem] h-auto' />
          )}
        </div>
      );
    }

    if (frameType === "vertical") {
      return (
        <div className={cn("w-[71.5rem] h-[95.3rem] bg-white overflow-hidden z-[-1]", className)}>
          <PosterImageFrame
            className='relative w-full h-full flex items-center justify-center'
            imageBase64={imageBase64}
            imageStyle={imageStyle}
          />
          {!imageBase64 && (
            <IcTextPlaceholder className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[48rem] h-auto' />
          )}
        </div>
      );
    }
  }
);
PosterImageFrameWrapper.displayName = "PosterImageFrameWrapper";

export const PosterImageFrame = React.memo(
  ({
    className,
    imageBase64,
    imageStyle
  }: {
    className?: string;
    imageBase64?: string;
    imageStyle: React.CSSProperties;
  }) => {
    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      const image = e.currentTarget;
      const width = image.naturalWidth;
      const height = image.naturalHeight;
      if (width > height) {
        image.style.width = "auto";
        image.style.height = "100%";
      } else {
        image.style.width = "100%";
        image.style.height = "auto";
      }
      image.style.inset = "unset";
    };

    return (
      <div className={className} style={imageStyle}>
        {imageBase64 && (
          <Image
            src={imageBase64}
            alt='poster'
            className='max-w-none object-cover'
            unoptimized
            fill
            onLoad={handleImageLoad}
          />
        )}
      </div>
    );
  }
);
PosterImageFrame.displayName = "PosterImageFrame";

export const PosterTitle = React.memo(({ posterTitle }: { posterTitle?: string }) => {
  if (!posterTitle) return null;
  return <p className='text-[5rem] leading-[6.4rem] font-bold text-primary'>{posterTitle}</p>;
});
PosterTitle.displayName = "PosterTitle";

const PosterCar = React.memo(({ carType }: { carType?: string }) => {
  if (!carType) return null;
  return <Image src={`/images/create/car/${carType}.png`} alt='car' fill className='object-cover' unoptimized />;
});
PosterCar.displayName = "PosterCar";
