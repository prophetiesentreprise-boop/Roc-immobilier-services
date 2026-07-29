"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { TeamMember } from "@/lib/types";
import { SingleImageUploader } from "./SingleImageUploader";

export function TeamMemberForm({ member }: { member?: TeamMember }) {
  const router = useRouter();
  const [photoUrl, setPhotoUrl] = useState<string | null>(member?.photo_url ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    if (!supabase) {
      setError("Supabase n'est pas configuré.");
      setLoading(false);
      return;
    }

    const form = new FormData(e.currentTarget);
    const payload = {
      full_name: form.get("full_name"),
      role: form.get("role"),
      photo_url: photoUrl,
      phone: form.get("phone"),
      email: form.get("email"),
      whatsapp: form.get("whatsapp"),
      facebook_url: form.get("facebook_url"),
      instagram_url: form.get("instagram_url"),
      linkedin_url: form.get("linkedin_url"),
      display_order: Number(form.get("display_order") ?? 0),
    };

    const { error } = member
      ? await supabase.from("team_members").update(payload).eq("id", member.id)
      : await supabase.from("team_members").insert(payload);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin/equipe");
    router.refresh();
  }

  async function handleDelete() {
    if (!member) return;
    if (!confirm("Retirer ce membre de l'équipe ?")) return;
    const supabase = createClient();
    if (!supabase) return;
    await supabase.from("team_members").delete().eq("id", member.id);
    router.push("/admin/equipe");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-xl gap-5">
      <div className="rounded-sm border border-ligne bg-craie-100 p-4">
        <SingleImageUploader
          imageUrl={photoUrl}
          onChange={setPhotoUrl}
          label="Photo"
          folder="team"
          shape="square"
          hint="Idéalement un portrait carré, fond neutre."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="eyebrow mb-1 block">Nom complet *</label>
          <input name="full_name" required defaultValue={member?.full_name} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="eyebrow mb-1 block">Fonction *</label>
          <input name="role" required defaultValue={member?.role} placeholder="Conseillère Vente & Achat" className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="eyebrow mb-1 block">Téléphone</label>
          <input name="phone" defaultValue={member?.phone} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="eyebrow mb-1 block">E-mail</label>
          <input type="email" name="email" defaultValue={member?.email} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="eyebrow mb-1 block">WhatsApp</label>
          <input name="whatsapp" defaultValue={member?.whatsapp} placeholder="2250123456789" className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="eyebrow mb-1 block">Facebook</label>
          <input name="facebook_url" defaultValue={member?.facebook_url} placeholder="https://facebook.com/..." className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="eyebrow mb-1 block">Instagram</label>
          <input name="instagram_url" defaultValue={member?.instagram_url} placeholder="https://instagram.com/..." className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="eyebrow mb-1 block">LinkedIn</label>
          <input name="linkedin_url" defaultValue={member?.linkedin_url} placeholder="https://linkedin.com/in/..." className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
      </div>

      <div>
        <label className="eyebrow mb-1 block">Ordre d'affichage</label>
        <input type="number" name="display_order" defaultValue={member?.display_order ?? 0} className="w-32 rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        <p className="mt-1 text-xs text-encre/45">Les membres s'affichent du plus petit au plus grand numéro.</p>
      </div>

      {error && <p className="text-sm text-pinot">{error}</p>}

      <div className="flex items-center gap-4">
        <button type="submit" disabled={loading} className="btn-primary text-sm">
          {loading && <Loader2 className="animate-spin" size={16} />}
          {member ? "Enregistrer" : "Ajouter ce membre"}
        </button>
        {member && (
          <button type="button" onClick={handleDelete} className="flex items-center gap-1 text-sm text-pinot hover:underline">
            <Trash2 size={15} /> Retirer
          </button>
        )}
      </div>
    </form>
  );
}
