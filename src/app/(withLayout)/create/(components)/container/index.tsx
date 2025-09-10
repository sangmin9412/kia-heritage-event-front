"use client";

import dynamic from "next/dynamic";

const CreatePosterForm = dynamic(
  () => import("@/features/poster/create-poster-form").then(mod => mod.CreatePosterForm),
  {
    ssr: true
  }
);

export const CreateContainer = () => {
  return <CreatePosterForm />;
};
