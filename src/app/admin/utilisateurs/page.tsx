"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, Trash2, Loader2 } from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  last_sign_in_at: string | null;
}

export default function AdminUtilisateursPage() {
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      setUsers(data.users);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Retirer l'accès de ce collaborateur ?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
          Collaborateurs
        </h1>
        <Link href="/admin/utilisateurs/nouveau" className="btn-primary text-sm">
          <PlusCircle size={16} /> Ajouter un collaborateur
        </Link>
      </div>
      <p className="mt-1 mb-8 text-sm text-encre/60">
        Toute personne ajoutée ici peut se connecter à l'espace professionnel avec les
        mêmes droits que vous.
      </p>

      {error && <p className="mb-4 text-sm text-pinot">{error}</p>}

      {!users ? (
        <p className="flex items-center gap-2 text-sm text-encre/60"><Loader2 size={16} className="animate-spin" /> Chargement...</p>
      ) : (
        <div className="overflow-x-auto rounded-sm border border-ligne bg-craie-100">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ligne text-xs uppercase tracking-wide text-encre/50">
              <tr>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">E-mail</th>
                <th className="px-4 py-3">Dernière connexion</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-ligne/60 last:border-none">
                  <td className="px-4 py-3 font-medium text-ardoise">{u.full_name || "—"}</td>
                  <td className="px-4 py-3 text-encre/70">{u.email}</td>
                  <td className="px-4 py-3 text-encre/70">
                    {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString("fr-FR") : "Jamais connecté"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(u.id)}
                      disabled={deletingId === u.id}
                      className="flex items-center gap-1 text-pinot hover:underline disabled:opacity-50"
                    >
                      <Trash2 size={14} /> Retirer
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-encre/50">Aucun collaborateur.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
