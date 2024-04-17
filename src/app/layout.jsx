import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Provider";

export const metadata = {
  title: "Threads",
  description: "Partagez des Threads",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-threads-gray flex flex-col min-h-screen">
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer position="bottom-right" />
        <Footer />
      </body>
    </html>
  );
}
