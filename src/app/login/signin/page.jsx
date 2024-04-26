"use client";

import Button from "@/components/Button/Button";
import { PiArrowLeft } from "react-icons/pi";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { checkEmail } from "@/utils/check-email-syntax";

export default function Signin() {
  const router = useRouter();

  const prepareLogin = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    // If a field is empty
    if (!email || !password) {
      return toast.error("Veuillez remplir tous les champs");
    }

    // Check if the email is valid
    if (!checkEmail(email)) {
      return toast.error("Veuillez entrer un email valide");
    }

    // Signin the user
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response.error) {
        return toast.error(response.error);
      }
    } catch (error) {
      return toast.error(error.message);
    }

    // Success
    toast.success("Vous êtes connecté ! 🎉");

    // Redirect
    router.replace("/");
  };

  return (
    <div className="sm:w-[500px] mx-auto">
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
          className="input "
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="input "
          required
        />
        <Button formButton className="w-full">
          Se connecter
        </Button>
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
