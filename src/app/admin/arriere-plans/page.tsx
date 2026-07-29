import { AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getBackgroundImages } from "@/lib/backgrounds";
import { BackgroundImagesForm } from "@/components/admin/BackgroundImagesForm";

export default async function AdminArrierePlansPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="max-w-lg rounded-sm border border-colombage/40 bg-colombage/10 p-6">
        <AlertTriangle className="text-colombage" size={22} />
        <p className="mt-3 font-semibold text-ardoise">Supabase n'est pas encore configuré</p>
        <p className="mt-2 text-sm text-encre/70">
          Exécutez `supabase/migration_phase5.sql` (voir PHASE_5.md) puis rafraîchissez cette page.
        </p>
      </div>
    );
  }

  const images = await getBackgroundImages();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
        Arrière-plans du site
      </h1>
      <p className="mt-1 mb-8 max-w-xl text-sm text-encre/60">
        Ajoutez une photo à chaque zone du site qui utilise aujourd'hui une couleur ou un
        dégradé. Sans photo, l'habillage actuel reste affiché — aucune zone ne casse si
        vous n'ajoutez rien.
      </p>
      <BackgroundImagesForm initialImages={images} />
    </div>
  );
}
