"use client";

import dynamic from "next/dynamic";

const MainContainer = dynamic(
  () => import("@/app/(withLayout)/(main)/(components)/container").then(mod => mod.MainContainer),
  {
    ssr: true
  }
);
// import { MainContainer } from "@/app/(withLayout)/(main)/(components)";

export default function MainPage() {
  return <MainContainer />;
}
