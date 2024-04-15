import { Fascinate_Inline } from "next/font/google";
import { NextResponse } from "next/server";
import React from "react";

export function middleware(request) {
  let isAuthenticated = false;

  if (!isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
