export type SupabasePublicEnv = {
  url: string;
  anonKey: string;
};

function readPublicEnv(name: string) {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

/**
 * Public Supabase settings. Returns null until both values are set, so the
 * static site can build and run with no project connected.
 */
export function getSupabaseEnv(): SupabasePublicEnv | null {
  const url = readPublicEnv("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey = readPublicEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!url || !anonKey) {
    return null;
  }

  return { url, anonKey };
}

export function isSupabaseConfigured() {
  return getSupabaseEnv() !== null;
}

export function requireSupabaseEnv(): SupabasePublicEnv {
  const env = getSupabaseEnv();

  if (!env) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY when you create a project. The static site does not need them.",
    );
  }

  return env;
}
