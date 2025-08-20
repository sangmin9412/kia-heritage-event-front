import React from "react";

interface MainHeaderProps {
  isScrolled?: boolean;
}

const MainHeader: React.FC<MainHeaderProps> = ({ isScrolled = false }) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* 로고 */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1
                className={`text-xl lg:text-2xl font-bold transition-colors ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                KIA Heritage
              </h1>
            </div>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#about"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"
              }`}
            >
              이벤트 소개
            </a>
            <a
              href="#how-to"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"
              }`}
            >
              참여 방법
            </a>
            <a
              href="#gallery"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white/90 hover:text-white"
              }`}
            >
              갤러리
            </a>
            <a
              href="#contact"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isScrolled
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
              }`}
            >
              참여하기
            </a>
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button
              type="button"
              className={`focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors ${
                isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white hover:text-white/80"
              }`}
              aria-expanded="false"
            >
              <span className="sr-only">메뉴 열기</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
