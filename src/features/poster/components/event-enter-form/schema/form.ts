"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  eventEnterFormSchema,
  eventEnterFormSchemaType,
  GenderOptions,
  hasDriverLicenseOptions
} from "@/features/poster/components/event-enter-form";
import { useEventEnterFormStore } from "@/features/poster/store";
import { getParticipationStatus } from "@/features/poster/api";

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isParticipated?: boolean;
  error: string | null;
  couponCode?: string;
}

const birthYearOptions = Array.from({ length: 2007 - 1920 + 1 }, (_, i) => {
  const year = 2007 - i;
  return { value: year.toString(), label: `${year}년` };
});

const birthMonthOptions = Array.from({ length: 12 }, (_, i) => {
  const month = i + 1;
  return {
    value: month.toString().padStart(2, "0"),
    label: `${month}월`
  };
});

const birthDayOptions = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1;
  return {
    value: day.toString().padStart(2, "0"),
    label: `${day}일`
  };
});

const useEventEnterForm = () => {
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null
  });

  const setUserForm = useEventEnterFormStore(state => state.setUserForm);
  const userForm = useEventEnterFormStore(state => state.userForm);

  const form = useForm<eventEnterFormSchemaType>({
    resolver: zodResolver(eventEnterFormSchema),
    defaultValues: userForm, // 스토어에 저장된 데이터 사용
    mode: "onChange"
  });

  const { isValid } = form.formState;

  const onSubmit = async (data: eventEnterFormSchemaType) => {
    try {
      setFormState(prev => ({ ...prev, isSubmitting: true, error: null }));
      console.log("submit data", data);

      // 참여 여부 조회
      const response = await getParticipationStatus(data);

      setFormState(prev => ({ ...prev, isParticipated: response.isParticipated }));

      // 이미 참여가 완료되었습니다.
      if (response.isParticipated) {
        // 스토어에 유저 데이터 초기화
        setUserForm({});
        return;
      }

      // 스토어에 유저 데이터 저장
      setUserForm(data);
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        error: error instanceof Error ? error.message : "An error occurred"
      }));
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
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
