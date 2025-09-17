import React, { useMemo } from "react";
import { useEventEnterFormStore } from "@/features/poster/store";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { IcTextPlaceholder } from "@/assets/icons";
import { frameCodesEnum } from "@/features/poster/create-poster-form/schema";

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
  const frameCode = useEventEnterFormStore(state => state.posterForm.frameCode);
  const imageBase64 = useEventEnterFormStore(state => state.posterForm.imageBase64);
  const imageScale = useEventEnterFormStore(state => state.posterForm.imageScale);
  const imageVertical = useEventEnterFormStore(state => state.posterForm.imageVertical);
  const imageHorizontal = useEventEnterFormStore(state => state.posterForm.imageHorizontal);
  const carCode = useEventEnterFormStore(state => state.posterForm.carCode);
  const title = useEventEnterFormStore(state => state.posterForm.title);
  const instagramId = useEventEnterFormStore(state => state.posterForm.instagramId);

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

  if (frameCode === frameCodesEnum.HORIZONTAL) {
    return (
      <section className={cn("relative w-[108rem] h-[135rem] bg-primary", className)}>
        <div className='absolute inset-0 pointer-events-none z-[1]'>
          <Image
            src='/images/create/poster_frame_bg_hrz.png'
            alt='frame'
            fill
            className='object-cover'
            unoptimized
            priority
          />
        </div>
        <PosterImageFrameWrapper
          frameCode={frameCodesEnum.HORIZONTAL}
          imageBase64={imageBase64}
          imageStyle={imageStyle}
          className='absolute left-0 top-0'
        />

        <div className='absolute left-0 top-[65rem] w-full h-[13rem] bg-[linear-gradient(180deg,rgba(5,20,31,0)0%,rgba(5,20,31,0.77)41.52%,#05141F_95%)]'></div>

        <div className='absolute left-[50%] translate-x-[-50%] bottom-[16rem] w-[30rem] h-[18rem]'>
          <PosterCar carCode={carCode} />
        </div>
        <div className='absolute left-0 bottom-[42.6rem] w-full flex flex-col gap-[2.9rem] items-center justify-center whitespace-normal'>
          <PosterTitle title={title} />
        </div>
        <div className='absolute left-0 bottom-[4.8rem] w-full flex justify-center items-center text-center'>
          <PosterInstagramId instagramId={instagramId} />
        </div>
      </section>
    );
  }

  if (frameCode === frameCodesEnum.VERTICAL) {
    return (
      <section className={cn("relative w-[108rem] h-[135rem] bg-primary z-[0]", className)}>
        <div className='absolute inset-0 pointer-events-none z-[1]'>
          <Image
            src='/images/create/poster_frame_bg_vtc.png'
            alt='frame'
            fill
            className='object-cover'
            unoptimized
            priority
          />
        </div>
        <PosterImageFrameWrapper
          frameCode={frameCodesEnum.VERTICAL}
          imageBase64={imageBase64}
          imageStyle={imageStyle}
          className='absolute left-0 top-0'
        />

        <div className='absolute left-0 bottom-0 w-full h-[55.6rem] bg-[linear-gradient(180deg,rgba(5,20,31,0)0%,rgba(5,20,31,0.6)25%,#05141F_100%)]'></div>

        <div className='absolute left-[50%] translate-x-[-50%] bottom-[16rem] w-[30rem] aspect-[300/180]'>
          <PosterCar carCode={carCode} />
        </div>
        <div className='absolute left-0 bottom-[42.6rem] w-full flex flex-col gap-[2.9rem] items-center justify-center whitespace-normal'>
          <PosterTitle title={title} />
        </div>
        <div className='absolute left-0 bottom-[4.8rem] w-full flex justify-center items-center text-center'>
          <PosterInstagramId instagramId={instagramId} />
        </div>
      </section>
    );
  }

  return <></>;
};

export const PosterImageFrameWrapper = React.memo(
  ({
    frameCode,
    imageBase64,
    imageStyle,
    className
  }: {
    frameCode: keyof typeof frameCodesEnum;
    imageBase64?: string;
    imageStyle: React.CSSProperties;
    className?: React.HTMLAttributes<HTMLDivElement>["className"];
  }) => {
    if (frameCode === frameCodesEnum.HORIZONTAL) {
      return (
        <div className={cn("w-full h-full max-h-[76rem] bg-white overflow-hidden", className)}>
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

    if (frameCode === frameCodesEnum.VERTICAL) {
      return (
        <div className={cn("w-full h-full bg-white overflow-hidden", className)}>
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
        image.style.minWidth = "100%";
        image.style.height = "100%";
      } else {
        image.style.height = "auto";
        image.style.minHeight = "100%";
        image.style.width = "100%";
      }
      image.style.opacity = "1";
    };

    return (
      <div className={className} style={imageStyle}>
        {imageBase64 && (
          <img
            src={imageBase64}
            alt='poster'
            className='max-w-none absolute object-cover opacity-0'
            onLoad={handleImageLoad}
          />
        )}
      </div>
    );
  }
);
PosterImageFrame.displayName = "PosterImageFrame";

export const PosterTitle = React.memo(({ title }: { title?: string }) => {
  const titleText = !title ? "문구를 작성해 주세요" : title;
  return <p className='text-[7.2rem] leading-[7rem] font-bold text-white text-center whitespace-nowrap text-shadow-[4px_4px_10px_rgba(5,20,31,0.6)]'>{titleText}</p>;
});
PosterTitle.displayName = "PosterTitle";

const PosterCar = React.memo(({ carCode }: { carCode?: string }) => {
  if (!carCode) return null;
  return (
    <Image
      src={`/images/create/car/${carCode ? carCode : "temp_car"}.png`}
      alt='car'
      fill
      className='object-cover'
      unoptimized
    />
  );
});
PosterCar.displayName = "PosterCar";

const PosterInstagramId = React.memo(({ instagramId }: { instagramId?: string }) => {
  return (
    <p className='text-[3.2rem] leading-[3.8rem] font-[300] text-white text-center whitespace-nowrap'>
      {instagramId ? `@ ${instagramId}` : "@ kia.kor"}
    </p>
  );
});
PosterInstagramId.displayName = "PosterInstagramId";
