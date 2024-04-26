import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex sm:flex-row flex-col items-center justify-center gap-10 pb-8 mt-10 z-30 text-threads-gray-light">
      <Link href="#">© Threads</Link>
      <Link href="#">Conditions générales de Threads</Link>
      <Link href="#">Politique de confidentialité</Link>
    </footer>
  );
}
