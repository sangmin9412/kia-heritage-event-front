"use client";

import { PosterPreviewer } from "@/features/poster/components/create-poster-form/form/poster-preview";

// 상위 레이아웃을 사용하지 않음 (Next.js 13.4+)
export const layout = false;

export default function PreviewPage() {
  return (
    <div>
      <PosterPreviewer />
    </div>
  );
}
