import { Button } from "@/components/ui/button";
import { createPosterFormSchemaType } from "@/features/poster/components/create-poster-form";
import { UseFormReturn } from "react-hook-form";

interface PosterPreviewProps {
  form: UseFormReturn<createPosterFormSchemaType>;
  onSubmit: (data: createPosterFormSchemaType) => void;
  isValid: boolean;
}

export const PosterPreview = ({ form, isValid, onSubmit }: PosterPreviewProps) => {
  return (
    <div>
      <div className='flex flex-col gap-[3.2rem]'>
        <div>
          <div className='w-full h-[53.8rem] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)]'></div>
        </div>
        <div>
          <Button size='lg' disabled={!isValid} type='submit' className='w-full'>
            포스터 생성하기
          </Button>
        </div>
      </div>
    </div>
  );
};
