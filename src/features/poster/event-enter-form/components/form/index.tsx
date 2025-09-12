"use client";

import { Button } from "@/components/ui/button";
import { Form, FormFieldInput, FormFieldRadioGroup, FormRow } from "@/components/ui/form";
import { Loading } from "@/components/ui/loading";
import { ROUTES } from "@/config";
import { BirthDateField, TermsAgreementField, useEventEnterForm } from "@/features/poster/event-enter-form";
import { hnadleErrorFocus } from "@/utils/form-error";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  handleDeleteKoreanOnlyInput,
  handleKoreanOnlyInput,
  handleKoreanOnlyPaste,
  handleNumericInput,
  handleNumericPaste,
  handleSpaceOnlyInput
} from "@/lib/utils";

export const EventEnterForm = () => {
  const router = useRouter();

  const {
    form,
    formState,
    isValid,
    onSubmit,
    genderOptions,
    birthYearOptions,
    birthMonthOptions,
    birthDayOptions,
    hasDriverLicenseOptions
  } = useEventEnterForm();

  const handleSubmit = form.handleSubmit(
    data => {
      onSubmit(data);
    },
    error => {
      console.log("handleSubmit error", error);
      hnadleErrorFocus(error);
    }
  );

  useEffect(() => {
    if (formState.isParticipated === false) {
      router.push(ROUTES.CREATE_FORM.link);
    }
  }, [formState.isParticipated, router]);

  if (formState.error) {
    return (
      <div className='flex flex-col desktop:gap-[2.4rem] gap-[1.6rem]'>
        <p className='text-secondary text-center'>잠시 후 다시 시도해주세요.</p>
        <div className='desktop:pt-[2.4rem] pt-[1.6rem] flex desktop:gap-[1.6rem] gap-[1.2rem]'>
          <Button className='flex-1' onClick={() => router.push(ROUTES.HOME.link, { scroll: false })}>
            닫기
          </Button>
        </div>
      </div>
    );
  }

  // 로딩 중
  if (formState.isSubmitting || formState.isParticipated === false) {
    return <Loading />;
  }

  // 이미 참여가 완료되었습니다.
  if (formState.isParticipated) {
    return (
      <div className='flex flex-col desktop:gap-[2.4rem] gap-[1.6rem]'>
        <p className='text-secondary text-center'>
          이미 참여가 완료되었습니다.
          <br />
          본 이벤트는 1인 1회만 참여 가능합니다.
          <br />
          함께해 주셔서 감사합니다!
        </p>
        <div className='desktop:pt-[2.4rem] pt-[1.6rem] flex desktop:gap-[1.6rem] gap-[1.2rem]'>
          <Button
            className='flex-1'
            variant='outline'
            onClick={() => {
              if (formState.posterId) {
                router.push(ROUTES.CREATE_COMPLETE_POSTER.link.replace(":posterId", formState.posterId.toString()));
              }
            }}
          >
            포스터 보러가기
          </Button>
          <Button className='flex-1' onClick={() => router.push(ROUTES.HOME.link, { scroll: false })}>
            닫기
          </Button>
        </div>
      </div>
    );
  }

  // 이벤트 참여 양식
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className='flex-1 flex flex-col overflow-hidden desktop:ml-[-1.2rem] desktop:pl-[1.2rem] desktop:mr-[-3.6rem] desktop:pr-[3.6rem] mr-[-1rem] pr-[1rem]'
      >
        <div
          className='desktop:max-h-[60dvh] overflow-y-auto custom-scrollbar desktop:ml-[-1.2rem] desktop:pl-[1.2rem] desktop:mr-[-3.6rem] desktop:pr-[2.8rem] mr-[-1rem] pr-[1rem]'
          data-lenis-prevent
        >
          <h3 className='sr-only'>이벤트 참여 양식</h3>
          <div className='flex flex-col desktop:gap-[3.2rem] gap-[2.4rem]'>
            <FormRow label='이름' required names={["name"]}>
              <FormFieldInput
                form={form}
                name='name'
                placeholder='김기아'
                type='text'
                required
                onInput={e => {
                  const input = e.target as HTMLInputElement;
                  const value = handleKoreanOnlyInput(input.value);
                  input.value = value;
                  form.setValue("name", value, {
                    shouldValidate: true
                  });
                }}
                onPaste={e => {
                  const value = handleKoreanOnlyPaste(e);
                  form.setValue("name", value, {
                    shouldValidate: true
                  });
                }}
              />
            </FormRow>

            <FormRow label='연락처' required names={["phone"]}>
              <FormFieldInput
                form={form}
                name='phone'
                placeholder='01000000000'
                inputMode='numeric'
                type='text'
                required
                onInput={e => {
                  const input = e.target as HTMLInputElement;
                  const value = handleNumericInput(input.value, 11);
                  input.value = value;
                  form.setValue("phone", value, {
                    shouldValidate: true
                  });
                }}
                onPaste={e => {
                  const value = handleNumericPaste(e, 11);
                  form.setValue("phone", value, {
                    shouldValidate: true
                  });
                }}
              />
            </FormRow>

            <FormRow label='이메일' required names={["email"]}>
              <FormFieldInput
                form={form}
                name='email'
                placeholder='email@kia.kor'
                inputMode='email'
                type='text'
                required
                onInput={e => {
                  const input = e.target as HTMLInputElement;
                  const value = handleSpaceOnlyInput(handleDeleteKoreanOnlyInput(input.value));
                  input.value = value;
                  form.setValue("email", value, {
                    shouldValidate: true
                  });
                }}
                onPaste={e => {
                  const value = handleSpaceOnlyInput(handleDeleteKoreanOnlyInput(e.clipboardData.getData("text")));
                  form.setValue("email", value, {
                    shouldValidate: true
                  });
                }}
              />
            </FormRow>

            <FormRow label='성별' required className='overflow-visible' names={["gender"]}>
              <FormFieldRadioGroup form={form} name='gender' options={genderOptions} />
            </FormRow>

            <BirthDateField
              form={form}
              birthYearOptions={birthYearOptions}
              birthMonthOptions={birthMonthOptions}
              birthDayOptions={birthDayOptions}
            />

            <FormRow
              label='자동차운전면허증 소지 여부'
              required
              className='overflow-visible'
              names={["isDriverLicense"]}
            >
              <FormFieldRadioGroup form={form} name='isDriverLicense' options={hasDriverLicenseOptions} />
            </FormRow>
          </div>
          <div className='desktop:mt-[7rem] mt-[4rem]'>
            <h3 className='desktop:mb-[2.4rem] mb-[1.2rem] desktop:text-[1.8rem] text-[1.6rem] desktop:leading-[3rem] leading-[2.6rem] font-bold'>
              약관 동의
            </h3>
            <TermsAgreementField form={form} />
          </div>
        </div>
        <div className='desktop:pt-[2.4rem] pt-[1.6rem]'>
          <Button className='w-full' disabled={!isValid} type='submit'>
            이벤트 참여하기
          </Button>
        </div>
      </form>
    </Form>
  );
};
