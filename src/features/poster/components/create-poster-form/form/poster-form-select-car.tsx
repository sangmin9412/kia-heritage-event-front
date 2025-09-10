import { FormField, FormItem } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ItemContent,
  ItemTitle,
  PosterFormProps
} from "@/features/poster/components/create-poster-form/form/poster-form";
import Image from "next/image";
import { memo } from "react";

export const SelectCar = memo(
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
