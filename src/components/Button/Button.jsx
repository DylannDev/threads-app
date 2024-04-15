"use client";

import React from "react";

export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-3xl border-threads-gray-light w-full mt-4 p-4 hover:bg-gray-300 duration-150 "
    >
      {children}
    </button>
  );
}
