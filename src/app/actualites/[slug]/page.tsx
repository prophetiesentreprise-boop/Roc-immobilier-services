import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarDays, ArrowRight, ArrowLeft } from "lucide-react";
import { getArticleBySlug } from "@/lib/articles";
import { ArticleContent } from "@/components/ArticleContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article introuvable — Roc Immobilier SErvices" };

  return {
    title: `${article.title} | Roc Immobilier SErvices`,
    description: article.excerpt || article.content.slice(0, 155),
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <div className="container-roc max-w-3xl py-16">
      <Link href="/actualites" className="flex items-center gap-1 text-sm text-encre/60 hover:text-pinot">
        <ArrowLeft size={14} /> Toute l'actualité
      </Link>

      <article className="mt-6 rounded-sm border border-ligne bg-craie-100 p-8">
        <div className="flex items-center gap-2 text-xs text-encre/50">
          <CalendarDays size={14} />
          {new Date(article.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        </div>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-ardoise sm:text-3xl">
          {article.title}
        </h1>

        <div className="mt-6">
          <ArticleContent content={article.content} />
        </div>

        <div className="mt-8 rounded-sm border border-colombage/30 bg-colombage/10 p-4 text-xs text-encre/65">
          Ces informations sont fournies à titre général et ne remplacent pas un conseil
          personnalisé. Pour toute question sur votre situation, contactez notre équipe.
        </div>

        <Link href="/contact" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-pinot">
          Être accompagné sur mon dossier <ArrowRight size={14} />
        </Link>
      </article>
    </div>
  );
}
