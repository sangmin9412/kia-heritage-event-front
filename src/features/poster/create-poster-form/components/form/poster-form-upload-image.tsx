"use client";

import {
  IconInfo,
  IconPlus,
  IcPencil,
  IcRefresh,
  IcSliderPositionBottom,
  IcSliderPositionLeft,
  IcSliderPositionRight,
  IcSliderPositionTop,
  IcSliderScaleDown,
  IcSliderScaleUp,
  IcTrash
} from "@/assets/icons";
import { useAlertDialog } from "@/components/contexts";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DotItem, DotList } from "@/components/ui/dot-list";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  ItemContent,
  ItemTitle,
  PosterFormProps
} from "@/features/poster/create-poster-form/components/form/poster-form";
import { PosterImageFrameWrapper } from "@/features/poster/create-poster-form/components/form/poster-preview";
import { frameCodesEnum } from "@/features/poster/create-poster-form/schema";
import { useEventEnterFormStore, useEventEnterFormStoreInitialState } from "@/features/poster/store";
import { cn, minmaxValue } from "@/lib/utils";
import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

export const UploadImage = memo(({ form }: { form: PosterFormProps["form"] }) => {
  const { open } = useAlertDialog();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageBase64 = useEventEnterFormStore(state => state.posterForm.imageBase64) || "";
  const imageScale = useEventEnterFormStore(state => state.posterForm.imageScale) || 0;
  const imageVertical = useEventEnterFormStore(state => state.posterForm.imageVertical) || 0;
  const imageHorizontal = useEventEnterFormStore(state => state.posterForm.imageHorizontal) || 0;
  const frameCode =
    useEventEnterFormStore(state => state.posterForm.frameCode) ||
    useEventEnterFormStoreInitialState.posterForm.frameCode;

  const isImageFile = useMemo(() => imageFile && imageFile instanceof File, [imageFile]);

  useEffect(() => {
    if (isImageFile && imageFile) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);
      fileReader.onload = () => {
        form.setValue("imageBase64", fileReader.result as string);
      };
    }
  }, [imageFile, form, isImageFile]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // 이미지 용량 15MB 초과 검증
      if (e.target.files?.[0] && e.target.files[0].size > 15 * 1024 * 1024) {
        open({
          title: "이미지 용량 초과",
          description: "이미지는 최대 15MB 이하까지 업로드하실 수 있습니다.<br /> 용량을 확인한 후 다시 시도해 주세요.",
          onConfirm: () => {
            e.target.value = "";
          }
        });
        return;
      }
      setImageFile(e.target.files?.[0] || null);
    },
    [open]
  );

  const handleDeleteImage = useCallback(() => {
    setImageFile(null);
    form.setValue("imageBase64", "");
  }, [form]);

  return (
    <>
      <UploadImageFormDesktop
        form={form}
        imageBase64={imageBase64 || ""}
        imageScale={imageScale}
        imageVertical={imageVertical}
        imageHorizontal={imageHorizontal}
        handleDeleteImage={handleDeleteImage}
        handleFileChange={handleFileChange}
      />
      <UploadImageFormMobile
        form={form}
        imageBase64={imageBase64 || ""}
        imageScale={imageScale}
        imageVertical={imageVertical}
        imageHorizontal={imageHorizontal}
        frameCode={frameCode}
        handleDeleteImage={handleDeleteImage}
        handleFileChange={handleFileChange}
      />
    </>
  );
});

const UploadImageFormDesktop = ({
  form,
  imageBase64,
  imageScale,
  imageVertical,
  imageHorizontal,
  handleDeleteImage,
  handleFileChange
}: {
  form: PosterFormProps["form"];
  imageBase64: string;
  imageScale: number;
  imageVertical: number;
  imageHorizontal: number;
  handleDeleteImage: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const handleScaleChange = useCallback(
    (value: number) => {
      form.setValue("imageScale", value);
    },
    [form]
  );
  const handlePositionVerticalChange = useCallback(
    (value: number) => {
      form.setValue("imageVertical", value);
    },
    [form]
  );
  const handlePositionHorizontalChange = useCallback(
    (value: number) => {
      form.setValue("imageHorizontal", value);
    },
    [form]
  );

  const handleScaleUp = useCallback(() => {
    const value = Number((imageScale + 0.1).toFixed(1));
    form.setValue("imageScale", minmaxValue(value, 0.5, 2));
  }, [imageScale, form]);

  const handleScaleDown = useCallback(() => {
    const value = Number((imageScale - 0.1).toFixed(1));
    form.setValue("imageScale", minmaxValue(value, 0.5, 2));
  }, [imageScale, form]);

  const handlePositionTop = useCallback(() => {
    const value = imageVertical - 1;
    form.setValue("imageVertical", minmaxValue(value, -100, 100));
  }, [imageVertical, form]);

  const handlePositionBottom = useCallback(() => {
    const value = imageVertical + 1;
    form.setValue("imageVertical", minmaxValue(value, -100, 100));
  }, [imageVertical, form]);

  const handlePositionLeft = useCallback(() => {
    const value = imageHorizontal - 1;
    form.setValue("imageHorizontal", minmaxValue(value, -100, 100));
  }, [imageHorizontal, form]);

  const handlePositionRight = useCallback(() => {
    const value = imageHorizontal + 1;
    form.setValue("imageHorizontal", minmaxValue(value, -100, 100));
  }, [imageHorizontal, form]);

  const handleImagePositionReset = useCallback(() => {
    form.setValue("imageScale", useEventEnterFormStoreInitialState.posterForm.imageScale);
    form.setValue("imageVertical", useEventEnterFormStoreInitialState.posterForm.imageVertical);
    form.setValue("imageHorizontal", useEventEnterFormStoreInitialState.posterForm.imageHorizontal);
  }, [form]);

  return (
    <div className='desktop:block hidden'>
      <div>
        <ItemTitle>이미지를 등록해주세요.</ItemTitle>
        <p className='mt-[.4rem] text-[1.4rem] leading-[2.2rem] text-sub-text'>JPEG, JPG, PNG 확장자만 지원합니다.</p>
        <ItemContent>
          <div className='flex gap-[1.6rem]'>
            {imageBase64 && (
              <>
                <div className='relative w-[16.5rem] h-[20.6rem] border border-border'>
                  <Image
                    src={imageBase64}
                    alt='uploaded-image'
                    className='w-full h-full object-contain'
                    fill
                    unoptimized
                  />
                </div>
                <div className='mt-auto flex flex-col gap-[0.8rem]'>
                  <Button
                    size='xs'
                    variant='outline'
                    onClick={handleDeleteImage}
                    className='border-border font-bold text-sub-text'
                  >
                    <span>삭제</span>
                    <IcTrash className='size-[2rem]' />
                  </Button>
                </div>
              </>
            )}
            {!imageBase64 && (
              <div className='w-[16.5rem] h-[20.6rem]'>
                <label
                  htmlFor='image-file'
                  className='relative flex items-center justify-center w-full h-full bg-white border border-border cursor-pointer'
                >
                  <Input
                    type='file'
                    accept='image/jpeg, image/jpg, image/png'
                    onChange={handleFileChange}
                    id='image-file'
                    className='hidden'
                  />
                  <span>
                    <IconPlus />
                  </span>
                </label>
              </div>
            )}
          </div>
        </ItemContent>

        <div className='mt-[2.4rem] p-[1.6rem_2.4rem] bg-[#f8f8f8]'>
          <div className='mb-[.8rem] flex flex-row justify-start items-center gap-[.8rem]'>
            <span>
              <IconInfo className='size-[2rem]' />
            </span>
            <h4 className='text-[1.4rem] font-bold leading-[2.2rem] text-sub-text'>이미지 업로드 Tip</h4>
          </div>
          <div>
            <DotList className='gap-[.4rem]'>
              <DotItem className='text-[1.3rem] leading-[2rem] [--line-height:2rem] text-sub-text'>
                가로형 비율 4:3 (권장 해상도 1350*1080)
              </DotItem>
              <DotItem className='text-[1.3rem] leading-[2rem] [--line-height:2rem] text-sub-text'>
                세로형 비율 3:4 (권장 해상도 1080*1350)
              </DotItem>
              <DotItem className='text-[1.3rem] leading-[2rem] [--line-height:2rem] text-sub-text'>
                이미지 용량 제한 : 최대 15MB
              </DotItem>
            </DotList>
          </div>
        </div>
      </div>

      <div className='relative desktop:mt-[4.8rem] mt-[3.2rem] desktop:pt-[4.8rem] pt-[3.2rem] border-t border-border'>
        <ItemTitle>이미지 조정</ItemTitle>
        <p className='mt-[.4rem] text-[1.4rem] leading-[2.2rem] text-sub-text'>
          이미지가 보이지 않을 경우 &apos;초기화&apos; 버튼을 눌러주세요.
        </p>
        <div className='absolute desktop:top-[7.2rem] top-[6rem] right-0'>
          <Button
            size='xs'
            variant='outline'
            className='border-border font-bold text-sub-text'
            onClick={handleImagePositionReset}
          >
            <span>초기화</span>
            <IcRefresh className='size-[1.6rem]' />
          </Button>
        </div>
        <ItemContent>
          <div className='p-[2.4rem_3.2rem] flex flex-col gap-[4rem] border border-border'>
            <div className='flex flex-col gap-[2.4rem]'>
              <h4 className='text-[1.6rem] font-bold leading-[2.6rem]'>크기 조정</h4>
              <div className='flex items-center gap-[1.6rem] pb-[2.6rem]'>
                <ImageScaleSlider
                  setValue={handleScaleChange}
                  imageScale={imageScale}
                  handleScaleDown={handleScaleDown}
                  handleScaleUp={handleScaleUp}
                />
              </div>
            </div>

            <div className='flex flex-col gap-[2.4rem]'>
              <h4 className='text-[1.6rem] font-bold leading-[2.6rem]'>위치 조정</h4>
              <div className='flex flex-col gap-[4rem]'>
                <div className='flex items-center gap-[1.6rem] pb-[2.6rem]'>
                  <ImagePositionVerticalSlider
                    setValue={handlePositionVerticalChange}
                    imageVertical={imageVertical}
                    handlePositionTop={handlePositionTop}
                    handlePositionBottom={handlePositionBottom}
                  />
                </div>
                <div className='flex items-center gap-[1.6rem] pb-[2.6rem]'>
                  <ImagePositionHorizontalSlider
                    setValue={handlePositionHorizontalChange}
                    imageHorizontal={imageHorizontal}
                    handlePositionLeft={handlePositionLeft}
                    handlePositionRight={handlePositionRight}
                  />
                </div>
              </div>
            </div>
          </div>
        </ItemContent>
      </div>
    </div>
  );
};

const UploadImageFormMobile = ({
  form,
  imageBase64,
  imageScale,
  imageVertical,
  imageHorizontal,
  frameCode,
  handleDeleteImage,
  handleFileChange
}: {
  form: PosterFormProps["form"];
  imageBase64: string;
  imageScale: number;
  imageVertical: number;
  imageHorizontal: number;
  frameCode: keyof typeof frameCodesEnum;
  handleDeleteImage: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  const handleOpenImageDialog = useCallback(() => {
    setImageDialogOpen(true);
  }, []);

  const handleCloseImageDialog = useCallback(() => {
    setImageDialogOpen(false);
  }, []);

  return (
    <div className='desktop:hidden block'>
      <div>
        <ItemTitle>이미지를 등록해주세요.</ItemTitle>
        <p className='mt-[.4rem] text-[1.4rem] leading-[2.2rem] text-sub-text'>JPEG, JPG, PNG 확장자만 지원합니다.</p>
        <ItemContent>
          <div className='flex gap-[1.6rem]'>
            {imageBase64 && (
              <>
                <div className='relative w-[13rem] h-[16.2rem] border border-border'>
                  <Image
                    src={imageBase64}
                    alt='uploaded-image'
                    className='w-full h-full object-contain'
                    fill
                    unoptimized
                  />
                </div>
                <div className='mt-auto flex flex-col gap-[0.8rem]'>
                  <Button
                    size='xs'
                    variant='outline'
                    className='border-border font-bold text-sub-text'
                    onClick={handleOpenImageDialog}
                  >
                    <span>수정</span>
                    <IcPencil className='size-[1.6rem]' />
                  </Button>
                  <Button
                    size='xs'
                    variant='outline'
                    onClick={handleDeleteImage}
                    className='border-border font-bold text-sub-text'
                  >
                    <span>삭제</span>
                    <IcTrash className='size-[1.6rem]' />
                  </Button>
                </div>
              </>
            )}
            {!imageBase64 && (
              <>
                <div className='w-[13rem] h-[16.2rem]'>
                  <button
                    className='relative flex items-center justify-center w-full h-full bg-white border border-border cursor-pointer'
                    onClick={handleOpenImageDialog}
                  >
                    <span>
                      <IconPlus className='size-[2.4rem]' />
                    </span>
                  </button>
                </div>
              </>
            )}
            <UploadImageDialog
              open={imageDialogOpen}
              onClose={handleCloseImageDialog}
              form={form}
              imageScale={imageScale}
              imageVertical={imageVertical}
              imageHorizontal={imageHorizontal}
              frameCode={frameCode}
              imageBase64={imageBase64}
              handleFileChange={handleFileChange}
            />
          </div>
        </ItemContent>

        <div className='mt-[2.4rem] p-[1.6rem_0]'>
          <div className='mb-[.8rem] flex flex-row-reverse justify-end items-center gap-[.4rem]'>
            <span>
              <IconInfo className='size-[1.6rem]' />
            </span>
            <h4 className='text-[1.3rem] font-bold leading-[2rem] text-sub-text'>이미지 업로드 Tip</h4>
          </div>
          <div>
            <DotList className='gap-0'>
              <DotItem className='text-[1.2rem] leading-[2rem] [--line-height:2rem] text-sub-text'>
                가로형 비율 4:3 (권장 해상도 1350*1080)
              </DotItem>
              <DotItem className='text-[1.2rem] leading-[2rem] [--line-height:2rem] text-sub-text'>
                세로형 비율 3:4 (권장 해상도 1080*1350)
              </DotItem>
            </DotList>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageScaleSlider = memo(
  ({
    setValue,
    imageScale,
    handleScaleDown,
    handleScaleUp
  }: {
    setValue: (value: number) => void;
    imageScale: number;
    handleScaleDown: () => void;
    handleScaleUp: () => void;
  }) => {
    const handleSliderChange = useCallback(
      (value: number[]) => {
        setValue(value[0]);
      },
      [setValue]
    );

    return (
      <>
        <div className='relative flex-[0_0_4rem] items-center'>
          <button className='relative flex w-[4rem] h-[4rem] cursor-pointer' onClick={handleScaleDown} type='button'>
            <IcSliderScaleDown className='size-[4rem]' />
            <span className='absolute top-full left-0 right-0 translate-y-[.4rem] desktop:text-[1.4rem] desktop:leading-[2.2rem] text-[1.2rem] leading-[2rem] text-center'>
              축소
            </span>
          </button>
        </div>
        <Slider
          className='flex-1'
          min={0.5}
          max={2}
          step={0.1}
          value={[imageScale]}
          onValueChange={handleSliderChange}
        />
        <div className='relative flex-[0_0_4rem] items-center'>
          <button className='relative flex w-[4rem] h-[4rem] cursor-pointer' onClick={handleScaleUp} type='button'>
            <IcSliderScaleUp className='size-[4rem]' />
            <span className='absolute top-full left-0 right-0 translate-y-[.4rem] desktop:text-[1.4rem] desktop:leading-[2.2rem] text-[1.2rem] leading-[1.8rem] text-center'>
              확대
            </span>
          </button>
        </div>
      </>
    );
  }
);

const ImagePositionVerticalSlider = memo(
  ({
    setValue,
    imageVertical,
    handlePositionTop,
    handlePositionBottom
  }: {
    setValue: (value: number) => void;
    imageVertical: number;
    handlePositionTop: () => void;
    handlePositionBottom: () => void;
  }) => {
    const handleSliderChange = useCallback(
      (value: number[]) => {
        setValue(value[0]);
      },
      [setValue]
    );

    return (
      <>
        <div className='relative flex-[0_0_4rem] items-center'>
          <button className='relative flex w-[4rem] h-[4rem] cursor-pointer' onClick={handlePositionTop} type='button'>
            <IcSliderPositionTop className='size-[4rem]' />
            <span className='absolute top-full left-0 right-0 translate-y-[.4rem] desktop:text-[1.4rem] desktop:leading-[2.2rem] text-[1.2rem] leading-[1.8rem] text-center'>
              상
            </span>
          </button>
        </div>
        <Slider min={-100} max={100} step={1} value={[imageVertical]} onValueChange={handleSliderChange} />
        <div className='relative flex-[0_0_4rem] items-center'>
          <button
            className='relative flex w-[4rem] h-[4rem] cursor-pointer'
            onClick={handlePositionBottom}
            type='button'
          >
            <IcSliderPositionBottom className='size-[4rem]' />
            <span className='absolute top-full left-0 right-0 translate-y-[.4rem] desktop:text-[1.4rem] desktop:leading-[2.2rem] text-[1.2rem] leading-[1.8rem] text-center'>
              하
            </span>
          </button>
        </div>
      </>
    );
  }
);

const ImagePositionHorizontalSlider = memo(
  ({
    setValue,
    imageHorizontal,
    handlePositionLeft,
    handlePositionRight
  }: {
    setValue: (value: number) => void;
    imageHorizontal: number;
    handlePositionLeft: () => void;
    handlePositionRight: () => void;
  }) => {
    const handleSliderChange = useCallback(
      (value: number[]) => {
        setValue(value[0]);
      },
      [setValue]
    );

    return (
      <>
        <div className='relative flex-[0_0_4rem] items-center'>
          <button className='relative flex w-[4rem] h-[4rem] cursor-pointer' onClick={handlePositionLeft} type='button'>
            <IcSliderPositionLeft className='size-[4rem]' />
            <span className='absolute top-full left-0 right-0 translate-y-[.4rem] desktop:text-[1.4rem] desktop:leading-[2.2rem] text-[1.2rem] leading-[1.8rem] text-center'>
              좌
            </span>
          </button>
        </div>
        <Slider min={-100} max={100} step={1} value={[imageHorizontal]} onValueChange={handleSliderChange} />
        <div className='relative flex-[0_0_4rem] items-center'>
          <button
            className='relative flex w-[4rem] h-[4rem] cursor-pointer'
            onClick={handlePositionRight}
            type='button'
          >
            <IcSliderPositionRight className='size-[4rem]' />
            <span className='absolute top-full left-0 right-0 translate-y-[.4rem] desktop:text-[1.4rem] desktop:leading-[2.2rem] text-[1.2rem] leading-[1.8rem] text-center'>
              우
            </span>
          </button>
        </div>
      </>
    );
  }
);
ImageScaleSlider.displayName = "ImageScaleSlider";
ImagePositionVerticalSlider.displayName = "ImagePositionVerticalSlider";
ImagePositionHorizontalSlider.displayName = "ImagePositionHorizontalSlider";
UploadImage.displayName = "UploadImage";

const UploadImageDialog = memo(
  ({
    open,
    onClose,
    form,
    imageScale,
    imageVertical,
    imageHorizontal,
    frameCode,
    imageBase64,
    handleFileChange
  }: {
    open: boolean;
    onClose: () => void;
    form: PosterFormProps["form"];
    imageScale: number;
    imageVertical: number;
    imageHorizontal: number;
    frameCode: keyof typeof frameCodesEnum;
    imageBase64: string;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => {
    const [imageState, setImageState] = useState({
      imageScale,
      imageVertical,
      imageHorizontal
    });

    const imageStyle = useMemo(
      () => ({
        "--image-horizontal": `${imageState.imageHorizontal}%`,
        "--image-vertical": `${imageState.imageVertical}%`,
        "--image-scale": `${imageState.imageScale}`,
        transform: `translateX(var(--image-horizontal)) translateY(var(--image-vertical)) scale(var(--image-scale))`,
        willChange: "transform"
      }),
      [imageState]
    );

    const minmaxValue = useCallback((value: number, min: number, max: number) => {
      return Math.min(Math.max(value, min), max);
    }, []);

    const handleScaleChange = useCallback(
      (value: number) => {
        setImageState({ ...imageState, imageScale: value });
      },
      [imageState]
    );
    const handlePositionVerticalChange = useCallback(
      (value: number) => {
        setImageState({ ...imageState, imageVertical: value });
      },
      [imageState]
    );
    const handlePositionHorizontalChange = useCallback(
      (value: number) => {
        setImageState({ ...imageState, imageHorizontal: value });
      },
      [imageState]
    );

    const handleScaleUp = useCallback(() => {
      const value = Number((imageState.imageScale + 0.1).toFixed(1));
      setImageState({ ...imageState, imageScale: minmaxValue(value, 0.5, 2) });
    }, [imageState, minmaxValue]);

    const handleScaleDown = useCallback(() => {
      const value = Number((imageState.imageScale - 0.1).toFixed(1));
      setImageState({ ...imageState, imageScale: minmaxValue(value, 0.5, 2) });
    }, [imageState, minmaxValue]);

    const handlePositionTop = useCallback(() => {
      const value = imageState.imageVertical - 1;
      setImageState({ ...imageState, imageVertical: minmaxValue(value, -100, 100) });
    }, [imageState, minmaxValue]);

    const handlePositionBottom = useCallback(() => {
      const value = imageState.imageVertical + 1;
      setImageState({ ...imageState, imageVertical: minmaxValue(value, -100, 100) });
    }, [imageState, minmaxValue]);

    const handlePositionLeft = useCallback(() => {
      const value = imageState.imageHorizontal - 1;
      setImageState({ ...imageState, imageHorizontal: minmaxValue(value, -100, 100) });
    }, [imageState, minmaxValue]);

    const handlePositionRight = useCallback(() => {
      const value = imageState.imageHorizontal + 1;
      setImageState({ ...imageState, imageHorizontal: minmaxValue(value, -100, 100) });
    }, [imageState, minmaxValue]);

    const handleImagePositionReset = useCallback(() => {
      setImageState({
        imageScale: useEventEnterFormStoreInitialState.posterForm.imageScale,
        imageVertical: useEventEnterFormStoreInitialState.posterForm.imageVertical,
        imageHorizontal: useEventEnterFormStoreInitialState.posterForm.imageHorizontal
      });
    }, [setImageState]);

    const handleComplete = useCallback(() => {
      onClose();
      form.setValue("imageScale", imageState.imageScale);
      form.setValue("imageVertical", imageState.imageVertical);
      form.setValue("imageHorizontal", imageState.imageHorizontal);
    }, [imageState, form, onClose]);

    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className='max-w-none w-full h-full flex flex-col gap-[1.6rem] px-0 pb-0'>
          <DialogHeader className='flex-[0_0_auto]'>
            <DialogTitle>이미지 조정</DialogTitle>
          </DialogHeader>
          <DialogDescription className='sr-only'>이미지 조정</DialogDescription>
          <div className='flex-1 flex flex-col overflow-hidden'>
            <div className='overflow-y-auto custom-scrollbar'>
              <div className='flex justify-between items-center px-[3rem] pb-[1.6rem]'>
                <p className='mt-[.4rem] text-[1.4rem] leading-[2.2rem] text-sub-text'>
                  이미지가 보이지 않을 경우, <br />
                  &apos;초기화&apos; 버튼을 눌러주세요.
                </p>
                <Button
                  size='xs'
                  variant='outline'
                  className='border-border font-bold text-sub-text'
                  onClick={handleImagePositionReset}
                >
                  <span>초기화</span>
                  <IcRefresh className='size-[1.6rem]' />
                </Button>
              </div>
              <div className='tablet:aspect-auto aspect-square tablet:py-[4.8rem] py-0 px-[3rem] flex items-center justify-center bg-[#f1f1f1] overflow-hidden'>
                {imageBase64 && (
                  <div
                    className={cn(
                      "relative w-[31.5rem] before:absolute before:inset-0 before:border-[2px] before:border-border before:z-[1] before:pointer-events-none",
                      frameCode === frameCodesEnum.HORIZONTAL && "aspect-[1080/760]",
                      frameCode === frameCodesEnum.VERTICAL && "aspect-square"
                    )}
                  >
                    <PosterImageFrameWrapper
                      frameCode={frameCode}
                      imageBase64={imageBase64}
                      imageStyle={imageStyle}
                      className='shrink-0 z-[1]'
                    />
                  </div>
                )}
                {!imageBase64 && (
                  <div className='w-[13rem] h-[16.2rem]'>
                    <label
                      htmlFor='image-file'
                      className='relative flex items-center justify-center w-full h-full bg-white border border-border cursor-pointer'
                    >
                      <Input
                        type='file'
                        accept='image/jpeg, image/jpg, image/png'
                        onChange={handleFileChange}
                        id='image-file'
                        className='hidden'
                      />
                      <span>
                        <IconPlus className='size-[2.4rem]' />
                      </span>
                    </label>
                  </div>
                )}
              </div>

              <div className='p-[2.4rem_3rem]'>
                <ItemTitle className='sr-only'>이미지 조정</ItemTitle>
                <div className='flex flex-col gap-[3.2rem]'>
                  <div className='flex flex-col gap-[1.6rem]'>
                    <h4 className='text-[1.4rem] font-bold leading-[2.2rem]'>크기 조정</h4>
                    <div className='flex items-center gap-[1.6rem] pb-[2.6rem]'>
                      <ImageScaleSlider
                        setValue={handleScaleChange}
                        imageScale={imageState.imageScale}
                        handleScaleDown={handleScaleDown}
                        handleScaleUp={handleScaleUp}
                      />
                    </div>
                  </div>

                  <div className='flex flex-col gap-[1.6rem]'>
                    <h4 className='text-[1.4rem] font-bold leading-[2.2rem]'>위치 조정</h4>
                    <div className='flex flex-col gap-[4rem]'>
                      <div className='flex items-center gap-[1.6rem] pb-[2.6rem]'>
                        <ImagePositionVerticalSlider
                          setValue={handlePositionVerticalChange}
                          imageVertical={imageState.imageVertical}
                          handlePositionTop={handlePositionTop}
                          handlePositionBottom={handlePositionBottom}
                        />
                      </div>
                      <div className='flex items-center gap-[1.6rem] pb-[2.6rem]'>
                        <ImagePositionHorizontalSlider
                          setValue={handlePositionHorizontalChange}
                          imageHorizontal={imageState.imageHorizontal}
                          handlePositionLeft={handlePositionLeft}
                          handlePositionRight={handlePositionRight}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='p-[1.6rem] border-t border-border'>
              <Button className='w-full' variant='outline' onClick={handleComplete}>
                완료
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);
UploadImageDialog.displayName = "UploadImageDialog";
