"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEventEnterFormStore } from "@/features/poster/store";
import {
  carOptions,
  createPosterFormSchema,
  createPosterFormSchemaType,
  frameOptions
} from "@/features/poster/create-poster-form/schema";
import { getPosterForm, savePosterForm } from "@/features/poster/api";
import { eventEnterFormSchemaType } from "@/features/poster/event-enter-form";

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  couponCode?: string;
}

const useCreatePosterForm = () => {
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null
  });

  const _hasUserHydrated = useEventEnterFormStore(state => state._hasUserHydrated);
  const _hasPosterHydrated = useEventEnterFormStore(state => state._hasPosterHydrated);
  const posterForm = useEventEnterFormStore(state => state.posterForm);
  const setHasUserHydrated = useEventEnterFormStore(state => state.setHasUserHydrated);
  const setHasPosterHydrated = useEventEnterFormStore(state => state.setHasPosterHydrated);
  const setUserForm = useEventEnterFormStore(state => state.setUserForm);
  const setPosterForm = useEventEnterFormStore(state => state.setPosterForm);
  const setStory = useEventEnterFormStore(state => state.setStory);
  const resetStore = useEventEnterFormStore(state => state.resetStore);

  const form = useForm<createPosterFormSchemaType>({
    resolver: zodResolver(createPosterFormSchema),
    defaultValues: posterForm,
    mode: "onChange"
  });

  useEffect(() => {
    async function checkPosterHydrated() {
      if (_hasPosterHydrated && _hasUserHydrated) return;

      const response = await getPosterForm();

      if (!_hasUserHydrated) {
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
        setUserForm(userData);
        setHasUserHydrated(true);
      }

      if (!_hasPosterHydrated) {
        const posterData: createPosterFormSchemaType = {
          frameCode: response.data.frameCode,
          imageBase64: response.data.imageBase64,
          imageScale: response.data.position.scale,
          imageVertical: response.data.position.offsetY,
          imageHorizontal: response.data.position.offsetX,
          carCode: response.data.carCode,
          title: response.data.title,
          instagramId: response.data.instagramId
        };
        setStory(response.data.story || "");
        form.reset(posterData);
        setHasPosterHydrated(true);
      }
    }

    checkPosterHydrated();
  }, [
    _hasPosterHydrated,
    _hasUserHydrated,
    setHasUserHydrated,
    setHasPosterHydrated,
    setPosterForm,
    form,
    setStory,
    setUserForm
  ]);

  const { isValid } = form.formState;

  // 폼 데이터가 변경될 때마다 스토어에 자동 업데이트
  useEffect(() => {
    const subscription = form.watch(value => {
      setPosterForm(value);
    });

    return () => subscription.unsubscribe();
  }, [form, setPosterForm]);

  const onSubmit = useCallback(
    async (data: createPosterFormSchemaType) => {
      try {
        setFormState(prev => ({ ...prev, isSubmitting: true, error: null }));

        await savePosterForm({
          frameCode: data.frameCode,
          imageBase64: "",
          position: {
            scale: data.imageScale,
            offsetY: data.imageVertical,
            offsetX: data.imageHorizontal
          },
          carCode: data.carCode,
          title: data.title,
          instagramId: data.instagramId
        });
      } catch (error) {
        resetStore();
        setFormState(prev => ({
          ...prev,
          isSubmitting: false,
          error: error instanceof Error ? error.message : "An error occurred"
        }));
      }
    },
    [resetStore]
  );

  return {
    form,
    isValid,
    onSubmit,
    formState,
    frameOptions,
    carOptions
  };
};

export { useCreatePosterForm };
