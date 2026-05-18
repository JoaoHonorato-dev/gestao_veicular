"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} min-h-screen font-sans antialiased`}>

        {!isLoginPage && <SiteHeader />}

        <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>

      </body>
    </html>
  );
}