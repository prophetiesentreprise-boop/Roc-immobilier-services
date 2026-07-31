import { createClient } from "./supabase/server";
import { Article } from "./types";

const demoArticles: Article[] = [
  {
    id: "demo-1",
    slug: "annexe-fiscale-2026-immobilier",
    title: "Annexe fiscale 2026 : ce qui change pour l'immobilier en Côte d'Ivoire",
    excerpt:
      "La loi de finances 2026 encadre la hausse de l'impôt foncier, avantage les primo-accédants et ajuste la fiscalité des biens locatifs.",
    content: `La loi de finances portant budget de l'État pour 2026 est entrée en application début janvier 2026, avec plusieurs mesures qui concernent directement les propriétaires, acquéreurs et investisseurs immobiliers. Voici les points clés à connaître.

## Un plafonnement de la hausse de l'impôt foncier

Après plusieurs années de fortes contestations liées à des hausses parfois brutales de l'impôt foncier, la nouvelle annexe fiscale encadre désormais l'augmentation annuelle de cet impôt : elle ne peut plus dépasser une fourchette comprise entre 10 % et 25 % par rapport au montant payé l'année précédente, contre des hausses qui avaient pu dépasser 50 % dans certaines zones à forte valorisation.

## Des avantages pour les primo-accédants

Les ménages qui achètent leur premier logement peuvent bénéficier d'un crédit d'impôt, venant en déduction de l'impôt foncier dû, étalé sur cinq ans. Pour les acquisitions réalisées via une société immobilière spécialisée, s'ajoutent une exonération de TVA sur les frais de notaire, la suppression de la taxe sur les opérations bancaires pour les crédits immobiliers, ainsi que la gratuité des droits d'enregistrement. Les Ivoiriens optant pour l'auto-construction bénéficient quant à eux d'un crédit d'impôt et de la gratuité des droits de publicité foncière.

## Une fiscalité plus lourde pour les biens locatifs

À l'inverse, les biens productifs de revenus — immeubles locatifs, boutiques, locaux professionnels — restent taxés plus lourdement que la résidence principale d'un particulier. La réforme cherche ainsi à alléger la charge des ménages propriétaires d'un seul logement, tout en maintenant une contribution plus importante pour les investisseurs et promoteurs.

## Terrains et baux emphytéotiques

Le taux appliqué aux terrains non bâtis détenus dans le cadre d'un bail emphytéotique (notamment les terrains industriels ou en développement) passe de 1 % à 0,2 % de la valeur marchande. Un terrain nouvellement acquis reste par ailleurs exonéré d'impôt foncier pendant les deux années suivant son acquisition.

## Attention aux retards de paiement

La loi prévoit une pénalité automatique de 10 % du montant dû dès le premier jour de retard sur l'impôt foncier — un point de vigilance important pour tout propriétaire.

Ces informations sont fournies à titre général et ne remplacent pas un conseil juridique ou fiscal personnalisé. L'application effective de certaines mesures reste conditionnée à la publication des décrets d'application correspondants. Pour toute question sur votre situation, contactez notre équipe.`,
    published_at: "2026-01-31",
    created_at: "2026-01-31T09:00:00Z",
  },
];

export async function getArticles(): Promise<Article[]> {
  const supabase = await createClient();
  if (!supabase) return demoArticles;

  const { data, error } = await supabase.from("articles").select("*").order("published_at", { ascending: false });
  if (error || !data || data.length === 0) return demoArticles;
  return data as Article[];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = await createClient();
  if (!supabase) return demoArticles.find((a) => a.slug === slug) ?? null;

  const { data, error } = await supabase.from("articles").select("*").eq("slug", slug).single();
  if (error || !data) return demoArticles.find((a) => a.slug === slug) ?? null;
  return data as Article;
}
