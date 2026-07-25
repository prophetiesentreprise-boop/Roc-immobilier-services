"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Property } from "@/lib/types";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const ACCENTS = ["#8B5A34", "#6E2A34", "#5F6F52", "#202B38"];

export function PropertyForm({ property }: { property?: Property }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    if (!supabase) {
      setError("Supabase n'est pas configuré (voir README, étape 4).");
      setLoading(false);
      return;
    }

    const form = new FormData(e.currentTarget);
    const title = String(form.get("title"));
    const highlightsRaw = String(form.get("highlights") ?? "");

    const payload = {
      title,
      slug: property?.slug ?? slugify(title),
      kind: form.get("kind"),
      category: form.get("category"),
      price: Number(form.get("price")),
      city: form.get("city"),
      postal_code: form.get("postal_code"),
      surface_m2: Number(form.get("surface_m2")),
      rooms: Number(form.get("rooms")),
      bedrooms: Number(form.get("bedrooms")),
      dpe: form.get("dpe"),
      ges: form.get("ges"),
      description: form.get("description"),
      highlights: highlightsRaw.split(",").map((h) => h.trim()).filter(Boolean),
      status: form.get("status"),
      featured: form.get("featured") === "on",
      cover_color: property?.cover_color ?? ACCENTS[Math.floor(Math.random() * ACCENTS.length)],
    };

    const { error } = property
      ? await supabase.from("properties").update(payload).eq("id", property.id)
      : await supabase.from("properties").insert(payload);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin/biens");
    router.refresh();
  }

  async function handleDelete() {
    if (!property) return;
    if (!confirm("Supprimer définitivement ce bien ?")) return;
    const supabase = createClient();
    if (!supabase) return;
    await supabase.from("properties").delete().eq("id", property.id);
    router.push("/admin/biens");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 max-w-2xl">
      <div>
        <label className="eyebrow mb-1 block">Titre de l'annonce *</label>
        <input
          name="title"
          required
          defaultValue={property?.title}
          className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="eyebrow mb-1 block">Transaction *</label>
          <select name="kind" defaultValue={property?.kind ?? "vente"} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm">
            <option value="vente">Vente</option>
            <option value="location">Location</option>
          </select>
        </div>
        <div>
          <label className="eyebrow mb-1 block">Type de bien *</label>
          <select name="category" defaultValue={property?.category ?? "Maison"} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm">
            <option value="Maison">Maison</option>
            <option value="Appartement">Appartement</option>
            <option value="Terrain">Terrain</option>
            <option value="Local commercial">Local commercial</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="eyebrow mb-1 block">Prix (€) *</label>
          <input type="number" name="price" required defaultValue={property?.price} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="eyebrow mb-1 block">Ville *</label>
          <input name="city" required defaultValue={property?.city} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="eyebrow mb-1 block">Code postal *</label>
          <input name="postal_code" required defaultValue={property?.postal_code} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="eyebrow mb-1 block">Surface (m²) *</label>
          <input type="number" name="surface_m2" required defaultValue={property?.surface_m2} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="eyebrow mb-1 block">Pièces</label>
          <input type="number" name="rooms" defaultValue={property?.rooms ?? 0} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="eyebrow mb-1 block">Chambres</label>
          <input type="number" name="bedrooms" defaultValue={property?.bedrooms ?? 0} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="eyebrow mb-1 block">DPE (énergie)</label>
          <select name="dpe" defaultValue={property?.dpe ?? "D"} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm">
            {["A", "B", "C", "D", "E", "F", "G"].map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="eyebrow mb-1 block">GES (climat)</label>
          <select name="ges" defaultValue={property?.ges ?? "D"} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm">
            {["A", "B", "C", "D", "E", "F", "G"].map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="eyebrow mb-1 block">Description *</label>
        <textarea name="description" required rows={5} defaultValue={property?.description} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
      </div>

      <div>
        <label className="eyebrow mb-1 block">Points forts (séparés par des virgules)</label>
        <input
          name="highlights"
          defaultValue={property?.highlights?.join(", ")}
          placeholder="Cour privative, Cave voûtée, Proche centre"
          className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 items-center">
        <div>
          <label className="eyebrow mb-1 block">Statut</label>
          <select name="status" defaultValue={property?.status ?? "disponible"} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm">
            <option value="disponible">Disponible</option>
            <option value="sous_compromis">Sous compromis</option>
            <option value="vendu">Vendu</option>
            <option value="loue">Loué</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm text-encre/80">
          <input type="checkbox" name="featured" defaultChecked={property?.featured} />
          Mettre en avant sur la page d'accueil (« coup de cœur »)
        </label>
      </div>

      {error && <p className="text-sm text-pinot">{error}</p>}

      <div className="flex items-center gap-4">
        <button type="submit" disabled={loading} className="btn-primary text-sm">
          {loading && <Loader2 className="animate-spin" size={16} />}
          {property ? "Enregistrer les modifications" : "Publier le bien"}
        </button>
        {property && (
          <button type="button" onClick={handleDelete} className="flex items-center gap-1 text-sm text-pinot hover:underline">
            <Trash2 size={15} /> Supprimer ce bien
          </button>
        )}
      </div>
    </form>
  );
}
