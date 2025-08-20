import { NextRequest, NextResponse } from "next/server";
import { getFileType, setCacheHeaders } from "./lib/cache-utils";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // 파일 타입 결정
  const fileType = getFileType(pathname);

  // 캐시 헤더 설정 (pathname을 전달하여 커스텀 설정 적용)
  setCacheHeaders(response, fileType, pathname);

  return response;
}

export const config = {
  matcher: [
    /*
     * 다음 경로들을 제외한 모든 요청에 대해 미들웨어 실행:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
