"use client";

import React from "react";
import Image from "next/image";
import Button from "../Button/Button";
import NavLinks from "../NavLinks/NavLinks";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { deleteCookie } from "cookies-next";
import NavLinksMobile from "../NavLinksMobile/NavLinksMobile";

export default function ConnectedLayout({ children }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Se déconnecter de la session utilisateur
      await signOut();

      // Supprimer le cookie "guest"
      deleteCookie("guest");

      // Rediriger vers la page de connexion
      router.push("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="flex-1 px-5">
      <header className="flex items-center justify-between py-4 relative">
        <Image src="/logo.png" alt="Threads logo" width={40} height={40} />
        <NavLinks session={session} />
        <NavLinksMobile session={session} />
        <div className="z-10">
          {session?.user?.email ? (
            <Link href="/login">
              <Button noMarginTop onClick={handleLogout}>
                Se déconnecter
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button noMarginTop>Se connecter</Button>
            </Link>
          )}
        </div>
      </header>
      {children}
    </section>
  );
}
