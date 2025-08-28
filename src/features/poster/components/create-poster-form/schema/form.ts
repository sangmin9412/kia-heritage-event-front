"use client";

import { useState } from "react";
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
    mode: "onChange"
  });

  const { isValid } = form.formState;

  const onSubmit = async (data: createPosterFormSchemaType) => {
    try {
      setFormState(prev => ({ ...prev, isSubmitting: true, error: null }));
      console.log("submit data", data);
      // 스토어에 유저 데이터 저장
      setPosterForm(data);
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
    frameOptions,
    carOptions
  };
};

export { useCreatePosterForm };
