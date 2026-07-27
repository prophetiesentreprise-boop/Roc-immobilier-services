import { AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getSiteSettings } from "@/lib/site-settings";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";

export default async function AdminParametresPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="max-w-lg rounded-sm border border-colombage/40 bg-colombage/10 p-6">
        <AlertTriangle className="text-colombage" size={22} />
        <p className="mt-3 font-semibold text-ardoise">Supabase n'est pas encore configuré</p>
        <p className="mt-2 text-sm text-encre/70">
          Exécutez `supabase/migration_phase3.sql` (voir PHASE_3.md) puis rafraîchissez cette page.
        </p>
      </div>
    );
  }

  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
        Réglages du site
      </h1>
      <p className="mt-1 mb-8 text-sm text-encre/60">
        Modifiez le logo et les textes les plus visibles du site, sans toucher au code.
        Les changements apparaissent en ligne dès l'enregistrement.
      </p>
      <SiteSettingsForm settings={settings} />
    </div>
  );
}
