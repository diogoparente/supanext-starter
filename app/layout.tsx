import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/navbar";
import { Page } from "@/components/layout/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Supanext",
  description:
    "A modern application built with Next.js, Supabase, TanStack Query and shadcn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Page>{children}</Page>
        <Toaster />
      </body>
    </html>
  );
}
