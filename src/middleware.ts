import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;

  const isLoggedIn = cookies.get("user")?.value;

  const protectedPaths = ["/dashboard"];

  if (protectedPaths.includes(nextUrl.pathname)) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/" , request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
