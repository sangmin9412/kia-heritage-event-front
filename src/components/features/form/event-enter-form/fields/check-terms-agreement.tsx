"use client";

import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { FormRow } from "@/components/ui/form";
import { eventEnterFormSchemaType } from "@/components/features/form/event-enter-form/schema";
import { Checkbox } from "@/components/ui/checkbox";

export const TermsAgreementField = ({ form }: { form: UseFormReturn<eventEnterFormSchemaType> }) => {
  return (
    <>
      <FormRow label='약관동의' required className='overflow-visible' names={["agreeTerms", "agreePrivacy"]}>
        <div className='flex flex-col gap-[1.2rem]'>
          <div className='flex items-center gap-[1.2rem]'>
            <Checkbox
              id='agreeTerms'
              className={`${form.formState.errors.agreeTerms ? "" : ""}`}
              checked={form.getValues("agreeTerms")}
              onCheckedChange={checked => {
                form.setValue("agreeTerms", Boolean(checked), {
                  shouldValidate: true
                });
              }}
            />
            <label
              htmlFor='agreeTerms'
              className={cn("cursor-pointer", form.formState.errors.agreeTerms ? "text-destructive" : "")}
            >
              <p>[필수] 개인정보 수집 / 이용 동의</p>
            </label>
          </div>
          <div className='flex items-center gap-[1.2rem]'>
            <Checkbox
              id='agreePrivacy'
              className={`${form.formState.errors.agreePrivacy ? "" : ""}`}
              checked={form.getValues("agreePrivacy")}
              onCheckedChange={checked => {
                form.setValue("agreePrivacy", Boolean(checked), {
                  shouldValidate: true
                });
              }}
            />
            <label
              htmlFor='agreePrivacy'
              className={cn("cursor-pointer", form.formState.errors.agreePrivacy ? "text-destructive" : "")}
            >
              <p>[필수] 개인정보 처리의 위탁 · 제3자 제공</p>
            </label>
          </div>
        </div>
      </FormRow>
    </>
  );
};
