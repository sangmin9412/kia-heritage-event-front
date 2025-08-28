import { useEventEnterForm } from "@/components/features/form/event-enter-form/schema";
import { Button } from "@/components/ui/button";
import { Form, FormFieldInput, FormFieldRadioGroup, FormRow } from "@/components/ui/form";
import { BirthDateField, TermsAgreementField } from "@/components/features/form/event-enter-form/fields";
import { hnadleErrorFocus } from "@/utils/form-error";

export const EventEnterForm = () => {
  const {
    form,
    isValid,
    onSubmit,
    GenderOptions,
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

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <div
          className='max-h-[60dvh] overflow-y-auto custom-scrollbar desktop:ml-[-1.2rem] desktop:pl-[1.2rem] desktop:mr-[-3.6rem] desktop:pr-[3.6rem]'
          data-lenis-prevent
        >
          <div className='flex flex-col gap-[3.2rem]'>
            <FormRow label='이름' required names={["name"]}>
              <FormFieldInput form={form} name='name' placeholder='김기아' type='text' required />
            </FormRow>

            <FormRow label='연락처' required names={["phone"]}>
              <FormFieldInput form={form} name='phone' placeholder='010 0000 0000' type='text' required />
            </FormRow>

            <FormRow label='이메일' required names={["email"]}>
              <FormFieldInput form={form} name='email' placeholder='email@kia.kor' type='text' required />
            </FormRow>

            <FormRow label='성별' required className='overflow-visible' names={["gender"]}>
              <FormFieldRadioGroup form={form} name='gender' options={GenderOptions} />
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
              names={["hasDriverLicense"]}
            >
              <FormFieldRadioGroup form={form} name='hasDriverLicense' options={hasDriverLicenseOptions} />
            </FormRow>
          </div>
          <div>
            <TermsAgreementField form={form} />
          </div>
        </div>
        <div className='pt-[2.4rem]'>
          <Button className='w-full' disabled={!isValid} onClick={handleSubmit}>
            이벤트 참여하기
          </Button>
        </div>
      </form>
    </Form>
  );
};
