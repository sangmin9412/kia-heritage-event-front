import { useCallback, useEffect, useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { IconInfo, IconPlus } from "@/assets/icons";
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
} from "@/assets/icons/ic-slider";

interface PosterFormProps {
  form: UseFormReturn<createPosterFormSchemaType>;
  frameOptions: Option[];
  carOptions: Option[];
}

export const PosterForm = ({ form, frameOptions, carOptions }: PosterFormProps) => {
  return (
    <div>
      <Accordion type='multiple' className='w-full' defaultValue={["item-1", "item-2", "item-3", "item-4"]}>
        <AccordionItem value='item-1' className='border-0'>
          <AccordionTrigger>포토 프레임</AccordionTrigger>
          <AccordionContent className='mb-[2.4rem] pt-[3.2rem] pb-[5.6rem] border-b border-border'>
            <PhotoFrame form={form} frameOptions={frameOptions} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2' className='border-0'>
          <AccordionTrigger>이미지 업로드 및 위치 조정</AccordionTrigger>
          <AccordionContent className='mb-[2.4rem] pt-[3.2rem] pb-[5.6rem] border-b border-border'>
            <UploadImage form={form} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-3' className='border-0'>
          <AccordionTrigger>Kia 헤리티지 차량 선택</AccordionTrigger>
          <AccordionContent className='mb-[2.4rem] pt-[3.2rem] pb-[5.6rem] border-b border-border'>
            <SelectCar form={form} carOptions={carOptions} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-4' className='border-0'>
          <AccordionTrigger>포스터 타이틀 및 인스타그램 계정명 입력</AccordionTrigger>
          <AccordionContent className='mb-[2.4rem] pt-[3.2rem] pb-[5.6rem] border-b border-border'>
            <InputInstagramName form={form} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const ItemTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <h3 className={cn("text-[1.8rem] font-bold leading-[3rem]", className)}>{children}</h3>;
};

const ItemContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("pt-[2.4rem]", className)}>{children}</div>;
};

const PhotoFrame = ({
  form,
  frameOptions
}: {
  form: PosterFormProps["form"];
  frameOptions: PosterFormProps["frameOptions"];
}) => {
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
                  <div className='flex gap-[1.6rem]'>
                    {frameOptions.map(option => (
                      <div key={option.value}>
                        <label
                          htmlFor={option.value}
                          className='block relative w-[16.5rem] h-[20.6rem] p-[2.4rem] bg-white border border-border data-[checked=true]:border-primary cursor-pointer z-0'
                          data-checked={field.value === option.value}
                        >
                          {option.value === "horizontal" && (
                            <div className='absolute inset-[4rem_0] bg-[#f8f8f8] z-[-1]'>
                              {/** 가로형 프레임 이미지 */}
                            </div>
                          )}
                          {option.value === "vertical" && (
                            <div className='absolute inset-0 bg-[#f8f8f8] z-[-1]'>{/** 세로형 프레임 이미지 */}</div>
                          )}
                          <p className='text-[1.6rem] font-bold leading-[2.6rem]'>{option.label}</p>
                          <span className='flex absolute right-[2.4rem] bottom-[2.4rem] pointer-events-none'>
                            <RadioGroupItem
                              value={option.value}
                              id={`${option.value}`}
                              mode='checkbox'
                              className='w-[3.2rem] h-[3.2rem] [&_svg]:size-[1.8rem]'
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

      <div className='mt-[2.4rem] p-[2.4rem_3.2rem] bg-[#f8f8f8]'>
        <div className='mb-[1.2rem] flex items-center gap-[1.2rem]'>
          <span>
            <IconInfo />
          </span>
          <h4 className='text-[1.6rem] font-bold leading-[2.6rem] text-sub-text'>프레임 선택 Tip</h4>
        </div>
        <div>
          <DotList className='gap-[.4rem]'>
            <DotItem className='text-[1.6rem] leading-[2.6rem] [--line-height:2.6rem]'>
              선택하신 이미지와 프레임이 다를 경우, 이미지 일부가 잘릴 수 있어요.
            </DotItem>
            <DotItem className='text-[1.6rem] leading-[2.6rem] [--line-height:2.6rem]'>
              이미지 구도를 확인하고 어울리는 프레임을 선택해 주세요.
            </DotItem>
          </DotList>
        </div>
      </div>
    </>
  );
};

const UploadImage = ({ form }: { form: PosterFormProps["form"] }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageBase64 = form.watch("imageBase64");
  const imageScale = form.watch("imageScale");
  const imageVertical = form.watch("imageVertical");
  const imageHorizontal = form.watch("imageHorizontal");

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
              <div className='relative w-[16.5rem] h-[20.6rem] border border-border'>
                <Image src={imageBase64} alt='uploaded-image' className='w-full h-full object-cover' fill />
                <span className='absolute top-0 right-0'>
                  <Button onClick={handleDeleteImage} className='px-[1rem] h-[3rem] text-[1.2rem] leading-[2rem]'>
                    삭제
                  </Button>
                </span>
              </div>
            )}
            <div className='w-[16.5rem] h-[20.6rem]'>
              <label
                htmlFor='image-file'
                className='relative flex items-center justify-center w-full h-full bg-white border border-border cursor-pointer'
              >
                <Input
                  type='file'
                  accept='image/jpeg, image/jpg, image/png'
                  onChange={e => {
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
          </div>
        </ItemContent>

        <div className='mt-[2.4rem] p-[2.4rem_3.2rem] bg-[#f8f8f8]'>
          <div className='mb-[1.2rem] flex items-center gap-[1.2rem]'>
            <span>
              <IconInfo />
            </span>
            <h4 className='text-[1.6rem] font-bold leading-[2.6rem] text-sub-text'>이미지 업로드 Tip</h4>
          </div>
          <div>
            <DotList className='gap-[.4rem]'>
              <DotItem className='text-[1.6rem] leading-[2.6rem] [--line-height:2.6rem]'>
                가로형 비율 4:3 (권장 해상도 1350*1080)
              </DotItem>
              <DotItem className='text-[1.6rem] leading-[2.6rem] [--line-height:2.6rem]'>
                세로형 비율 3:4 (권장 해상도 1080*1350)
              </DotItem>
            </DotList>
          </div>
        </div>
      </div>

      <div className='mt-[4.8rem] pt-[4.8rem] border-t border-border'>
        <ItemTitle>이미지 조정</ItemTitle>
        <ItemContent>
          <div className='p-[2.4rem_3.2rem] flex flex-col gap-[4rem] border border-border'>
            <div className='flex flex-col gap-[2.4rem]'>
              <h4 className='text-[1.6rem] font-bold leading-[2.6rem]'>크기 조정</h4>
              <div className='flex items-center gap-[1.6rem] pb-[2.6rem]'>
                <div className='relative flex-[0_0_4rem] items-center'>
                  <button className='relative w-[4rem] h-[4rem] cursor-pointer' onClick={handleScaleDown} type='button'>
                    <IcSliderScaleDown />
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
                  value={[form.watch("imageScale")]}
                  onValueChange={value => {
                    form.setValue("imageScale", value[0]);
                  }}
                />
                <div className='relative flex-[0_0_4rem] items-center'>
                  <button className='relative w-[4rem] h-[4rem] cursor-pointer' onClick={handleScaleUp} type='button'>
                    <IcSliderScaleUp />
                    <span className='absolute top-full left-0 right-0 translate-y-[.4rem] text-[1.4rem] leading-[2.2rem] text-center'>
                      확대
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-[2.4rem]'>
              <h4 className='text-[1.6rem] font-bold leading-[2.6rem]'>위치 조정</h4>
              <div className='flex flex-col gap-[4rem]'>
                <div className='flex items-center gap-[1.6rem] pb-[2.6rem]'>
                  <div className='relative flex-[0_0_4rem] items-center'>
                    <button
                      className='relative w-[4rem] h-[4rem] cursor-pointer'
                      onClick={handlePositionTop}
                      type='button'
                    >
                      <IcSliderPositionTop />
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
                    <button
                      className='relative w-[4rem] h-[4rem] cursor-pointer'
                      onClick={handlePositionBottom}
                      type='button'
                    >
                      <IcSliderPositionBottom />
                      <span className='absolute top-full left-0 right-0 translate-y-[.4rem] text-[1.4rem] leading-[2.2rem] text-center'>
                        하
                      </span>
                    </button>
                  </div>
                </div>

                <div className='flex items-center gap-[1.6rem] pb-[2.6rem]'>
                  <div className='relative flex-[0_0_4rem] items-center'>
                    <button
                      className='relative w-[4rem] h-[4rem] cursor-pointer'
                      onClick={handlePositionLeft}
                      type='button'
                    >
                      <IcSliderPositionLeft />
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
                    <button
                      className='relative w-[4rem] h-[4rem] cursor-pointer'
                      onClick={handlePositionRight}
                      type='button'
                    >
                      <IcSliderPositionRight />
                      <span className='absolute top-full left-0 right-0 translate-y-[.4rem] text-[1.4rem] leading-[2.2rem] text-center'>
                        우
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ItemContent>
      </div>
    </>
  );
};

const SelectCar = ({
  form,
  carOptions
}: {
  form: PosterFormProps["form"];
  carOptions: PosterFormProps["carOptions"];
}) => {
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
                <div className='grid grid-cols-4 gap-[1.6rem]'>
                  {carOptions.map((option, index) => (
                    <div key={option.value + index}>
                      <div className='relative w-full h-0 pb-[100%]'>
                        <label
                          htmlFor={option.value}
                          className='flex absolute inset-0 bg-white border border-border data-[checked=true]:border-primary cursor-pointer z-0'
                          data-checked={field.value === option.value}
                        >
                          <div className='absolute inset-[2rem]'>
                            <Image
                              src={option.image as string}
                              alt='car-image'
                              className='inset-[2.4rem] object-cover'
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
};

const InputInstagramName = ({ form }: { form: PosterFormProps["form"] }) => {
  const posterTitle = form.watch("posterTitle");
  const posterTitleLength = posterTitle?.length || 0;
  const limitLength = 20;
  const limitLengthString = limitLength.toString().padStart(2, "0");

  return (
    <>
      <div>
        <ItemTitle>‘My Moments With Kia’ 포스터에 어울리는 타이틀을 입력해주세요.</ItemTitle>
        <p className='mt-[.4rem] text-[1.4rem] leading-[2.2rem] text-sub-text'>
          최대 글자수 {limitLengthString}자 이내로 작성해주세요.
        </p>
        <ItemContent>
          <div className='relative'>
            <FormFieldInput
              form={form}
              name='posterTitle'
              placeholder='예) 나 어릴적'
              type='text'
              className='pr-[12rem] w-full text-[1.6rem]'
              maxLength={limitLength}
            />
            <span className='absolute inset-y-0 right-[2.4rem] flex items-center text-[1.4rem] pointer-events-none'>
              {posterTitleLength.toString().padStart(2, "0")}/{limitLengthString} byte
            </span>
          </div>
        </ItemContent>
      </div>

      <div className='mt-[4.8rem] pt-[4.8rem] border-t border-border'>
        <ItemTitle>인스타그램 계정명을 입력해 주세요.</ItemTitle>
        <p className='mt-[.4rem] text-[1.4rem] leading-[2.2rem] text-sub-text'>
          게시물 심사를 위해 정확한 인스타그램 사용자 이름을 작성해주세요.
        </p>
        <ItemContent>
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
                placeholder='인스타그램 아이디 입력'
                type='text'
                className='pr-[12rem] w-full text-[1.6rem]'
                id='instagram-name'
              />
            </div>
          </div>
        </ItemContent>
      </div>
    </>
  );
};
