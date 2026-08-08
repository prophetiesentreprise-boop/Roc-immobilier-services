import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase "admin", utilisé UNIQUEMENT dans des routes API côté
 * serveur (jamais dans un composant client). Il permet de créer, lister et
 * supprimer des comptes de connexion au back-office.
 *
 * Nécessite la variable d'environnement SUPABASE_SERVICE_ROLE_KEY
 * (Supabase > Project Settings > API > service_role secret), à ajouter
 * UNIQUEMENT dans Vercel (jamais avec le préfixe NEXT_PUBLIC_, jamais
 * commitée dans le code). Voir PHASE_10.md.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) return null;

  return createSupabaseClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
