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
} from "@/features/poster/components/create-poster-form/schema";

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

  const setPosterForm = useEventEnterFormStore(state => state.setPosterForm);
  const posterForm = useEventEnterFormStore(state => state.posterForm);

  const form = useForm<createPosterFormSchemaType>({
    resolver: zodResolver(createPosterFormSchema),
    defaultValues: posterForm, // 스토어에 저장된 데이터 사용
    values: posterForm as createPosterFormSchemaType,
    mode: "onChange"
  });

  const { isValid } = form.formState;

  // 폼 데이터가 변경될 때마다 스토어에 자동 업데이트
  useEffect(() => {
    const subscription = form.watch(value => {
      setPosterForm(value as createPosterFormSchemaType);
    });

    return () => subscription.unsubscribe();
  }, [form, setPosterForm]);

  const onSubmit = useCallback(
    async (data: createPosterFormSchemaType) => {
      try {
        setFormState(prev => ({ ...prev, isSubmitting: true, error: null }));
        console.log("submit data", data);
        // 스토어에 유저 데이터 저장 (이미 watch에서 자동으로 저장되고 있음)
        setPosterForm(data);
      } catch (error) {
        setFormState(prev => ({
          ...prev,
          isSubmitting: false,
          error: error instanceof Error ? error.message : "An error occurred"
        }));
      }
    },
    [setPosterForm]
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
