import { createClient } from "./supabase/server";

/** Renvoie l'utilisateur connecté, ou null si personne n'est authentifié. */
export async function requireAdmin() {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}
