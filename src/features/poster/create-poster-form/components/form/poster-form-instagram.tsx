"use client";

import { FormFieldInput } from "@/components/ui/form";
import {
  ItemContent,
  ItemTitle,
  PosterFormProps
} from "@/features/poster/create-poster-form/components/form/poster-form";
import { useEventEnterFormStore } from "@/features/poster/store";
import { memo } from "react";

export const InputInstagramName = memo(({ form }: { form: PosterFormProps["form"] }) => {
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
