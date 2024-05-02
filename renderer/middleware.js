import { NextResponse } from "next/server";
export function middleware(req) {
  if (req.nextUrl.pathname === "/home/") {
    // return NextResponse.redirect(new URL("/index", req.url));
  }
  return NextResponse.next();
}
