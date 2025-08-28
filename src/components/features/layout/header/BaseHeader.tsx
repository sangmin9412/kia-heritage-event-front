import React from "react";

interface BaseHeaderProps {
  className?: string;
  children: React.ReactNode;
}

const BaseHeader: React.FC<BaseHeaderProps> = ({ className = "", children }) => {
  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </header>
  );
};

// 공통 로고 컴포넌트
export const HeaderLogo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex-shrink-0 ${className}`}>
    <h1 className="text-xl font-bold text-gray-900">KIA Heritage</h1>
  </div>
);

// 공통 모바일 메뉴 버튼
export const MobileMenuButton: React.FC<{
  onClick?: () => void;
  className?: string;
  isOpen?: boolean;
}> = ({ onClick, className = "", isOpen = false }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors ${className}`}
    aria-expanded={isOpen}
    aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
  >
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {isOpen ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  </button>
);

export default BaseHeader;
