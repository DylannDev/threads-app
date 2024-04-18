"use client";

import React from "react";
import Link from "next/link";
import { PiHouseFill, PiMagnifyingGlassBold, PiUserBold } from "react-icons/pi";
import { usePathname } from "next/navigation";

export default function NavLinks({ session }) {
  const pathname = usePathname();
  return (
    <nav className="flex justify-center items-center w-full gap-5 absolute py-7">
      <Link href="/">
        <PiHouseFill
          className={`${
            pathname == "/" ? "text-white" : "text-threads-gray-light"
          } w-10 h-10 hover:bg-threads-gray-dark duration-150 p-1 rounded-xl`}
        />
      </Link>
      <Link href="/search">
        <PiMagnifyingGlassBold
          className={`${
            pathname == "/search" ? "text-white" : "text-threads-gray-light"
          } w-10 h-10 hover:bg-threads-gray-dark duration-150 p-1 rounded-xl`}
        />
      </Link>
      {session?.user?.email && (
        <Link href={`/@${session.user.pseudo}`}>
          <PiUserBold
            className={`${
              pathname.includes("@") ? "text-white" : "text-threads-gray-light"
            } w-10 h-10 hover:bg-threads-gray-dark duration-150 p-1 rounded-xl`}
          />
        </Link>
      )}
    </nav>
  );
}
