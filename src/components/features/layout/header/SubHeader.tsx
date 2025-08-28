"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface SubHeaderProps {
  title: string;
  showBackButton?: boolean;
  backUrl?: string;
  rightContent?: React.ReactNode;
}

const SubHeader: React.FC<SubHeaderProps> = ({ title, showBackButton = true, backUrl, rightContent }) => {
  const router = useRouter();

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };

  return (
    <header className='bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* 왼쪽: 뒤로가기 + 제목 */}
          <div className='flex items-center space-x-4'>
            {showBackButton && (
              <button
                onClick={handleBack}
                className='p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors'
                aria-label='뒤로가기'
              >
                <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
              </button>
            )}

            <div className='flex items-center'>
              <h1 className='text-lg font-semibold text-gray-900 truncate'>{title}</h1>
            </div>
          </div>

          {/* 가운데: 로고 (선택적) */}
          <div className='hidden md:block'>
            <h2 className='text-sm font-medium text-gray-500'>KIA Heritage Event</h2>
          </div>

          {/* 오른쪽: 커스텀 콘텐츠 */}
          <div className='flex items-center space-x-2'>{rightContent}</div>
        </div>
      </div>
    </header>
  );
};

export default SubHeader;
