import { createBrowserClient } from "@supabase/ssr";

/**
 * Client Supabase utilisé côté navigateur (formulaires, back-office).
 * Renvoie `null` tant que les variables d'environnement ne sont pas
 * renseignées, pour que le site reste fonctionnel en mode démo.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createBrowserClient(url, key);
}
