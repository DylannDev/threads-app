"use client";

import { useFormStatus } from "react-dom";
import React from "react";

export default function Button({
  children,
  onClick,
  className,
  noMarginTop,
  formButton,
}) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={formButton && pending}
      onClick={onClick}
      className={`bg-white rounded-3xl border-threads-gray-light py-4 px-6 hover:bg-gray-300 duration-150 cursor-pointer disabled:bg-opacity-50 disabled:cursor-not-allowed ${className} ${
        !noMarginTop && "mt-4"
      }`}
    >
      {children}
    </button>
  );
}
