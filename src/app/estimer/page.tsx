import { CheckCircle2 } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";

export const metadata = { title: "Estimer mon bien — ROC Immobilier" };

const STEPS = [
  "Vous renseignez l'adresse et quelques caractéristiques de votre bien.",
  "Un conseiller ROC Immobilier prépare une analyse comparative du marché local.",
  "Vous êtes recontacté sous 24h pour un rendez-vous d'expertise, en agence ou sur place.",
];

export default function EstimerPage() {
  return (
    <div className="container-roc grid gap-14 py-16 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <p className="eyebrow">Estimation gratuite</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold text-ardoise">
          Quelle est la valeur réelle de votre bien ?
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-encre/75">
          Notre estimation combine les données notariales du marché local (transactions
          récentes dans votre secteur) et l'œil d'un expert de terrain. Vous obtenez une
          fourchette fiable, sans engagement.
        </p>

        <ul className="mt-8 space-y-4">
          {STEPS.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm text-encre/80">
              <CheckCircle2 className="mt-0.5 shrink-0 text-vigne" size={18} />
              <span>{step}</span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-xs text-encre/50">
          À terme, cette page peut afficher une fourchette de prix instantanée grâce aux
          données DVF (Demandes de Valeurs Foncières) — voir README, section « évolutions
          possibles ».
        </p>
      </div>

      <div className="h-fit rounded-sm border border-ligne bg-craie-100 p-7">
        <LeadForm type="estimation" submitLabel="Demander mon estimation" showAddressField />
      </div>
    </div>
  );
}
