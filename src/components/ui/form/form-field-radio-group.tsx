"use client";

import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Option {
  value: string;
  label: string;
}

interface FormFieldRadioGroupProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  options: Option[];
  className?: string;
  onChange?: (value: string) => void;
}

export function FormFieldRadioGroup<T extends FieldValues>({
  form,
  name,
  label,
  options,
  className = "",
  onChange = () => {}
}: FormFieldRadioGroupProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <RadioGroup
            onValueChange={value => {
              field.onChange(value);
              onChange(value);
            }}
            value={field.value}
            className='radio-group flex flex-row flex-wrap lg:pt-[0.8rem] gap-[1.2rem_2.4rem]'
          >
            {options.map(option => (
              <div key={option.value} className='radio-item flex items-center'>
                <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
                <FormLabel htmlFor={`${name}-${option.value}`} className='pl-[.8rem] cursor-pointer'>
                  {option.label}
                </FormLabel>
              </div>
            ))}
          </RadioGroup>
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
}
