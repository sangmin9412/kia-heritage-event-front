import { NextRequest, NextResponse } from "next/server";
import { isAfterDate } from "@/lib/utils";
import dayjs from "dayjs";
import { EVENT_START_DATE_TIME } from "./config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 한국시간 2025년 9월 29일 08:00:00
  // const eventStartDateTime = EVENT_START_DATE_TIME;
  // const currentDateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
  // const isEventActive = isAfterDate(eventStartDateTime, currentDateTime);
  
  // 이벤트 시작 전이고, 메인 페이지(/)가 아닌 경우 메인 페이지로 리다이렉트
  // if (!isEventActive && pathname !== "/") {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

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
