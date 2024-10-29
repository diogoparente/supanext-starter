import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Creates a Supabase client that can be used to maintain user sessions.
 *
 * The client is configured to use the `cookies` API from Next.js to
 * store and retrieve cookies. This is useful for maintaining user
 * sessions in a Next.js application.
 *
 * Note that the `setAll` method of the `cookies` object is not
 * synchronous, as it needs to wait for the response from the server
 * before it can set the cookies. This means that if you call `setAll`
 * from a Server Component, it will not have any effect. If you need to
 * set cookies from a Server Component, you should use a middleware
 * instead.
 *
 * @returns A Supabase client that can be used to maintain user sessions.
 */
export function createClient() {
  const cookieStore = cookies();

  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          return (await cookieStore).getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(async ({ name, value, options }) =>
              (await cookieStore).set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
