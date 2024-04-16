import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "Threads",
  description: "Partagez des Threads",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-threads-gray flex flex-col min-h-screen">
        {children}
        <Footer />
      </body>
    </html>
  );
}
