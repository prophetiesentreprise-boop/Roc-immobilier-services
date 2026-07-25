export const metadata = { title: "Mentions légales — ROC Immobilier" };

export default function MentionsLegalesPage() {
  return (
    <div className="container-roc max-w-2xl py-16">
      <p className="eyebrow">Informations légales</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
        Mentions légales
      </h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-encre/80">
        <p>
          <strong className="text-ardoise">Éditeur du site :</strong> ROC Immobilier Services —  [SARL
          ], [10 000 000 F CFA], [numéro d'Agrément Ministériel : N° 19-00046/ 24-00113] —Abidjan- Cocody Genie 2000,  Non loin de Playce Palmeraie
           - 06 BP 740 Abidjan 06. Abidjan - Côte d'Ivoire. (+225) 05 04 66 70 39 · (+225) 05 64 59 69 23. .
        </p>
        <p>
          <strong className="text-ardoise">Carte professionnelle :</strong> [Ministère de la Construction, du Logement et de l'Urbanisme: 
          arrêté officiel portant agrément d'agent immobilier.numéro 24-00113.
          ce document juridique qui lui donne légalement le droit d'exercer les activités suivantes sur tout le territoire ivoirien :
          La gestion locative
          L'achat et la vente de biens.
          Le conseil et l'intermédiation immobilière
         ] — Garantie financière : [organisme et
          montant à compléter].
        </p>
        <p>
          <strong className="text-ardoise">Directeur de la publication :</strong> [Mme Eba Maeva
          ].
        </p>
        <p>
          <strong className="text-ardoise">Hébergement :</strong> [
          Vercel Inc.].
        </p>
        <p>
          <strong className="text-ardoise">Protection des données (RGPD) :</strong> les
          informations recueillies via les formulaires de ce site sont destinées à ROC
          Immobilier Services pour le traitement de votre demande. Conformément au Règlement Général
          sur la Protection des Données, vous disposez d'un droit d'accès, de rectification
          et de suppression de vos données, à exercer par e-mail à info@rocimmobilierservice.ci.
        </p>
        <p className="rounded-sm border border-ligne bg-craie-100 p-4 text-xs text-encre/60">
          Cette page est un modèle de départ. Faites-la valider par un professionnel du
          droit avant la mise en ligne définitive, afin de vous assurer qu'elle est complète
          et conforme à votre situation (SIRET, politique de
          confidentialité détaillée, gestion des cookies).
        </p>
      </div>
    </div>
  );
}
