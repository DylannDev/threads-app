import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(request) {
  const sessionCookie = cookies(request, "__Secure-next-auth.session-token");
  const guestCookie = cookies(request, "guest");

  // Vérifier si un cookie de session est présent
  if (sessionCookie) {
    // L'utilisateur est connecté
    return NextResponse.next();
  }

  // Vérifier si un cookie d'invité est présent
  if (guestCookie) {
    // L'utilisateur est en mode invité
    return NextResponse.next();
  }

  if (!guestCookie) {
    // L'utilisateur est en mode invité
    return NextResponse.redirect("/login");
  }

  // Rediriger vers la page de connexion si aucun cookie n'est présent
  return NextResponse.redirect("/login");
}

export const config = {
  matcher: ["/"],
};
