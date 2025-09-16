"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  eventEnterFormSchema,
  eventEnterFormSchemaType,
  genderOptions,
  hasDriverLicenseOptions
} from "@/features/poster/event-enter-form";
import { useEventEnterFormStore } from "@/features/poster/store";
import { getParticipationStatus, getPosterForm, savePosterForm } from "@/features/poster/api";
import { ANALYTICS_HANDLER, Event } from "@/lib/analytics";

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isParticipated?: boolean;
  posterId?: number | null;
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

  const _hasUserHydrated = useEventEnterFormStore(state => state._hasUserHydrated);
  const setHasUserHydrated = useEventEnterFormStore(state => state.setHasUserHydrated);
  const setUserForm = useEventEnterFormStore(state => state.setUserForm);
  const userForm = useEventEnterFormStore(state => state.userForm);
  const resetStore = useEventEnterFormStore(state => state.resetStore);

  const form = useForm<eventEnterFormSchemaType>({
    resolver: zodResolver(eventEnterFormSchema),
    defaultValues: userForm, // 스토어에 저장된 데이터 사용
    mode: "onChange"
  });

  useEffect(() => {
    async function checkUserHydrated() {
      if (_hasUserHydrated) return;

      const response = await getPosterForm();
      const userData: eventEnterFormSchemaType = {
        name: response.data.name,
        phone: response.data.phone,
        email: response.data.email,
        birthDate: response.data.birthDate,
        gender: response.data.gender,
        agreeTerms: response.data.isThirdPartyCollect,
        agreePrivacy: response.data.isPrivacyCollect,
        isDriverLicense: response.data?.isDriverLicense
          ? (String(response.data?.isDriverLicense) as "true" | "false")
          : "",
        birthYear: response.data.birthDate?.split("-")[0] || "",
        birthMonth: response.data.birthDate?.split("-")[1] || "",
        birthDay: response.data.birthDate?.split("-")[2] || ""
      };
      form.reset(userData);
      setUserForm(userData);
      setHasUserHydrated(true);
    }

    checkUserHydrated();
  }, [form, setUserForm, setHasUserHydrated, _hasUserHydrated]);

  const { isValid } = form.formState;

  const onSubmit = async (data: eventEnterFormSchemaType) => {
    try {
      setFormState(prev => ({ ...prev, isSubmitting: true, error: null }));
      ANALYTICS_HANDLER[Event.BTN_CLCK_SUBMIT].event();

      // 참여 여부 조회
      const response = await getParticipationStatus({ phone: data.phone });

      setFormState(prev => ({
        ...prev,
        isParticipated: response.data.posterId !== null,
        posterId: response.data.posterId
      }));

      // 이미 참여가 완료되었습니다.
      if (response.data.posterId !== null) {
        // 스토어에 유저 데이터 초기화
        setUserForm({});
        setFormState(prev => ({ ...prev, isSubmitting: false }));
        return;
      }

      await savePosterForm({
        name: data.name,
        phone: data.phone,
        email: data.email,
        birthDate: data.birthDate,
        gender: data.gender,
        isThirdPartyCollect: data.agreeTerms,
        isPrivacyCollect: data.agreePrivacy,
        isDriverLicense: data.isDriverLicense === "true"
      });

      // 스토어에 유저 데이터 저장
      setUserForm(data);
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    } catch (error) {
      resetStore();
      console.error(error);
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
    genderOptions,
    birthYearOptions,
    birthMonthOptions,
    birthDayOptions,
    hasDriverLicenseOptions
  };
};

export { useEventEnterForm };
