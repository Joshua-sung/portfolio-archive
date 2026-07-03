import { NextResponse, type NextRequest } from "next/server";

const INTERNAL_USER_COOKIE = "portfolio_internal_user";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365 * 2;
const ENABLE_VALUES = new Set(["1", "true", "yes", "on"]);
const DISABLE_VALUES = new Set(["0", "false", "no", "off"]);

export function proxy(request: NextRequest) {
  const marker = request.nextUrl.searchParams.get("internal_user");

  if (!marker) {
    return NextResponse.next();
  }

  const normalizedMarker = marker.toLowerCase();
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.searchParams.delete("internal_user");

  const response = NextResponse.redirect(redirectUrl);

  if (ENABLE_VALUES.has(normalizedMarker)) {
    response.cookies.set(INTERNAL_USER_COOKIE, "true", {
      maxAge: COOKIE_MAX_AGE_SECONDS,
      path: "/",
      sameSite: "lax",
    });
  }

  if (DISABLE_VALUES.has(normalizedMarker)) {
    response.cookies.set(INTERNAL_USER_COOKIE, "", {
      maxAge: 0,
      path: "/",
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
