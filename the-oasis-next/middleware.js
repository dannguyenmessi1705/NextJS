// import { NextRequest, NextResponse } from "next/server";
// export function middleware(request) {
//   return NextResponse.redirect(new URL("/", request.url));
// }

// GOOGLE AUTHJS
import { auth } from "./app/_lib/oauth";
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
