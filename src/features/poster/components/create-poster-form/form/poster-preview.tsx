import { createPosterFormSchemaType } from "@/features/poster/components/create-poster-form";
import { UseFormReturn } from "react-hook-form";

interface PosterPreviewProps {
  form: UseFormReturn<createPosterFormSchemaType>;
  onSubmit: (data: createPosterFormSchemaType) => void;
}

export const PosterPreview = ({ form, onSubmit }: PosterPreviewProps) => {
  return <div>PosterPreview</div>;
};
