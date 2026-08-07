import Link from "next/link";
import { ArrowRight, FileCheck, Wallet, Wrench, BarChart3 } from "lucide-react";

export const metadata = { title: "Gestion locative — ROC Immobilier" };

const SERVICES = [
  [FileCheck, "Mise en location", "Diffusion de l'annonce, sélection et vérification des dossiers candidats, rédaction du bail."],
  [Wallet, "Encaissement des loyers", "Quittancement automatique, suivi des impayés et relances."],
  [Wrench, "Entretien du bien", "Coordination des artisans et suivi des travaux courants."],
  [BarChart3, "Reporting propriétaire", "Un compte-rendu mensuel clair, accessible depuis votre espace client."],
];

export default function GestionLocativePage() {
  return (
    <div className="container-roc py-16">
      <p className="eyebrow">Nos services</p>
      <h1 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-semibold text-ardoise">
        Confiez votre bien, gardez la sérénité
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-encre/75">
        De la recherche du locataire à la gestion quotidienne, notre équipe s'occupe de tout
        pour que votre investissement reste un plaisir, pas une contrainte.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map(([Icon, title, text]: any) => (
          <div key={title} className="rounded-sm border border-ligne bg-craie-100 p-6">
            <Icon className="text-pinot" size={24} />
            <p className="mt-3 font-[family-name:var(--font-display)] font-semibold text-ardoise">{title}</p>
            <p className="mt-2 text-sm text-encre/70">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-sm bg-ardoise p-10 text-craie-100">
        <p className="eyebrow text-colombage">Propriétaire bailleur</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold">
          Discutons de votre bien
        </h2>
        <p className="mt-2 max-w-md text-sm text-craie-100/75">
          Nos honoraires de gestion et nos garanties (loyers impayés, dégradations) vous
          seront présentés lors d'un premier échange, sans engagement.
        </p>
        <Link href="/contact" className="btn-primary mt-6 bg-craie-100 text-ardoise hover:bg-craie">
          Être rappelé <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
