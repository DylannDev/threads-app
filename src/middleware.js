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

  // Check if user is not connected
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
