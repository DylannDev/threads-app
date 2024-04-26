import GuestLink from "@/components/GuestLink/GuestLink";
import LoginLink from "@/components/LoginLink/LoginLink";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div className="text-white">
      <h1 className="title">Comment souhaitez-vous utiliser Threads ?</h1>
      <div className="mt-5 sm:max-w-[500px] mx-auto grid gap-4">
        <LoginLink />
        <GuestLink />
      </div>
    </div>
  );
}
