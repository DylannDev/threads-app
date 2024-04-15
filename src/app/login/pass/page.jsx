"use client";

import Button from "@/components/Button/Button";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { PiArrowLeft } from "react-icons/pi";

export default function Pass() {
  const router = useRouter();

  const onContinue = () => {
    // Generate a new cookie
    setCookie("guest", "true");

    // Redirect
    router.push("/");
  };

  return (
    <div className="w-[500px] mx-auto ">
      <h1 className="title flex items-center gap-1">
        <Link href="/login">
          <PiArrowLeft className="text-white" />
        </Link>
        Continuer en mode invité
      </h1>

      <p className="text-threads-gray-light mt-4 ">
        Vous pouvez naviguer dans Threads sans profil, mais vous ne pourrez pas
        publier de contenu, ni interagir avec Threads.
      </p>
      <Button onClick={onContinue}>Continuer</Button>
    </div>
  );
}
