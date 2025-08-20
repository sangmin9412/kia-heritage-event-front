"use client";

import ErrorPage from "@/components/error/ErrorPage";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 (필요시 외부 서비스로 전송)
    console.error("Application error:", error);
  }, [error]);

  return (
    <ErrorPage
      title='페이지 로드 중 오류가 발생했습니다'
      message='일시적인 오류가 발생했습니다.<br /> 페이지를 새로고침하거나<br /> 잠시 후 다시 시도해주세요.'
      showRetry={true}
      showHome={true}
      showBack={true}
      onRetry={reset}
    />
  );
}
