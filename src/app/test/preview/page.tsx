import { TEMP_IMAGE_BASE } from "@/config";
import { PosterPreviewerParams } from "@/features/poster/create-poster-form/components/form/poster-preview-params";

export default async function PreviewPage({
  searchParams
}: {
  searchParams: Promise<{
    frameType: string;
    imageBase64: string;
    imageScale: string;
    imageVertical: string;
    imageHorizontal: string;
    carType: string;
    posterTitle: string;
  }>;
}) {
  const posterParams = await searchParams;

  const isValues =
    posterParams.frameType &&
    // posterParams.imageBase64 &&
    posterParams.imageScale &&
    posterParams.imageVertical &&
    posterParams.imageHorizontal &&
    posterParams.carType &&
    posterParams.posterTitle;

  if (!isValues) {
    throw new Error("Invalid parameters");
  }

  return (
    <div>
      <PosterPreviewerParams
        frameType={posterParams.frameType}
        imageBase64={TEMP_IMAGE_BASE}
        imageScale={posterParams.imageScale}
        imageVertical={posterParams.imageVertical}
        imageHorizontal={posterParams.imageHorizontal}
        carType={posterParams.carType}
        posterTitle={posterParams.posterTitle}
      />
    </div>
  );
}
