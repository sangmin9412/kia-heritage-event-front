import { memo } from "react";
import { IconInfo } from "@/assets/icons";
import { DotItem, DotList } from "@/components/ui/dot-list";
import { FormField, FormItem } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ItemContent,
  ItemTitle,
  PosterFormProps
} from "@/features/poster/create-poster-form/components/form/poster-form";

export const PhotoFrame = memo(
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
