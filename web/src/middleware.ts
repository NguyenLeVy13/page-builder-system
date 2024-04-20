import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkLoggedIn, checkMenuPermission } from "./auth/user";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if the user is logged in  
  if (!checkLoggedIn(request)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check permissions
  if (!checkMenuPermission(request)) {
    return NextResponse.redirect(new URL("/error-404-page", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/account",
    "/blocks",
    "/builder/(.*)",
    "/roles",
    "/menu",
    "/functions",
    "/users",
    "/dashboard",
    "/templates",
  ],
};
