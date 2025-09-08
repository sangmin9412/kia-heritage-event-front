"use client";

import { useEffect } from "react";
import { eventEnterFormSchemaType } from "@/features/poster/components/event-enter-form";
import { Option } from "@/features/poster/types";
import { UseFormReturn, useWatch } from "react-hook-form";
import { FormFieldSelect, FormRow } from "@/components/ui/form";

export const BirthDateField = ({
  form,
  birthYearOptions,
  birthMonthOptions,
  birthDayOptions
}: {
  form: UseFormReturn<eventEnterFormSchemaType>;
  birthYearOptions: Option[];
  birthMonthOptions: Option[];
  birthDayOptions: Option[];
}) => {
  const birthYear = useWatch({
    control: form.control,
    name: "birthYear"
  });
  const birthMonth = useWatch({
    control: form.control,
    name: "birthMonth"
  });
  const birthDay = useWatch({
    control: form.control,
    name: "birthDay"
  });

  useEffect(() => {
    if (birthYear && birthMonth && birthDay) {
      form.setValue("birthDate", `${birthYear}${birthMonth}${birthDay}`, {
        shouldValidate: true
      });
    }
  }, [birthYear, birthMonth, birthDay, form]);

  return (
    <FormRow
      label='생년월일'
      required
      className='overflow-visible'
      names={["birthYear", "birthMonth", "birthDay", "birthDate"]}
    >
      <div className='flex desktop:gap-[1.6rem] gap-[0.8rem]'>
        <div className='flex-1'>
          <FormFieldSelect
            form={form}
            name='birthYear'
            options={birthYearOptions}
            placeholder='연도'
            className='w-full'
          />
        </div>
        <div className='flex-1'>
          <FormFieldSelect
            form={form}
            name='birthMonth'
            options={birthMonthOptions}
            placeholder='월'
            className='w-full'
          />
        </div>
        <div className='flex-1'>
          <FormFieldSelect form={form} name='birthDay' options={birthDayOptions} placeholder='일' className='w-full' />
        </div>
      </div>
    </FormRow>
  );
};
