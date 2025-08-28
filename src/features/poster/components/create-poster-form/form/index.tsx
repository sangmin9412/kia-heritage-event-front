"use client";

import { Form } from "@/components/ui/form";
import { useCreatePosterForm } from "@/features/poster/components/create-poster-form";
import { PosterForm } from "@/features/poster/components/create-poster-form/form/poster-form";
import { PosterPreview } from "@/features/poster/components/create-poster-form/form/poster-preview";

export const CreatePosterForm = () => {
  const { form, isValid, onSubmit, formState, frameOptions, carOptions } = useCreatePosterForm();
  return (
    <Form {...form}>
      <div className='container'>
        <div className='flex gap-[3rem]'>
          <div className='flex-[0_0_43rem]'>
            <div className='sticky top-[2rem] h-[64rem] bg-black'>
              <PosterPreview form={form} onSubmit={onSubmit} />
            </div>
          </div>
          <div className='flex-1 p-[2.4rem_4.8rem_8rem] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)]'>
            <PosterForm form={form} frameOptions={frameOptions} carOptions={carOptions} />
          </div>
        </div>
      </div>
    </Form>
  );
};
