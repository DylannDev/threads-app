"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PiHouseFill, PiMagnifyingGlassBold, PiUserBold } from "react-icons/pi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import NewPostForm from "../NewPostForm/NewPostForm";

export default function NavLinks({ session }) {
  const pathname = usePathname();

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [openModal]);

  return (
    <>
      <nav className="hidden sm:flex justify-center items-center w-full gap-5 absolute py-7">
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
          <HiOutlinePencilAlt
            onClick={() => setOpenModal(true)}
            className={`w-10 h-10 hover:bg-threads-gray-dark duration-150 p-1 rounded-xl cursor-pointer text-threads-gray-light`}
          />
        )}
        {session?.user?.email && (
          <Link href={`/@${session.user.pseudo}`}>
            <PiUserBold
              className={`${
                pathname.includes("@")
                  ? "text-white"
                  : "text-threads-gray-light"
              } w-10 h-10 hover:bg-threads-gray-dark duration-150 p-1 rounded-xl`}
            />
          </Link>
        )}
      </nav>
      {openModal &&
        createPortal(
          <div
            className="modale-background"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setOpenModal(false);
              }
            }}
          >
            <div className="modale-foreground">
              <NewPostForm closeModal={() => setOpenModal(false)} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
