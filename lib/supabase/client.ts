import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase client on the browser with project's credentials.
 *
 * The client is used to call Supabase functions on the client-side.
 *
 * @returns A Supabase client configured with project's credentials.
 */
export function createClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
