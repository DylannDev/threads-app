import React from "react";

export default function AuthenticatedLayout({ children }) {
  return (
    <section className="flex-1">
      <header></header>
      {children}
    </section>
  );
}
