"use client";

import { Form } from "@/components/ui/form";
import { useCreatePosterForm } from "@/features/poster/components/create-poster-form";
import { PosterForm } from "@/features/poster/components/create-poster-form/form/poster-form";
import { PosterPreview } from "@/features/poster/components/create-poster-form/form/poster-preview";
import { hnadleErrorFocus } from "@/utils/form-error";
import { useRouter } from "next/navigation";

export const CreatePosterForm = () => {
  const router = useRouter();
  const { form, isValid, onSubmit, formState, frameOptions, carOptions } = useCreatePosterForm();

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
        <div className='container'>
          <div className='flex gap-[3rem]'>
            <div className='flex-[0_0_43rem]'>
              <div className='sticky top-[2rem]'>
                <div className='animate-in fade-in slide-in-from-left-10 ease-in-out duration-1000'>
                  <PosterPreview form={form} onSubmit={onSubmit} isValid={isValid} />
                </div>
              </div>
            </div>
            <div className='flex-1'>
              <div className='p-[2.4rem_4.8rem_8rem] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)] animate-in fade-in slide-in-from-right-10 ease-in-out duration-1000'>
                <PosterForm form={form} frameOptions={frameOptions} carOptions={carOptions} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
