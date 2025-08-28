import { Path, type FieldValues, type UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, useFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";

type FormFieldInputProps<T extends FieldValues> = Omit<InputHTMLAttributes<HTMLInputElement>, "form"> & {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  type?: string;
  placeholder?: string;
};

export function FormFieldInput<T extends FieldValues>({
  form,
  name,
  label,
  type,
  placeholder,
  ...props
}: FormFieldInputProps<T>) {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field, fieldState }) => {
          const { error } = fieldState;

          return (
            <FormItem>
              {label && <FormLabel>{label}</FormLabel>}
              <FormControl>
                <Input
                  data-error={!!error}
                  {...field}
                  type={type || "text"}
                  placeholder={placeholder || (label ? label + "..." : "")}
                  {...props}
                />
              </FormControl>
              {/* <FormMessage /> */}
            </FormItem>
          );
        }}
      />
    </>
  );
}
