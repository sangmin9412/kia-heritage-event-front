"use client";

import dynamic from "next/dynamic";

const CreateSubmitFormWrapper = dynamic(
  () => import("@/app/(withLayout)/create/submit/(components)/form").then(mod => mod.CreateSubmitFormWrapper),
  {
    ssr: true
  }
);

export const CreateSubmitContainer = () => {
  return <CreateSubmitFormWrapper />;
};
