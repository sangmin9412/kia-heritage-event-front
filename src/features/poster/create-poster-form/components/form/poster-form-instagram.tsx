"use client";

import { FormFieldInput } from "@/components/ui/form";
import {
  ItemContent,
  ItemTitle,
  PosterFormProps
} from "@/features/poster/create-poster-form/components/form/poster-form";
import { useEventEnterFormStore } from "@/features/poster/store";
import { sliceStringByByte } from "@/lib/utils";
import { memo } from "react";

export const InputInstagramName = memo(({ form }: { form: PosterFormProps["form"] }) => {
  const posterTitle = useEventEnterFormStore(state => state.posterForm.title);
  const posterTitleLength = posterTitle ? new TextEncoder().encode(posterTitle).length : 0;
  const limitByte = 20;
  const limitByteString = limitByte.toString().padStart(2, "0");

  const handleInput = (e: React.InputEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const value = input.value;
    const length = new TextEncoder().encode(value).length;
    if (length > limitByte) {
      const slicedValue = sliceStringByByte(value, limitByte);
      input.value = slicedValue;
      form.setValue("title", slicedValue, {
        shouldValidate: true
      });
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const value = input.value + e.clipboardData.getData("text");
    const length = new TextEncoder().encode(value).length;

    if (length > limitByte) {
      e.preventDefault();
      const slicedValue = sliceStringByByte(value, limitByte);
      input.value = slicedValue;
      form.setValue("title", slicedValue, {
        shouldValidate: true
      });
    }
  };

  return (
    <>
      <div>
        <ItemTitle>포스터에 어울리는 타이틀을 입력해주세요.</ItemTitle>
        <p className='mt-[.4rem] text-[1.4rem] leading-[2.2rem] text-sub-text'>
          최대 글자수 {limitByteString}자 이내로 작성해주세요.
        </p>
        <ItemContent className='pt-[2.4rem]'>
          <div className='relative'>
            <FormFieldInput
              form={form}
              name='title'
              placeholder='예) 나 어릴적'
              type='text'
              className='desktop:pr-[12rem] pr-[9rem] w-full h-[5.6rem] desktop:text-[1.6rem] text-[1.4rem]'
              onInput={handleInput}
              onPaste={handlePaste}
            />
            <span className='absolute inset-y-0 right-[2.4rem] flex items-center desktop:text-[1.4rem] text-[1.2rem] pointer-events-none'>
              {posterTitleLength.toString().padStart(2, "0")}/{limitByteString} byte
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
                name='instagramId'
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
