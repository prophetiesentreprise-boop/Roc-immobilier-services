import Link from "next/link";
import { PlusCircle, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Article } from "@/lib/types";

export default async function AdminActualitesPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="max-w-lg rounded-sm border border-colombage/40 bg-colombage/10 p-6">
        <AlertTriangle className="text-colombage" size={22} />
        <p className="mt-3 font-semibold text-ardoise">Supabase n'est pas encore configuré</p>
        <p className="mt-2 text-sm text-encre/70">
          Exécutez `supabase/migration_phase8.sql` (voir PHASE_8.md) puis rafraîchissez cette page.
        </p>
      </div>
    );
  }

  const { data } = await supabase.from("articles").select("*").order("published_at", { ascending: false });
  const articles = (data ?? []) as Article[];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
          Actualité immobilière
        </h1>
        <Link href="/admin/actualites/nouveau" className="btn-primary text-sm">
          <PlusCircle size={16} /> Nouvel article
        </Link>
      </div>

      <div className="mt-8 grid gap-4">
        {articles.map((a) => (
          <Link key={a.id} href={`/admin/actualites/${a.id}`} className="flex items-center justify-between rounded-sm border border-ligne bg-craie-100 p-4 hover:border-pinot">
            <div>
              <p className="font-semibold text-ardoise">{a.title}</p>
              <p className="text-xs text-encre/50">
                {new Date(a.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </Link>
        ))}

        {articles.length === 0 && (
          <p className="rounded-sm border border-ligne bg-craie-100 p-8 text-center text-sm text-encre/50">
            Aucun article pour le moment. Cliquez sur « Nouvel article » pour commencer.
          </p>
        )}
      </div>
    </div>
  );
}
