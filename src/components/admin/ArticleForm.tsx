"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Article } from "@/lib/types";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ArticleForm({ article }: { article?: Article }) {
  const router = useRouter();
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
    const title = String(form.get("title"));

    const payload = {
      title,
      slug: article?.slug ?? slugify(title),
      excerpt: form.get("excerpt"),
      content: form.get("content"),
      published_at: form.get("published_at"),
    };

    const { error } = article
      ? await supabase.from("articles").update(payload).eq("id", article.id)
      : await supabase.from("articles").insert(payload);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin/actualites");
    router.refresh();
  }

  async function handleDelete() {
    if (!article) return;
    if (!confirm("Supprimer définitivement cet article ?")) return;
    const supabase = createClient();
    if (!supabase) return;
    await supabase.from("articles").delete().eq("id", article.id);
    router.push("/admin/actualites");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-2xl gap-5">
      <div>
        <label className="eyebrow mb-1 block">Titre *</label>
        <input name="title" required defaultValue={article?.title} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
      </div>

      <div>
        <label className="eyebrow mb-1 block">Date de publication *</label>
        <input type="date" name="published_at" required defaultValue={article?.published_at} className="w-40 rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
      </div>

      <div>
        <label className="eyebrow mb-1 block">Résumé (affiché dans la liste)</label>
        <textarea name="excerpt" rows={2} defaultValue={article?.excerpt} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
      </div>

      <div>
        <label className="eyebrow mb-1 block">Contenu de l'article *</label>
        <textarea name="content" required rows={16} defaultValue={article?.content} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 font-mono text-sm" />
        <p className="mt-1 text-xs text-encre/45">
          Séparez chaque paragraphe par une ligne vide. Pour un sous-titre, commencez une
          ligne par <code className="rounded bg-craie px-1">## </code> (deux dièses puis un espace).
        </p>
      </div>

      {error && <p className="text-sm text-pinot">{error}</p>}

      <div className="flex items-center gap-4">
        <button type="submit" disabled={loading} className="btn-primary text-sm">
          {loading && <Loader2 className="animate-spin" size={16} />}
          {article ? "Enregistrer" : "Publier l'article"}
        </button>
        {article && (
          <button type="button" onClick={handleDelete} className="flex items-center gap-1 text-sm text-pinot hover:underline">
            <Trash2 size={15} /> Supprimer
          </button>
        )}
      </div>
    </form>
  );
}
