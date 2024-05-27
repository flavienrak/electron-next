import { NextResponse } from "next/server";

export function middleware(req) {
  const hasPath = req.nextUrl.searchParams.has("path");
  if (req.nextUrl.pathname === "/home/") {
    if (!hasPath) {
      return NextResponse.redirect(new URL("/home?path=accueil", req.url));
    }
  }
  return NextResponse.next();
}
