import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

type FormFieldSelectProps<T extends FieldValues> = Omit<SelectHTMLAttributes<HTMLSelectElement>, "form"> & {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: Option[];
  className?: string;
  onValueChange?: (value: string) => void;
};

export function FormFieldSelect<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  options,
  className = "",
  onValueChange
}: FormFieldSelectProps<T>) {
  const handleChange = (field: ControllerRenderProps<T, (string | undefined) & Path<T>>) => (value: string) => {
    if (value === "none") {
      field.onChange("");
      return;
    }

    field.onChange(value);

    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        const { error } = fieldState;

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <Select onValueChange={handleChange(field)} value={field.value}>
              <SelectTrigger className={cn("rounded-none", className)} data-error={!!error}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map(option => (
                  <SelectItem key={`${name}-${option.value}`} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* <FormMessage /> */}
          </FormItem>
        );
      }}
    />
  );
}
