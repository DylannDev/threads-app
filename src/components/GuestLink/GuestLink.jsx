import Link from "next/link";
import React from "react";

export default function GuestLink() {
  return (
    <Link href="/login/pass">
      <div className="auth-method">
        <h2 className="font-bold text-white">Utiliser Threads sans profil</h2>
        <p className="text-threads-gray-light mt-4 ">
          Vous pouvez naviguer dans Threads sans profil, mais vous ne pourrez
          pas publier de contenu, ni interagir avec Threads.
        </p>
      </div>
    </Link>
  );
}
