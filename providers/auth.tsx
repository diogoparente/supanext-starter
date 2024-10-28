"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: Session["user"] | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  loading: boolean;
}

const TIMEOUT = 1500;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<Session["user"] | null>(null);

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    actions: { signIn, signUp },
  } = useToast();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignInSuccess = () => {
    setTimeout(() => {
      signIn.success();
      router.push("/dashboard");
    }, TIMEOUT);
  };

  const handleSignUpSuccess = () => {
    setTimeout(() => {
      signUp.success();
      router.push("/auth/verify");
    }, TIMEOUT);
  };

  const handleSignInError = () => {
    signIn.error();
    setTimeout(() => {
      setLoading(false);
    }, TIMEOUT);
  };

  const handleSignUpError = () => {
    signUp.error();
    setTimeout(() => {
      setLoading(false);
    }, TIMEOUT);
  };

  const onSignIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      handleSignInError();
    } else {
      handleSignInSuccess();
    }
  };

  const onSignUp = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      handleSignUpError();
    } else {
      handleSignUpSuccess();
    }
  };

  const onSignOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push("/");
    }
  };

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (!error) {
      handleSignInSuccess();
    } else {
      handleSignInError();
    }
  }, [router]);

  const signInWithFacebook = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });

    if (!error) {
      handleSignInSuccess();
    } else {
      handleSignInError();
    }
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        signIn: onSignIn,
        signUp: onSignUp,
        signOut: onSignOut,
        signInWithGoogle,
        signInWithFacebook,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
