import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;
  const response = NextResponse.next();

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
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ]
};
