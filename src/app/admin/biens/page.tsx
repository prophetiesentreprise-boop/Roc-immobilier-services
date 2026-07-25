import Link from "next/link";
import { PlusCircle, AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/format";
import { Property } from "@/lib/types";

export default async function AdminBiensPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="max-w-lg rounded-sm border border-colombage/40 bg-colombage/10 p-6">
        <AlertTriangle className="text-colombage" size={22} />
        <p className="mt-3 font-semibold text-ardoise">Supabase n'est pas encore configuré</p>
        <p className="mt-2 text-sm text-encre/70">Voir README, étape 4.</p>
      </div>
    );
  }

  const { data } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
  const properties = (data ?? []) as Property[];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
          Biens
        </h1>
        <Link href="/admin/biens/nouveau" className="btn-primary text-sm">
          <PlusCircle size={16} /> Ajouter un bien
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-sm border border-ligne bg-craie-100">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ligne text-xs uppercase tracking-wide text-encre/50">
            <tr>
              <th className="px-4 py-3">Titre</th>
              <th className="px-4 py-3">Ville</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p.id} className="border-b border-ligne/60 last:border-none">
                <td className="px-4 py-3 font-medium text-ardoise">{p.title}</td>
                <td className="px-4 py-3 text-encre/70">{p.city}</td>
                <td className="px-4 py-3 text-encre/70">{p.kind === "vente" ? "Vente" : "Location"}</td>
                <td className="px-4 py-3 text-encre/70">{formatPrice(p.price, p.kind)}</td>
                <td className="px-4 py-3 text-encre/70">{p.status}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/biens/${p.id}`} className="text-pinot hover:underline">
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
            {properties.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-encre/50">
                  Aucun bien pour l'instant. Cliquez sur « Ajouter un bien » pour publier
                  votre première annonce.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
