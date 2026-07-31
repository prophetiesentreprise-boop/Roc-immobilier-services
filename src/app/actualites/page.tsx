import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";
import { getArticles } from "@/lib/articles";

export const metadata = { title: "Actualité immobilière — Roc Immobilier SErvices" };

export default async function ActualitesPage() {
  const articles = await getArticles();

  return (
    <div>
      <div className="bg-ardoise py-16 text-craie-100">
        <div className="container-roc">
          <p className="eyebrow text-colombage">Actualité immobilière</p>
          <h1 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-semibold">
            L'essentiel du marché, du droit et de la fiscalité immobilière en Côte d'Ivoire
          </h1>
        </div>
      </div>

      <div className="container-roc max-w-3xl py-16">
        <div className="grid gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/actualites/${article.slug}`}
              className="card-lift block rounded-sm border border-ligne bg-craie-100 p-7"
            >
              <div className="flex items-center gap-2 text-xs text-encre/50">
                <CalendarDays size={14} />
                {new Date(article.published_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </div>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-ardoise">
                {article.title}
              </h2>
              {article.excerpt && <p className="mt-2 text-sm text-encre/70">{article.excerpt}</p>}
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-pinot">
                Lire l'article <ArrowRight size={14} />
              </span>
            </Link>
          ))}

          {articles.length === 0 && (
            <p className="rounded-sm border border-ligne bg-craie-100 p-8 text-center text-sm text-encre/50">
              Aucun article publié pour le moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
