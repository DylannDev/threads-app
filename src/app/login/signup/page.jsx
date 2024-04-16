"use client";

import Link from "next/link";
import { PiArrowLeft } from "react-icons/pi";
import React from "react";
import Button from "@/components/Button/Button";
import { createUser } from "@/actions/create-user";

export default function Signup() {
  const prepareCreateUser = async (formData) => {
    const username = formData.get("username");
    const pseudo = formData.get("pseudo");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(username, pseudo, email, password);

    await createUser(username, pseudo, email, password);
  };

  return (
    <div className="w-[500px] mx-auto">
      <h1 className="title flex items-center gap-1">
        <Link href="/login">
          <PiArrowLeft className="text-white" />
        </Link>
        Inscrivez-vous
      </h1>

      <form action={prepareCreateUser}>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          className="input outline-transparent"
          required
        />
        <input
          type="text"
          name="pseudo"
          placeholder="Pseudo"
          className="input outline-transparent"
          required
        />
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
        <Button className="w-full">S'inscrire</Button>
      </form>
      <div className="flex justify-center items-center mt-4">
        <div className="border-t border-threads-gray-light w-1/4 "></div>
        <div className="text-threads-gray-light mx-4">ou</div>
        <div className="border-t border-threads-gray-light w-1/4 "></div>
      </div>
      <Link href="/login/signin">
        <Button className="w-full">Se Connecter</Button>
      </Link>
    </div>
  );
}
