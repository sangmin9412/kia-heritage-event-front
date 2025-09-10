"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { useCreatePosterForm } from "@/features/poster/components/create-poster-form";
import { PosterForm } from "@/features/poster/components/create-poster-form/form/poster-form";
import { PosterPreview } from "@/features/poster/components/create-poster-form/form/poster-preview";
import { hnadleErrorFocus } from "@/utils/form-error";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config";
import { ANALYTICS_HANDLER, Event } from "@/lib/analytics";

export const CreatePosterForm = () => {
  return (
    <div className='container desktop:px-[3rem] px-0'>
      <div className='flex desktop:flex-row flex-col desktop:pb-[8rem]'>
        <div className='desktop:p-[4.8rem_4rem_0] p-[4.8rem_0] desktop:flex-[0_0_64rem] flex-[0_0_auto] max-w-[64rem] desktop:bg-transparent bg-[#f8f8f8]'>
          <div className='desktop:sticky desktop:top-[2rem]'>
            <div className='animate-in fade-in desktop:slide-in-from-left-10 desktop:slide-in-from-bottom-0 slide-in-from-bottom-10 ease-in-out duration-1000'>
              <PosterPreview />
            </div>
          </div>
        </div>
        <div className='flex-1 min-w-0 w-full'>
          <div className='bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)] animate-in fade-in desktop:slide-in-from-right-10 desktop:slide-in-from-bottom-0 slide-in-from-bottom-10 ease-in-out duration-1000'>
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
      ANALYTICS_HANDLER[Event.BTN_CLICK_CREATE].event();
      router.push(ROUTES.CREATE_SUBMIT.link);
    },
    error => {
      console.log("handleSubmit error", error);
      hnadleErrorFocus(error);
    }
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className='desktop:min-h-screen flex flex-col'>
        <div className='desktop:p-[2.4rem_4.8rem] p-[0_0_4.8rem]'>
          <PosterForm form={form} frameOptions={frameOptions} carOptions={carOptions} />
        </div>
        <div className='mt-auto sticky bottom-0 desktop:p-[2.4rem_4.8rem] p-[1.6rem] bg-white border-t border-border'>
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
