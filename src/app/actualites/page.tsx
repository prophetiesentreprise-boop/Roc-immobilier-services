import { CalendarDays, ScrollText, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Actualité immobilière — Roc Immobilier SErvices" };

export default function ActualitesPage() {
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
        <article className="rounded-sm border border-ligne bg-craie-100 p-8">
          <div className="flex items-center gap-2 text-xs text-encre/50">
            <CalendarDays size={14} /> Mise à jour — janvier 2026
          </div>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-ardoise">
            Annexe fiscale 2026 : ce qui change pour l'immobilier en Côte d'Ivoire
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-encre/80">
            La loi de finances portant budget de l'État pour 2026 est entrée en application début
            janvier 2026, avec plusieurs mesures qui concernent directement les propriétaires,
            acquéreurs et investisseurs immobiliers. Voici les points clés à connaître.
          </p>

          <h3 className="mt-8 flex items-center gap-2 font-semibold text-ardoise">
            <ScrollText size={16} className="text-pinot" /> Un plafonnement de la hausse de l'impôt foncier
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-encre/75">
            Après plusieurs années de fortes contestations liées à des hausses parfois brutales de
            l'impôt foncier, la nouvelle annexe fiscale encadre désormais l'augmentation annuelle
            de cet impôt : elle ne peut plus dépasser une fourchette comprise entre 10 % et 25 % par
            rapport au montant payé l'année précédente, contre des hausses qui avaient pu dépasser
            50 % dans certaines zones à forte valorisation.
          </p>

          <h3 className="mt-6 flex items-center gap-2 font-semibold text-ardoise">
            <ScrollText size={16} className="text-pinot" /> Des avantages pour les primo-accédants
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-encre/75">
            Les ménages qui achètent leur premier logement peuvent bénéficier d'un crédit d'impôt,
            venant en déduction de l'impôt foncier dû, étalé sur cinq ans. Pour les acquisitions
            réalisées via une société immobilière spécialisée, s'ajoutent une exonération de TVA sur
            les frais de notaire, la suppression de la taxe sur les opérations bancaires pour les
            crédits immobiliers, ainsi que la gratuité des droits d'enregistrement. Les Ivoiriens
            optant pour l'auto-construction bénéficient quant à eux d'un crédit d'impôt et de la
            gratuité des droits de publicité foncière.
          </p>

          <h3 className="mt-6 flex items-center gap-2 font-semibold text-ardoise">
            <ScrollText size={16} className="text-pinot" /> Une fiscalité plus lourde pour les biens locatifs
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-encre/75">
            À l'inverse, les biens productifs de revenus — immeubles locatifs, boutiques,
            locaux professionnels — restent taxés plus lourdement que la résidence principale d'un
            particulier. La réforme cherche ainsi à alléger la charge des ménages propriétaires
            d'un seul logement, tout en maintenant une contribution plus importante pour les
            investisseurs et promoteurs.
          </p>

          <h3 className="mt-6 flex items-center gap-2 font-semibold text-ardoise">
            <ScrollText size={16} className="text-pinot" /> Terrains et baux emphytéotiques
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-encre/75">
            Le taux appliqué aux terrains non bâtis détenus dans le cadre d'un bail emphytéotique
            (notamment les terrains industriels ou en développement) passe de 1 % à 0,2 % de la
            valeur marchande. Un terrain nouvellement acquis reste par ailleurs exonéré d'impôt
            foncier pendant les deux années suivant son acquisition.
          </p>

          <h3 className="mt-6 flex items-center gap-2 font-semibold text-ardoise">
            <ScrollText size={16} className="text-pinot" /> Attention aux retards de paiement
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-encre/75">
            La loi prévoit une pénalité automatique de 10 % du montant dû dès le premier jour de
            retard sur l'impôt foncier — un point de vigilance important pour tout propriétaire.
          </p>

          <div className="mt-8 rounded-sm border border-colombage/30 bg-colombage/10 p-4 text-xs text-encre/65">
            Ces informations sont fournies à titre général et ne remplacent pas un conseil
            juridique ou fiscal personnalisé. L'application effective de certaines mesures reste
            conditionnée à la publication des décrets d'application correspondants. Pour toute
            question sur votre situation, contactez notre équipe.
          </div>

          <Link href="/contact" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-pinot">
            Être accompagné sur mon dossier <ArrowRight size={14} />
          </Link>
        </article>

        <p className="mt-6 text-xs text-encre/45">
          Cette page présente un premier article de référence. D'autres actualités pourront être
          ajoutées au fil du temps.
        </p>
      </div>
    </div>
  );
}
