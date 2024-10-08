import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar";
import Herosection from "@/components/Herosection";
import { Spotlight } from "@/components/ui/Spotlight";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Astro Pro",
  description: "Fortune Favours The Brave",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      
      <AuthProvider>
      <body className={inter.className}>
      
        <Navbar/>
        {children}
        
      <Toaster />
      </body>
      </AuthProvider>
      
    </html>
  );
}
