"use client";

import Button from "@/components/Button/Button";
import { PiArrowLeft } from "react-icons/pi";
import Link from "next/link";
import React from "react";

export default function Signin() {
  const prepareLogin = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(email, password);
  };

  return (
    <div className="w-[500px] mx-auto">
      <h1 className="title flex items-center gap-1">
        <Link href="/login">
          <PiArrowLeft className="text-white" />
        </Link>
        Inscrivez-vous
      </h1>

      <form action={prepareLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input outline-transparent"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="input outline-transparent"
          required
        />
        <Button className="w-full">Se connecter</Button>
      </form>
      <div className="flex justify-center items-center mt-4">
        <div className="border-t border-threads-gray-light w-1/4 "></div>
        <div className="text-threads-gray-light mx-4">ou</div>
        <div className="border-t border-threads-gray-light w-1/4 "></div>
      </div>
      <Link href="/login/signup">
        <Button className="w-full">Créer un compte</Button>
      </Link>
    </div>
  );
}
