import Link from "next/link";
import { Building2, Inbox, PlusCircle, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="max-w-lg rounded-sm border border-colombage/40 bg-colombage/10 p-6">
        <AlertTriangle className="text-colombage" size={22} />
        <p className="mt-3 font-semibold text-ardoise">Supabase n'est pas encore configuré</p>
        <p className="mt-2 text-sm text-encre/70">
          Suivez l'étape 4 du README pour créer votre base Supabase, exécuter le script
          `supabase/schema.sql` et renseigner les variables d'environnement. Le back-office
          s'activera automatiquement ensuite.
        </p>
      </div>
    );
  }

  const [{ count: propertiesCount }, { count: newLeadsCount }] = await Promise.all([
    supabase.from("properties").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "nouveau"),
  ]);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
        Tableau de bord
      </h1>
      <p className="mt-1 text-sm text-encre/60">Vue d'ensemble de l'activité ROC Immobilier Services.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-sm border border-ligne bg-craie-100 p-6">
          <Building2 className="text-pinot" size={22} />
          <p className="mt-3 font-[family-name:var(--font-data)] text-3xl font-semibold text-ardoise">
            {propertiesCount ?? 0}
          </p>
          <p className="text-sm text-encre/60">Biens publiés</p>
        </div>
        <div className="rounded-sm border border-ligne bg-craie-100 p-6">
          <Inbox className="text-pinot" size={22} />
          <p className="mt-3 font-[family-name:var(--font-data)] text-3xl font-semibold text-ardoise">
            {newLeadsCount ?? 0}
          </p>
          <p className="text-sm text-encre/60">Nouvelles demandes à traiter</p>
        </div>
        <Link
          href="/admin/biens/nouveau"
          className="flex flex-col justify-center rounded-sm border border-dashed border-pinot/50 bg-pinot/5 p-6 text-pinot hover:bg-pinot/10"
        >
          <PlusCircle size={22} />
          <p className="mt-3 font-semibold">Ajouter un bien</p>
          <p className="text-sm">Publier une nouvelle annonce en quelques minutes.</p>
        </Link>
      </div>
    </div>
  );
}
