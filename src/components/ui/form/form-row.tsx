import { ComponentBaseProps } from "@/types";
import { cn } from "@/lib/utils";
import { forwardRef, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface FormRowProps extends ComponentBaseProps {
  label: React.ReactNode;
  required?: boolean;
  labelClassName?: string;
  names?: string[];
}

const FormRow = forwardRef<HTMLDivElement, FormRowProps>(
  ({ children, className, label, required, labelClassName, names = [] }: FormRowProps, ref) => {
    const [hasError, setHasError] = useState(false);
    const form = useFormContext();

    useEffect(() => {
      if (!form || !names.length) return;

      // names 배열에 있는 필드들의 에러를 감시
      const subscription = form.watch((value, { name }) => {
        if (!name || !names.includes(name)) return;

        const fieldErrors = names.some(fieldName => {
          const fieldState = form.getFieldState(fieldName);
          return fieldState.error || fieldState.invalid;
        });

        setHasError(fieldErrors);
      });

      // 초기 에러 상태 체크
      const initialErrors = names.some(name => {
        const fieldState = form.getFieldState(name);
        return fieldState.error || fieldState.invalid;
      });
      setHasError(initialErrors);

      return () => subscription.unsubscribe();
    }, [form, names]);

    // const errorLabelClass = hasError && "text-destructive";
    const errorLabelClass = "";

    return (
      <div
        ref={ref}
        data-field={`${names.join(",")}`}
        className={cn(
          "flex flex-col gap-[1.2rem] lg:flex-row lg:gap-0 overflow-hidden outline-none focus:ring-4",
          className
        )}
      >
        <div className={cn("flex", labelClassName)}>
          <label className={cn("font-bold", errorLabelClass)}>{label}</label>
          {required && (
            <span className='flex ml-[.4rem] overflow-hidden'>
              <svg
                className='translate-y-[.4rem] w-[6px] h-[22px]'
                width='6'
                height='22'
                viewBox='0 0 6 22'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M4.41071 6L5.19643 5.40923L4.05357 3.48923L6 2.65846L5.69643 1.71692L3.66071 2.21538L3.48214 0H2.51786L2.33929 2.23385L0.303571 1.71692L0 2.65846L1.92857 3.48923L0.803571 5.40923L1.58929 6L3 4.24615L4.41071 6Z'
                  fill='#EA0029'
                />
              </svg>
            </span>
          )}
        </div>
        <div className='flex-1'>{children}</div>
      </div>
    );
  }
);

FormRow.displayName = "FormRow";
export { FormRow };
