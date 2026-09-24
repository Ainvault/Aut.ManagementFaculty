import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "admin_session";

// Fast-path redirect: if the admin session cookie is absent, send to the login
// page immediately (proxy is meant to run at the network boundary, so it must
// not depend on app shared modules — no DB access here).
// Real session verification happens in the admin layout guard
// (src/app/admin/(guard)/layout.tsx).

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(SESSION_COOKIE)?.value;
  if (!cookie) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};