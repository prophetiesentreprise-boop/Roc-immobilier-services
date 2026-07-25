import { ShieldCheck, Users, Award } from "lucide-react";

export const metadata = { title: "L'agence — ROC Immobilier" };

export default function AgencePage() {
  return (
    <div>
      <div className="bg-ardoise py-20 text-craie-100">
        <div className="container-roc">
          <p className="eyebrow text-colombage">L'agence</p>
          <h1 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-semibold">
            Une agence indépendante, fondée sur des valeurs humaines
          </h1>
        </div>
      </div>

      <div className="container-roc grid gap-14 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm leading-relaxed text-encre/80">
            Depuis sa création en août 2016, ROC Immobilier accompagne les particuliers et
            investisseurs de Colmar et de sa région dans leurs projets de vente, d'achat, de
            location et de gestion locative. Notre agrément d'État et notre affiliation à la
            Chambre du Droit des Affaires et de l'Immobilier (CDAIM) garantissent un exercice
            transparent et conforme à la réglementation.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-encre/80">
            Notre équipe combine une connaissance fine du marché haut-rhinois avec une
            approche personnalisée : nous prenons le temps de comprendre chaque projet avant
            de proposer une solution.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              [ShieldCheck, "Agréments", "Carte professionnelle, garantie financière et assurance RCP à jour."],
              [Users, "Équipe locale", "Des conseillers spécialisés vente, location et gestion, basés à Colmar."],
              [Award, "9 ans d'expérience", "Une expertise construite sur le terrain, secteur par secteur."],
            ].map(([Icon, title, text]: any) => (
              <div key={title} className="rounded-sm border border-ligne bg-craie-100 p-5">
                <Icon className="text-pinot" size={22} />
                <p className="mt-3 font-semibold text-ardoise">{title}</p>
                <p className="mt-1 text-xs text-encre/65">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-sm border border-ligne bg-craie-100 p-7">
          <p className="eyebrow">Nos engagements</p>
          <ul className="mt-4 space-y-3 text-sm text-encre/80">
            <li>— Écoute active et analyse précise de chaque besoin.</li>
            <li>— Transparence sur les prix, les délais et les frais.</li>
            <li>— Suivi personnalisé jusqu'à la signature définitive.</li>
            <li>— Conformité RGPD et confidentialité des données clients.</li>
          </ul>
          <p className="mt-6 text-xs text-encre/50">
            Remplacez ce texte et ces chiffres par les informations exactes de l'agence avant
            la mise en ligne (agréments, numéro de carte professionnelle, garantie
            financière).
          </p>
        </div>
      </div>
    </div>
  );
}
