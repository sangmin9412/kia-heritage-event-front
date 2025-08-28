import { Path, type FieldValues, type UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface FormFieldCheckboxProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: React.ReactNode;
  required?: boolean;
}

export function FormFieldCheckbox<T extends FieldValues>({
  form,
  name,
  label,
  required = true
}: FormFieldCheckboxProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      rules={{ required: required ? "This field is required" : false }}
      render={({ field }) => (
        <FormItem className='flex flex-row items-start space-x-[1.6rem] space-y-0'>
          <FormControl>
            <Checkbox
              checked={field.value === "True"}
              onCheckedChange={checked => {
                field.onChange(checked ? "True" : "False");
              }}
            />
          </FormControl>
          {label && <FormLabel className='leading-[2.4rem] font-normal cursor-pointer'>{label}</FormLabel>}
        </FormItem>
      )}
    />
  );
}
