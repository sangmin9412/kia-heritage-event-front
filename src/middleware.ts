import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for /form path
  if (pathname === "/form") {
    const userAgent = request.headers.get("user-agent") || "";
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    // Check if the OS is iOS
    const osName = result.os.name?.toLowerCase();
    const isIOS = osName === "ios";

    if (isIOS) {
      // Redirect iOS users to /form-ios
      return NextResponse.redirect(new URL("/form-ios", request.url));
    }
  }

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
