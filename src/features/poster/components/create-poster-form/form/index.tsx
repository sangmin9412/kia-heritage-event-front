"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { useCreatePosterForm } from "@/features/poster/components/create-poster-form";
import { PosterForm } from "@/features/poster/components/create-poster-form/form/poster-form";
import { PosterPreview } from "@/features/poster/components/create-poster-form/form/poster-preview";
import { hnadleErrorFocus } from "@/utils/form-error";
import { Button } from "@/components/ui/button";

export const CreatePosterForm = () => {
  return (
    <div className='container'>
      <div className='flex pb-[8rem]'>
        <div className='p-[4.8rem_4rem_0] flex-[0_0_64rem] max-w-[64rem]'>
          <div className='sticky top-[2rem]'>
            <div className='animate-in fade-in slide-in-from-left-10 ease-in-out duration-1000'>
              <PosterPreview />
            </div>
          </div>
        </div>
        <div className='flex-1 min-w-0 w-full'>
          <div className='min-h-screen flex flex-col bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)] animate-in fade-in slide-in-from-right-10 ease-in-out duration-1000'>
            <PosterFormContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

const PosterFormContainer = () => {
  const router = useRouter();
  const { form, isValid, onSubmit, frameOptions, carOptions } = useCreatePosterForm();

  const handleSubmit = form.handleSubmit(
    data => {
      onSubmit(data);
      router.push("/create/submit");
    },
    error => {
      console.log("handleSubmit error", error);
      hnadleErrorFocus(error);
    }
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <div className='p-[2.4rem_4.8rem]'>
          <PosterForm form={form} frameOptions={frameOptions} carOptions={carOptions} />
        </div>
        <div className='mt-auto sticky bottom-0 p-[2.4rem_4.8rem] bg-white border-t border-border'>
          <PosterSubmit isValid={isValid} />
        </div>
      </form>
    </Form>
  );
};

const PosterSubmit = memo(({ isValid }: { isValid: boolean }) => {
  return (
    <Button size='lg' disabled={!isValid} type='submit' className='w-full'>
      사연 작성하기
    </Button>
  );
});
PosterSubmit.displayName = "PosterSubmit";
