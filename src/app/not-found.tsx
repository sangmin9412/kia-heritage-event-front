"use client";

import ErrorPage from "@/components/error/ErrorPage";

export default function NotFound() {
  return (
    <ErrorPage
      title='페이지를 찾을 수 없습니다'
      message='요청하신 페이지를 찾을 수 없습니다.'
      showRetry={false}
      showHome={true}
      showBack={true}
    />
  );
}
