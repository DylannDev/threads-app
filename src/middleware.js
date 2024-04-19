import { hasCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import React from "react";

export function middleware(request) {
  let isAuthenticated = false;

  // Check if user is guest
  if (hasCookie("guest", { cookies })) {
    isAuthenticated = true;
  }

  // Check if user is connected
  if (hasCookie("__Secure-next-auth.session-token", { cookies })) {
    isAuthenticated = true;
  }

  if (!isAuthenticated) {
    // Check if user is not connected
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
