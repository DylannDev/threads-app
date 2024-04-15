import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div className="text-white">
      <h1 className="title">Comment souhaitez-vous utiliser Threads ?</h1>
      <div className="mt-5 w-[500px] mx-auto grid gap-4">
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

        <Link href="/login/pass">
          <div className="auth-method">
            <h2 className="font-bold text-white">
              Utiliser Threads sans profil
            </h2>
            <p className="text-threads-gray-light mt-4 ">
              Vous pouvez naviguer dans Threads sans profil, mais vous ne
              pourrez pas publier de contenu, ni interagir avec Threads.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
