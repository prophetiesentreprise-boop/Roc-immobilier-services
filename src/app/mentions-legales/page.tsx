import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Mentions légales — ROC Immobilier Services" };

export default function MentionsLegalesPage() {
  return (
    <div className="container-roc max-w-2xl py-16">
      <p className="eyebrow">Informations légales</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
        Mentions légales
      </h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-encre/80">
        <p>
          <strong className="text-ardoise">Éditeur du site :</strong> ROC Immobilier Services — [forme
          juridique à compléter], [capital social], [numéro RCCM à compléter] — {siteConfig.address.line1}, {siteConfig.address.line2}, {siteConfig.address.postal}.
        </p>
        <p>
          <strong className="text-ardoise">Carte professionnelle :</strong> [numéro et
          préfecture de délivrance à compléter] — Garantie financière : [organisme et
          montant à compléter].
        </p>
        <p>
          <strong className="text-ardoise">Directeur de la publication :</strong> [nom à
          compléter].
        </p>
        <p>
          <strong className="text-ardoise">Hébergement :</strong> [nom et adresse de
          l'hébergeur à compléter, ex. Vercel Inc.].
        </p>
        <p>
          <strong className="text-ardoise">Protection des données (RGPD) :</strong> les
          informations recueillies via les formulaires de ce site sont destinées à ROC
          Immobilier pour le traitement de votre demande. Conformément au Règlement Général
          sur la Protection des Données, vous disposez d'un droit d'accès, de rectification
          et de suppression de vos données, à exercer par e-mail à {siteConfig.emails[0]}.
        </p>
        <p className="rounded-sm border border-ligne bg-craie-100 p-4 text-xs text-encre/60">
          Cette page est un modèle de départ. Faites-la valider par un professionnel du
          droit avant la mise en ligne définitive, afin de vous assurer qu'elle est complète
          et conforme à votre situation (SIRET, carte professionnelle, politique de
          confidentialité détaillée, gestion des cookies).
        </p>
      </div>
    </div>
  );
}
