"use client";

import { useAuth } from "@/providers/auth";
import { redirect } from "next/navigation";

import { Sidebar } from "@/components/layout/sidebar";
import { LoadingSpinner } from "@/components/layout/loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
