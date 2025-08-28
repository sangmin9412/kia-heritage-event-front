import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventEnterFormSchema, eventEnterFormSchemaType } from "./validation";

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  couponCode?: string;
}

const GenderOptions = [
  { label: "남자", value: "male" },
  { label: "여자", value: "female" }
];

const birthYearOptions = Array.from({ length: 2007 - 1920 + 1 }, (_, i) => {
  const year = 2007 - i;
  return { value: year.toString(), label: `${year}` };
});

const birthMonthOptions = Array.from({ length: 12 }, (_, i) => {
  const month = i + 1;
  return {
    value: month.toString().padStart(2, "0"),
    label: `${month}`
  };
});

const birthDayOptions = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1;
  return {
    value: day.toString().padStart(2, "0"),
    label: `${day}`
  };
});

const hasDriverLicenseOptions = [
  { label: "예", value: "Y" },
  { label: "아니오", value: "N" }
];

const useEventEnterForm = () => {
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null
  });

  const form = useForm<eventEnterFormSchemaType>({
    resolver: zodResolver(eventEnterFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      birthDate: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      agreeTerms: false,
      agreePrivacy: false
    },
    mode: "onChange"
  });

  const { isValid } = form.formState;

  const onSubmit = async (data: eventEnterFormSchemaType) => {
    try {
      setFormState(prev => ({ ...prev, isSubmitting: true, error: null }));
      console.log("submit data", data);
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        error: error instanceof Error ? error.message : "An error occurred"
      }));
    }
  };

  return {
    form,
    isValid,
    onSubmit,
    formState,
    GenderOptions,
    birthYearOptions,
    birthMonthOptions,
    birthDayOptions,
    hasDriverLicenseOptions
  };
};

export { useEventEnterForm };
