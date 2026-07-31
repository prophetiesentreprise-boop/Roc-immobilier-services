import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { Article } from "@/lib/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  if (!supabase) notFound();

  const { data } = await supabase.from("articles").select("*").eq("id", id).single();
  if (!data) notFound();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
        Modifier l'article
      </h1>
      <p className="mt-1 mb-8 text-sm text-encre/60">{(data as Article).title}</p>
      <ArticleForm article={data as Article} />
    </div>
  );
}
