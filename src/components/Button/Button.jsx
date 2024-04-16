"use client";

import React from "react";

export default function Button({ children, onClick, className, noMarginTop }) {
  return (
    <button
      onClick={onClick}
      className={`bg-white rounded-3xl border-threads-gray-light py-4 px-6 hover:bg-gray-300 duration-150 cursor-pointer ${className} ${
        !noMarginTop && "mt-4"
      }`}
    >
      {children}
    </button>
  );
}
