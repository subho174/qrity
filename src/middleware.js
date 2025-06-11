import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const path = req.nextUrl.pathname;

  if (token && ["/", "/sign-in"].some((route) => route === path)) {
    if (token.isAdmin)
      return NextResponse.redirect(new URL("/admin/courses", req.url));
    return NextResponse.redirect(new URL("/student/dashboard", req.url));
  }
  if (!token && !["/", "/sign-in"].some((route) => route === path))
    return NextResponse.redirect(new URL("/sign-in", req.url));
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api/auth).*)"],
};
