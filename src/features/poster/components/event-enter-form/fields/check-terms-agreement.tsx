"use client";

import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { eventEnterFormSchemaType } from "@/features/poster/components/event-enter-form";
import { Checkbox } from "@/components/ui/checkbox";

export const TermsAgreementField = ({ form }: { form: UseFormReturn<eventEnterFormSchemaType> }) => {
  const allChecked = form.watch("agreeTerms") && form.watch("agreePrivacy");

  return (
    <div className='pb-[3.2rem]'>
      <div className='desktop:mb-[2.4rem] mb-[1.6rem] py-[1.2rem] border-b border-primary'>
        <div className='flex items-center desktop:gap-[1.2rem] gap-[0.6rem]'>
          <Checkbox
            id='agreeAll'
            checked={allChecked}
            onCheckedChange={checked => {
              form.setValue("agreeTerms", Boolean(checked), {
                shouldValidate: true
              });
              form.setValue("agreePrivacy", Boolean(checked), {
                shouldValidate: true
              });
            }}
          />
          <label htmlFor='agreeAll' className={cn("font-bold cursor-pointer")}>
            <p>약관에 모두 동의합니다.</p>
          </label>
        </div>
      </div>

      <div className='flex flex-col desktop:gap-[2.4rem] gap-[1.6rem]'>
        <div>
          <div className='flex items-center desktop:gap-[1.2rem] gap-[0.6rem]'>
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
              className={cn("font-bold cursor-pointer", form.formState.errors.agreeTerms ? "text-destructive" : "")}
            >
              <p>개인정보 수집/이용 동의 (필수)</p>
            </label>
          </div>
          <div className='desktop:mt-[1.2rem] mt-[0.8rem] desktop:p-[1.6rem] p-[1.2rem_1.6rem] desktop:min-h-[12rem] min-h-[8rem] desktop:border-[2px] border-[1px] border-border'>
            <div className='desktop:text-[1.4rem] text-[1.2rem] desktop:leading-[2.2rem] leading-[2rem] text-sub-text'>
              <p>개인정보 수집/이용 동의 내용이 표시됩니다.</p>
            </div>
          </div>
        </div>
        <div>
          <div className='flex items-center desktop:gap-[1.2rem] gap-[0.6rem]'>
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
              className={cn("font-bold cursor-pointer", form.formState.errors.agreePrivacy ? "text-destructive" : "")}
            >
              <p>개인정보 처리의 위탁 · 제3자 제공 (필수)</p>
            </label>
          </div>
          <div className='desktop:mt-[1.2rem] mt-[0.8rem] desktop:p-[1.6rem] p-[1.2rem_1.6rem] desktop:min-h-[12rem] min-h-[8rem] desktop:border-[2px] border-[1px] border-border'>
            <div className='desktop:text-[1.4rem] text-[1.2rem] desktop:leading-[2.2rem] leading-[2rem] text-sub-text'>
              <p>개인정보 처리의 위탁 · 제3자 제공에 대한 내용이 표시됩니다.</p>
            </div>
          </div>
        </div>
      </div>

      <div className='desktop:mt-[3.2rem] mt-[1.6rem]'>
        <div className='flex desktop:p-[1.6rem] p-[1.2rem_1.6rem] bg-[#F8F8F8]'>
          <p className='flex-1 desktop:text-[1.4rem] text-[1.2rem] desktop:leading-[2.2rem] leading-[2rem] text-sub-text text-center'>
            참여 시 입력하신 연락처와 이메일 주소로 당첨 안내가 진행됩니다.
            <br className='desktop:block hidden' />
            입력하신 성함과 연락처 정보가 실제와 다를 경우,
            <br className='desktop:block hidden' />
            당첨이 취소될 수 있으니 정확한 정보를 입력해 주세요.
          </p>
        </div>
      </div>
    </div>
  );
};
