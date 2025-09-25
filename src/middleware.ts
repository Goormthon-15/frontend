import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  // ? pathname
  const originalUrl = request.nextUrl.pathname;

  const res = NextResponse.redirect(new URL(originalUrl, request.url)); // 리디렉션 설정

  // lang cookie가 없다면 세팅
  if (!request.cookies.has("lng")) {
    res.cookies.set("lng", "en", {
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      path: "/",
      httpOnly: false,
    });
  }

  return res;
}

export const config = {
  // 자동 리디렉션 제외 대상 괄호안에 추가 (현재 management를 추가하여 고객관리 페이지에선 미들웨어 작동되지 않음)
  matcher: [
    "/((?!api|.*\\..*|_next/static|_next/image|manifest.json|assets|locales|test|favicon.ico).*)",
  ],
};
