"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function NouvelUtilisateurPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      full_name: form.get("full_name"),
      email: form.get("email"),
      password: form.get("password"),
    };

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      router.push("/admin/utilisateurs");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
        Ajouter un collaborateur
      </h1>
      <p className="mt-1 mb-8 text-sm text-encre/60">
        Cette personne pourra se connecter immédiatement avec l'e-mail et le mot de
        passe choisis ci-dessous, et les modifier elle-même ensuite depuis « Mon
        compte ».
      </p>

      <form onSubmit={handleSubmit} className="grid max-w-md gap-4">
        <div>
          <label className="eyebrow mb-1 block">Nom complet</label>
          <input name="full_name" className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="eyebrow mb-1 block">E-mail *</label>
          <input type="email" name="email" required className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
        </div>
        <div>
          <label className="eyebrow mb-1 block">Mot de passe provisoire *</label>
          <input type="password" name="password" required minLength={8} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
          <p className="mt-1 text-xs text-encre/45">Au moins 8 caractères. Le collaborateur pourra le changer lui-même après sa première connexion.</p>
        </div>

        {error && <p className="text-sm text-pinot">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary w-fit text-sm">
          {loading && <Loader2 className="animate-spin" size={16} />}
          Créer le compte
        </button>
      </form>
    </div>
  );
}
