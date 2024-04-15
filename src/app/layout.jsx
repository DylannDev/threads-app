import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Threads",
  description: "Partagez des Threads",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
