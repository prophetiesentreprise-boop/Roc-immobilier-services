import Link from "next/link";
import { PlusCircle, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { TeamMember } from "@/lib/types";

export default async function AdminEquipePage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="max-w-lg rounded-sm border border-colombage/40 bg-colombage/10 p-6">
        <AlertTriangle className="text-colombage" size={22} />
        <p className="mt-3 font-semibold text-ardoise">Supabase n'est pas encore configuré</p>
        <p className="mt-2 text-sm text-encre/70">
          Exécutez `supabase/migration_phase4.sql` (voir PHASE_4.md) puis rafraîchissez cette page.
        </p>
      </div>
    );
  }

  const { data } = await supabase.from("team_members").select("*").order("display_order", { ascending: true });
  const members = (data ?? []) as TeamMember[];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
          Notre équipe
        </h1>
        <Link href="/admin/equipe/nouveau" className="btn-primary text-sm">
          <PlusCircle size={16} /> Ajouter un membre
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <Link key={m.id} href={`/admin/equipe/${m.id}`} className="flex items-center gap-4 rounded-sm border border-ligne bg-craie-100 p-4 hover:border-pinot">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-ligne bg-craie">
              {m.photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.photo_url} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs text-encre/40">Photo</span>
              )}
            </div>
            <div>
              <p className="font-semibold text-ardoise">{m.full_name}</p>
              <p className="text-xs text-encre/60">{m.role}</p>
            </div>
          </Link>
        ))}

        {members.length === 0 && (
          <p className="col-span-full rounded-sm border border-ligne bg-craie-100 p-8 text-center text-sm text-encre/50">
            Aucun membre ajouté pour le moment. Cliquez sur « Ajouter un membre » pour
            commencer.
          </p>
        )}
      </div>
    </div>
  );
}
