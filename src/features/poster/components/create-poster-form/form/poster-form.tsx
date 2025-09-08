import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { IconInfo, IconPlus, IcPencil, IcTrash } from "@/assets/icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DotItem, DotList } from "@/components/ui/dot-list";
import { FormField, FormFieldInput, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { createPosterFormSchemaType } from "@/features/poster/components/create-poster-form";
import { Option } from "@/features/poster/types";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import {
  IcSliderPositionBottom,
  IcSliderPositionLeft,
  IcSliderPositionRight,
  IcSliderPositionTop,
  IcSliderScaleDown,
  IcSliderScaleUp
} from "@/assets/icons";
import { useEventEnterFormStore } from "@/features/poster/store";
import { useAlertDialog } from "@/components/contexts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PosterFormProps {
  form: UseFormReturn<createPosterFormSchemaType>;
  frameOptions: Option[];
  carOptions: Option[];
}

export const PosterForm = ({ form, frameOptions, carOptions }: PosterFormProps) => {
  return (
    <>
      <PosterFormDesktopLayout form={form} frameOptions={frameOptions} carOptions={carOptions} />
      <PosterFormMobileLayout form={form} frameOptions={frameOptions} carOptions={carOptions} />
    </>
  );
};

const PosterFormDesktopLayout = ({ form, frameOptions, carOptions }: PosterFormProps) => {
  return (
    <div className='desktop:block hidden'>
      <Accordion type='multiple' className='w-full' defaultValue={["item-1", "item-2", "item-3", "item-4"]}>
        <AccordionItem value='item-1' className='border-0'>
          <AccordionTrigger>포토 프레임 선택</AccordionTrigger>
          <AccordionContent className='mb-[4.8rem] pt-[3.2rem] pb-[5.6rem] border-b border-border'>
            <PhotoFrame form={form} frameOptions={frameOptions} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2' className='border-0'>
          <AccordionTrigger>이미지 업로드 및 위치 조정</AccordionTrigger>
          <AccordionContent className='mb-[4.8rem] pt-[3.2rem] pb-[5.6rem] border-b border-border'>
            <UploadImage form={form} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3' className='border-0'>
          <AccordionTrigger>Kia 헤리티지 차량 선택</AccordionTrigger>
          <AccordionContent className='mb-[4.8rem] pt-[3.2rem] pb-[5.6rem] border-b border-border'>
            <SelectCar form={form} carOptions={carOptions} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-4' className='border-0'>
          <AccordionTrigger>타이틀 및 인스타그램 계정명 입력</AccordionTrigger>
          <AccordionContent className='mb-[4.8rem] pt-[3.2rem] pb-[5.6rem] border-b border-border'>
            <InputInstagramName form={form} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const PosterFormMobileLayout = ({ form, frameOptions, carOptions }: PosterFormProps) => {
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleChangeTab = useCallback((value: string) => {
    const tab = tabsRef.current?.querySelector(`[data-value="${value}"]`);
    if (tab) {
      tab.scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
    }
  }, []);

  return (
    <div className='desktop:hidden block'>
      <Tabs defaultValue='item-1' onValueChange={handleChangeTab}>
        <TabsList
          ref={tabsRef}
          className='max-w-full justify-start bg-white gap-[3.2rem] px-[3.2rem] border-b border-border overflow-x-auto scrollbar-hidden'
        >
          <TabsTrigger value='item-1' className='pt-[2.4rem] pb-[1.6rem]' data-value='item-1'>
            포토 프레임 선택
          </TabsTrigger>
          <TabsTrigger value='item-2' className='pt-[2.4rem] pb-[1.6rem]' data-value='item-2'>
            이미지 업로드 및 위치 조정
          </TabsTrigger>
          <TabsTrigger value='item-3' className='pt-[2.4rem] pb-[1.6rem]' data-value='item-3'>
            Kia 헤리티지 차량 선택
          </TabsTrigger>
          <TabsTrigger value='item-4' className='pt-[2.4rem] pb-[1.6rem]' data-value='item-4'>
            타이틀 및 인스타그램 계정명 입력
          </TabsTrigger>
        </TabsList>
        <TabsContent value='item-1' className='p-[2.4rem_3rem]'>
          <PhotoFrame form={form} frameOptions={frameOptions} />
        </TabsContent>
        <TabsContent value='item-2' className='p-[2.4rem_3rem]'>
          <UploadImage form={form} />
        </TabsContent>
        <TabsContent value='item-3' className='p-[2.4rem_3rem]'>
          <SelectCar form={form} carOptions={carOptions} />
        </TabsContent>
        <TabsContent value='item-4' className='p-[2.4rem_3rem]'>
          <InputInstagramName form={form} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ItemTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <h3
      className={cn("desktop:text-[1.8rem] text-[1.6rem] font-bold desktop:leading-[3rem] leading-[2.6rem]", className)}
    >
      {children}
    </h3>
  );
};

const ItemContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("desktop:pt-[2.4rem] pt-[1.6rem]", className)}>{children}</div>;
};

const PhotoFrame = memo(
  ({ form, frameOptions }: { form: PosterFormProps["form"]; frameOptions: PosterFormProps["frameOptions"] }) => {
    return (
      <>
        <div>
          <ItemTitle>포토 프레임을 선택해주세요.</ItemTitle>
          <ItemContent>
            <FormField
              control={form.control}
              name='frameType'
              render={({ field }) => (
                <FormItem>
                  <RadioGroup onValueChange={field.onChange} value={field.value}>
                    <div className='flex desktop:gap-[1.6rem] gap-[1.2rem]'>
                      {frameOptions.map(option => (
                        <div key={option.value}>
                          <label
                            htmlFor={option.value}
                            className='block relative desktop:w-[16.5rem] desktop:h-[20.6rem] w-[13rem] h-[16.2rem] desktop:p-[2.4rem] p-[1.6rem] bg-white border border-border data-[checked=true]:border-primary data-[checked=true]:shadow-[0_3px_6px_rgba(0,0,0,0.16)] transition-all duration-200 cursor-pointer z-0'
                            data-checked={field.value === option.value}
                          >
                            {option.value === "horizontal" && (
                              <div className='absolute inset-0 bg-[#fff] z-[-1]'>{/** 가로형 프레임 이미지 */}</div>
                            )}
                            {option.value === "vertical" && (
                              <div className='absolute inset-0 bg-[#fff] z-[-1]'>{/** 세로형 프레임 이미지 */}</div>
                            )}
                            <p className='text-[1.6rem] font-bold leading-[2.6rem]'>{option.label}</p>
                            <span className='flex absolute desktop:right-[2.4rem] desktop:bottom-[2.4rem] right-[1.6rem] bottom-[1.6rem] pointer-events-none'>
                              <RadioGroupItem
                                value={option.value}
                                id={`${option.value}`}
                                mode='checkbox'
                                className='desktop:w-[3.2rem] desktop:h-[3.2rem] w-[2.4rem] h-[2.4rem] desktop:[&_svg]:size-[1.8rem] [&_svg]:size-[1.4rem]'
                              />
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </FormItem>
              )}
            />
          </ItemContent>
        </div>

        <div className='mt-[2.4rem] desktop:p-[1.6rem_2.4rem] p-[1.6rem_0] desktop:bg-[#f8f8f8]'>
          <div className='mb-[.8rem] flex desktop:flex-row flex-row-reverse desktop:justify-start justify-end items-center desktop:gap-[.8rem] gap-[.4rem]'>
            <span>
              <IconInfo className='desktop:size-[2rem] size-[1.6rem]' />
            </span>
            <h4 className='desktop:text-[1.4rem] text-[1.3rem] font-bold desktop:leading-[2.2rem] leading-[2rem] text-sub-text'>
              프레임 선택 Tip
            </h4>
          </div>
          <div>
            <DotList className='desktop:gap-[.4rem] gap-0'>
              <DotItem className='desktop:text-[1.3rem] text-[1.2rem] desktop:leading-[2rem] [--line-height:2rem] text-sub-text'>
                선택하신 이미지와 프레임이 다를 경우, 이미지 일부가 잘릴 수 있어요.
              </DotItem>
              <DotItem className='desktop:text-[1.3rem] text-[1.2rem] desktop:leading-[2rem] [--line-height:2rem] text-sub-text'>
                이미지 구도를 확인하고 어울리는 프레임을 선택해 주세요.
              </DotItem>
            </DotList>
          </div>
        </div>
      </>
    );
  }
);
PhotoFrame.displayName = "PhotoFrame";

const UploadImage = memo(({ form }: { form: PosterFormProps["form"] }) => {
  const { open } = useAlertDialog();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageBase64 = useEventEnterFormStore(state => state.posterForm.imageBase64);
  const imageScale = useEventEnterFormStore(state => state.posterForm.imageScale) || 0;
  const imageVertical = useEventEnterFormStore(state => state.posterForm.imageVertical) || 0;
  const imageHorizontal = useEventEnterFormStore(state => state.posterForm.imageHorizontal) || 0;

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

  const handleDeleteImage = useCallback(() => {
    setImageFile(null);
    form.setValue("imageBase64", "");
  }, [form]);

  const minmaxValue = useCallback((value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  }, []);

  const handleScaleUp = useCallback(() => {
    const value = Number((imageScale + 0.1).toFixed(1));
    form.setValue("imageScale", minmaxValue(value, 0, 2));
  }, [imageScale, form, minmaxValue]);

  const handleScaleDown = useCallback(() => {
    const value = Number((imageScale - 0.1).toFixed(1));
    form.setValue("imageScale", minmaxValue(value, 0, 2));
  }, [imageScale, form, minmaxValue]);

  const handlePositionTop = useCallback(() => {
    const value = imageVertical - 1;
    form.setValue("imageVertical", minmaxValue(value, -100, 100));
  }, [imageVertical, form, minmaxValue]);

  const handlePositionBottom = useCallback(() => {
    const value = imageVertical + 1;
    form.setValue("imageVertical", minmaxValue(value, -100, 100));
  }, [imageVertical, form, minmaxValue]);

  const handlePositionLeft = useCallback(() => {
    const value = imageHorizontal - 1;
    form.setValue("imageHorizontal", minmaxValue(value, -100, 100));
  }, [imageHorizontal, form, minmaxValue]);

  const handlePositionRight = useCallback(() => {
    const value = imageHorizontal + 1;
    form.setValue("imageHorizontal", minmaxValue(value, -100, 100));
  }, [imageHorizontal, form, minmaxValue]);

  return (
    <>
      <div>
        <ItemTitle>이미지를 등록해주세요.</ItemTitle>
        <p className='mt-[.4rem] text-[1.4rem] leading-[2.2rem] text-sub-text'>JPEG, JPG, PNG 확장자만 지원합니다.</p>
        <ItemContent>
          <div className='flex gap-[1.6rem]'>
            {imageBase64 && (
              <>
                <div className='relative desktop:w-[16.5rem] desktop:h-[20.6rem] w-[13rem] h-[16.2rem] border border-border'>
                  <Image src={imageBase64} alt='uploaded-image' className='w-full h-full object-cover' fill />
                </div>
                <div className='mt-auto flex flex-col gap-[0.8rem]'>
                  <Button size='xs' variant='outline' className='border-border font-bold text-sub-text'>
                    <span>수정</span>
                    <IcPencil className='desktop:size-[2rem] size-[1.6rem]' />
                  </Button>
                  <Button
                    size='xs'
                    variant='outline'
                    onClick={handleDeleteImage}
                    className='border-border font-bold text-sub-text'
                  >
                    <span>삭제</span>
                    <IcTrash className='desktop:size-[2rem] size-[1.6rem]' />
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
                    onChange={e => {
                      // 이미지 용량 15MB 초과 검증
                      if (e.target.files?.[0] && e.target.files[0].size > 15 * 1024 * 1024) {
                        open({
                          title: "이미지 용량 초과",
                          description:
                            "이미지는 최대 15MB 이하까지 업로드하실 수 있습니다.<br /> 용량을 확인한 후 다시 시도해 주세요.",
                          onConfirm: () => {
                            e.target.value = "";
                          }
                        });
                        return;
                      }
                      setImageFile(e.target.files?.[0] || null);
                    }}
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

        <div className='mt-[2.4rem] desktop:p-[1.6rem_2.4rem] p-[1.6rem_0] desktop:bg-[#f8f8f8]'>
          <div className='mb-[.8rem] flex desktop:flex-row flex-row-reverse desktop:justify-start justify-end items-center desktop:gap-[.8rem] gap-[.4rem]'>
            <span>
              <IconInfo className='desktop:size-[2rem] size-[1.6rem]' />
            </span>
            <h4 className='desktop:text-[1.4rem] text-[1.3rem] font-bold desktop:leading-[2.2rem] leading-[2rem] text-sub-text'>
              이미지 업로드 Tip
            </h4>
          </div>
          <div>
            <DotList className='desktop:gap-[.4rem] gap-0'>
              <DotItem className='desktop:text-[1.3rem] text-[1.2rem] desktop:leading-[2rem] [--line-height:2rem] text-sub-text'>
                가로형 비율 4:3 (권장 해상도 1350*1080)
              </DotItem>
              <DotItem className='desktop:text-[1.3rem] text-[1.2rem] desktop:leading-[2rem] [--line-height:2rem] text-sub-text'>
                세로형 비율 3:4 (권장 해상도 1080*1350)
              </DotItem>
            </DotList>
          </div>
        </div>
      </div>

      <div className='desktop:mt-[4.8rem] mt-[3.2rem] desktop:pt-[4.8rem] pt-[3.2rem] border-t border-border'>
        <ItemTitle>이미지 조정</ItemTitle>
        <ItemContent>
          <div className='p-[2.4rem_3.2rem] flex flex-col gap-[4rem] border border-border'>
            <div className='flex flex-col gap-[2.4rem]'>
              <h4 className='text-[1.6rem] font-bold leading-[2.6rem]'>크기 조정</h4>
              <div className='flex items-center gap-[1.6rem] pb-[2.6rem]'>
                <ImageScaleSlider
                  form={form}
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
                    form={form}
                    handlePositionTop={handlePositionTop}
                    handlePositionBottom={handlePositionBottom}
                  />
                </div>
                <div className='flex items-center gap-[1.6rem] pb-[2.6rem]'>
                  <ImagePositionHorizontalSlider
                    form={form}
                    handlePositionLeft={handlePositionLeft}
                    handlePositionRight={handlePositionRight}
                  />
                </div>
              </div>
            </div>
          </div>
        </ItemContent>
      </div>
    </>
  );
});

const ImageScaleSlider = memo(
  ({
    form,
    imageScale,
    handleScaleDown,
    handleScaleUp
  }: {
    form: PosterFormProps["form"];
    imageScale: number;
    handleScaleDown: () => void;
    handleScaleUp: () => void;
  }) => {
    return (
      <>
        <div className='relative flex-[0_0_4rem] items-center'>
          <button className='relative w-[4rem] h-[4rem] cursor-pointer' onClick={handleScaleDown} type='button'>
            <IcSliderScaleDown className='size-[4rem]' />
            <span className='absolute top-full left-0 right-0 translate-y-[.4rem] text-[1.4rem] leading-[2.2rem] text-center'>
              축소
            </span>
          </button>
        </div>
        <Slider
          className='flex-1'
          min={0}
          max={2}
          step={0.1}
          value={[imageScale]}
          onValueChange={value => {
            form.setValue("imageScale", value[0]);
          }}
        />
        <div className='relative flex-[0_0_4rem] items-center'>
          <button className='relative w-[4rem] h-[4rem] cursor-pointer' onClick={handleScaleUp} type='button'>
            <IcSliderScaleUp className='size-[4rem]' />
            <span className='absolute top-full left-0 right-0 translate-y-[.4rem] text-[1.4rem] leading-[2.2rem] text-center'>
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
    form,
    handlePositionTop,
    handlePositionBottom
  }: {
    form: PosterFormProps["form"];
    handlePositionTop: () => void;
    handlePositionBottom: () => void;
  }) => {
    return (
      <>
        <div className='relative flex-[0_0_4rem] items-center'>
          <button className='relative w-[4rem] h-[4rem] cursor-pointer' onClick={handlePositionTop} type='button'>
            <IcSliderPositionTop className='size-[4rem]' />
            <span className='absolute top-full left-0 right-0 translate-y-[.4rem] text-[1.4rem] leading-[2.2rem] text-center'>
              상
            </span>
          </button>
        </div>
        <Slider
          min={-100}
          max={100}
          step={1}
          value={[form.watch("imageVertical")]}
          onValueChange={value => {
            form.setValue("imageVertical", value[0]);
          }}
        />
        <div className='relative flex-[0_0_4rem] items-center'>
          <button className='relative w-[4rem] h-[4rem] cursor-pointer' onClick={handlePositionBottom} type='button'>
            <IcSliderPositionBottom className='size-[4rem]' />
            <span className='absolute top-full left-0 right-0 translate-y-[.4rem] text-[1.4rem] leading-[2.2rem] text-center'>
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
    form,
    handlePositionLeft,
    handlePositionRight
  }: {
    form: PosterFormProps["form"];
    handlePositionLeft: () => void;
    handlePositionRight: () => void;
  }) => {
    return (
      <>
        <div className='relative flex-[0_0_4rem] items-center'>
          <button className='relative w-[4rem] h-[4rem] cursor-pointer' onClick={handlePositionLeft} type='button'>
            <IcSliderPositionLeft className='size-[4rem]' />
            <span className='absolute top-full left-0 right-0 translate-y-[.4rem] text-[1.4rem] leading-[2.2rem] text-center'>
              좌
            </span>
          </button>
        </div>
        <Slider
          min={-100}
          max={100}
          step={1}
          value={[form.watch("imageHorizontal")]}
          onValueChange={value => {
            form.setValue("imageHorizontal", value[0]);
          }}
        />
        <div className='relative flex-[0_0_4rem] items-center'>
          <button className='relative w-[4rem] h-[4rem] cursor-pointer' onClick={handlePositionRight} type='button'>
            <IcSliderPositionRight className='size-[4rem]' />
            <span className='absolute top-full left-0 right-0 translate-y-[.4rem] text-[1.4rem] leading-[2.2rem] text-center'>
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

const SelectCar = memo(
  ({ form, carOptions }: { form: PosterFormProps["form"]; carOptions: PosterFormProps["carOptions"] }) => {
    return (
      <div>
        <ItemTitle>Kia 80주년 기념 대표 헤리티지 차량을 선택해주세요.</ItemTitle>
        <ItemContent>
          <FormField
            control={form.control}
            name='carType'
            render={({ field }) => (
              <FormItem>
                <RadioGroup onValueChange={field.onChange} value={field.value}>
                  <div className='grid desktop:grid-cols-4 tablet:grid-cols-4 grid-cols-3 desktop:gap-[1.6rem] gap-[1rem]'>
                    {carOptions.map((option, index) => (
                      <div key={option.value + index}>
                        <div className='relative w-full h-0 pb-[100%]'>
                          <label
                            htmlFor={option.value}
                            className='flex absolute inset-0 bg-white border border-border data-[checked=true]:border-primary data-[checked=true]:shadow-[0_3px_6px_rgba(0,0,0,0.16)] transition-all duration-200 cursor-pointer z-0'
                            data-checked={field.value === option.value}
                          >
                            <div className='absolute desktop:inset-[2rem] inset-[0.8rem]'>
                              <Image
                                src={option.image as string}
                                alt='car-image'
                                className='inset-[.8rem] object-cover'
                                unoptimized
                                fill
                              />
                            </div>
                            <RadioGroupItem value={option.value} id={option.value} hidden />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </FormItem>
            )}
          />
        </ItemContent>
      </div>
    );
  }
);
SelectCar.displayName = "SelectCar";

const InputInstagramName = memo(({ form }: { form: PosterFormProps["form"] }) => {
  const posterTitle = useEventEnterFormStore(state => state.posterForm.posterTitle);
  const posterTitleLength = posterTitle?.length || 0;
  const limitLength = 20;
  const limitLengthString = limitLength.toString().padStart(2, "0");

  return (
    <>
      <div>
        <ItemTitle>포스터에 어울리는 타이틀을 입력해주세요.</ItemTitle>
        <p className='mt-[.4rem] text-[1.4rem] leading-[2.2rem] text-sub-text'>
          최대 글자수 {limitLengthString}자 이내로 작성해주세요.
        </p>
        <ItemContent className='pt-[2.4rem]'>
          <div className='relative'>
            <FormFieldInput
              form={form}
              name='posterTitle'
              placeholder='예) 나 어릴적'
              type='text'
              className='desktop:pr-[12rem] pr-[9rem] w-full h-[5.6rem] desktop:text-[1.6rem] text-[1.4rem]'
              maxLength={limitLength}
            />
            <span className='absolute inset-y-0 right-[2.4rem] flex items-center desktop:text-[1.4rem] text-[1.2rem] pointer-events-none'>
              {posterTitleLength.toString().padStart(2, "0")}/{limitLengthString} byte
            </span>
          </div>
        </ItemContent>
      </div>

      <div className='desktop:mt-[4.8rem] mt-[3.2rem] desktop:pt-[4.8rem] pt-[3.2rem] border-t border-border'>
        <ItemTitle>인스타그램 계정명을 입력해 주세요.</ItemTitle>
        <p className='mt-[.4rem] text-[1.4rem] leading-[2.2rem] text-sub-text'>
          게시물 심사를 위해 정확한 인스타그램 사용자 이름을 작성해주세요.
        </p>
        <ItemContent className='pt-[2.4rem]'>
          <div className='relative flex'>
            <label
              htmlFor='instagram-name'
              className='flex-[0_0_5.8rem] flex items-center justify-center text-[1.6rem] leading-[2.6rem] bg-[#f8f8f8] border border-border border-r-0'
            >
              @
            </label>
            <div className='flex-1'>
              <FormFieldInput
                form={form}
                name='instagramName'
                placeholder='인스타그램 계정명 입력'
                type='text'
                className='w-full h-[5.6rem] desktop:text-[1.6rem] text-[1.4rem]'
                id='instagram-name'
              />
            </div>
          </div>
        </ItemContent>
      </div>
    </>
  );
});
InputInstagramName.displayName = "InputInstagramName";
