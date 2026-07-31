import { ArticleForm } from "@/components/admin/ArticleForm";

export default function NouvelArticlePage() {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
        Nouvel article
      </h1>
      <p className="mt-1 mb-8 text-sm text-encre/60">
        Il sera immédiatement visible sur la page « Actualité immobilière » du site.
      </p>
      <ArticleForm />
    </div>
  );
}
