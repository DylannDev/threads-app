import Link from "next/link";
import React from "react";

export default function LoginLink() {
  return (
    <Link href="/login/signup">
      <div className="auth-method">
        <h2 className="font-bold text-white">
          S'inscrire ou se connecter avec une adresse email
        </h2>
        <p className="text-threads-gray-light mt-4 ">
          Connectez-vous ou créez un profil Threads. Cela vous permettra de
          publier du contenu et d'interagir sur Threads.
        </p>
      </div>
    </Link>
  );
}
