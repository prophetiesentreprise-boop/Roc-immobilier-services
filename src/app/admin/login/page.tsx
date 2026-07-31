"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    if (!supabase) {
      setError(
        "Supabase n'est pas encore configuré. Suivez le README (étape 4) pour activer l'espace professionnel."
      );
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setError("Identifiants incorrects. Vérifiez votre e-mail et votre mot de passe.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="container-roc flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm rounded-sm border border-ligne bg-craie-100 p-8">
        <Lock className="text-pinot" size={22} />
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-ardoise">
          Espace professionnel
        </h1>
        <p className="mt-1 text-sm text-encre/60">Réservé à l'équipe Roc Immobilier SErvices.</p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <div>
            <label className="eyebrow mb-1 block">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="eyebrow mb-1 block">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm"
            />
          </div>
          {error && <p className="text-sm text-pinot">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary text-sm">
            {loading && <Loader2 className="animate-spin" size={16} />}
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
