import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnv } from "@/lib/supabase/env";

/**
 * Refreshes a Supabase Auth session. Not mounted.
 *
 * When auth is turned on, call this from a root `proxy.ts`:
 *
 *   import { NextResponse, type NextRequest } from "next/server"
 *   import { updateSession } from "@/lib/supabase/update-session"
 *
 *   export async function proxy(request: NextRequest) {
 *     return updateSession(request)
 *   }
 *
 * Until the public env vars are set, the request is passed through.
 */
export async function updateSession(request: NextRequest) {
  const env = getSupabaseEnv();

  if (!env) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });
  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  await supabase.auth.getUser();

  return supabaseResponse;
}
