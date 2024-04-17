"use client";

import React from "react";
import Image from "next/image";
import Button from "../Button/Button";
import NavLinks from "../NavLinks/NavLinks";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function ConnectedLayout({ children }) {
  const { data: session } = useSession();

  return (
    <section className="flex-1 px-5">
      <header className="flex items-center justify-between relative py-4">
        <NavLinks />
        <Image src="/logo.png" alt="Threads logo" width={40} height={40} />
        <div className="z-10">
          {session?.user?.email ? (
            <Link href="/login">
              <Button noMarginTop onClick={() => signOut()}>
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
