"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaGoogle, FaFacebook } from "react-icons/fa6";

import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/auth";
import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { LoadingSpinner } from "@/components/layout/loading";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signInWithGoogle, signInWithFacebook, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle();
  };

  const handleSignInWithFacebook = async () => {
    await signInWithFacebook();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <div className="mt-2 flex flex-row items-center gap-2">
              <div className="border-b border-b-divider w-full" />
              <div className="flex justify-center text-muted-foreground w-full">
                Or use
              </div>
              <div className="border-b border-b-divider w-full" />
            </div>
            <div className="mt-2 text-center flex flex-row gap-4">
              <Button
                className="flex flex-1"
                variant="outline"
                onClick={handleSignInWithGoogle}
                disabled={loading}
              >
                <FaGoogle className="mr-2" />
              </Button>
              <Button
                className="flex flex-1"
                variant="outline"
                onClick={handleSignInWithFacebook}
                disabled={loading}
              >
                <FaFacebook className="mr-2" />
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
