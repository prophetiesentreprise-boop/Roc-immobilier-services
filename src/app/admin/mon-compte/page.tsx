"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function MonComptePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaved(false);

    const supabase = createClient();
    if (!supabase) {
      setError("Supabase n'est pas configuré.");
      setLoading(false);
      return;
    }

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "").trim();
    const fullName = String(form.get("full_name") ?? "").trim();

    const updates: { email?: string; password?: string; data?: { full_name: string } } = {
      data: { full_name: fullName },
    };
    if (email) updates.email = email;
    if (password) {
      if (password.length < 8) {
        setError("Le nouveau mot de passe doit contenir au moins 8 caractères.");
        setLoading(false);
        return;
      }
      updates.password = password;
    }

    const { error } = await supabase.auth.updateUser(updates);
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSaved(true);
    (e.target as HTMLFormElement).reset();
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
        Mon compte
      </h1>
      <p className="mt-1 mb-8 max-w-md text-sm text-encre/60">
        Modifiez votre nom, votre e-mail de connexion ou votre mot de passe. Laissez un
        champ vide pour ne pas le changer.
      </p>

      <form onSubmit={handleSubmit} className="grid max-w-md gap-4">
        <div>
          <label className="eyebrow mb-1 block">Nom complet</label>
          <input name="full_name" className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="eyebrow mb-1 block">Nouvel e-mail</label>
          <input type="email" name="email" placeholder="Laisser vide pour ne pas changer" className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
          <p className="mt-1 text-xs text-encre/45">Un e-mail de confirmation peut être envoyé à la nouvelle adresse selon la configuration.</p>
        </div>
        <div>
          <label className="eyebrow mb-1 block">Nouveau mot de passe</label>
          <input type="password" name="password" placeholder="Laisser vide pour ne pas changer" className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>

        {error && <p className="text-sm text-pinot">{error}</p>}
        {saved && !error && <p className="text-sm text-vigne">Modifications enregistrées.</p>}

        <button type="submit" disabled={loading} className="btn-primary w-fit text-sm">
          {loading && <Loader2 className="animate-spin" size={16} />}
          Enregistrer
        </button>
      </form>
    </div>
  );
}
