"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEventEnterFormStore, useEventEnterFormStoreInitialState } from "@/features/poster/store";
import {
  carOptions,
  createPosterFormSchema,
  createPosterFormSchemaType,
  frameOptions
} from "@/features/poster/create-poster-form/schema";

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

  const _hasHydrated = useEventEnterFormStore(state => state._hasHydrated);
  const hydratedPosterForm = useEventEnterFormStore(state => state.hydratedPosterForm);
  const setPosterForm = useEventEnterFormStore(state => state.setPosterForm);
  const setHydratedPosterForm = useEventEnterFormStore(state => state.setHydratedPosterForm);

  const form = useForm<createPosterFormSchemaType>({
    resolver: zodResolver(createPosterFormSchema),
    defaultValues: useEventEnterFormStoreInitialState.posterForm,
    mode: "onChange"
  });

  useEffect(() => {
    if (_hasHydrated) {
      form.reset(hydratedPosterForm);
    }
  }, [_hasHydrated, hydratedPosterForm, form]);

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
        // 스토어에 유저 데이터 저장 (이미 watch에서 자동으로 저장되고 있음)
        setPosterForm(data);
        setHydratedPosterForm(data);
      } catch (error) {
        setFormState(prev => ({
          ...prev,
          isSubmitting: false,
          error: error instanceof Error ? error.message : "An error occurred"
        }));
      }
    },
    [setPosterForm, setHydratedPosterForm]
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
