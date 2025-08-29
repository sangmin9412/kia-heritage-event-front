"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { RefreshCw, Home, ArrowLeft } from "lucide-react";

interface ErrorPageProps {
  title?: string;
  message?: string;
  statusCode?: number;
  showRetry?: boolean;
  showHome?: boolean;
  showBack?: boolean;
  onRetry?: () => void;
}

export default function ErrorPage({
  title = "오류가 발생했습니다",
  message = "예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
  statusCode,
  showRetry = true,
  showHome = true,
  showBack = false,
  onRetry
}: ErrorPageProps) {
  const router = useRouter();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='max-w-lg w-full text-center'>
        <div className='mb-8'>
          {statusCode && <h1 className='text-6xl font-bold text-gray-300 mb-4'>{statusCode}</h1>}
          <h2 className='text-2xl font-semibold text-gray-900 mb-4' dangerouslySetInnerHTML={{ __html: title }} />
          <p className='text-gray-600 leading-relaxed' dangerouslySetInnerHTML={{ __html: message }} />
        </div>

        <div className='space-y-3'>
          {showRetry && (
            <Button onClick={handleRetry} className='w-full' variant='default'>
              <RefreshCw className='w-[2.4rem] h-[2.4rem] mr-[.8rem]' />
              다시 시도
            </Button>
          )}

          {showHome && (
            <Button onClick={handleGoHome} className='w-full' variant='secondary'>
              <Home className='w-[2.4rem] h-[2.4rem] mr-[.8rem]' />
              홈으로 이동
            </Button>
          )}

          {showBack && (
            <Button onClick={handleGoBack} className='w-full' variant='outline'>
              <ArrowLeft className='w-[2.4rem] h-[2.4rem] mr-[.8rem]' />
              이전 페이지
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
