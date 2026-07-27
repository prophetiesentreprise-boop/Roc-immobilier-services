import { CheckCircle2, TrendingUp, Clock3, ShieldCheck } from "lucide-react";
import { EstimateForm } from "@/components/EstimateForm";

export const metadata = { title: "Estimer mon bien — ROC Immobilier Services" };

const STEPS = [
  ["1", "Vous décrivez votre bien", "Adresse, type de bien, surface, état général : deux minutes suffisent."],
  ["2", "Notre équipe analyse le marché", "Comparaison avec les transactions récentes dans votre quartier à Abidjan."],
  ["3", "Vous êtes recontacté sous 24h", "Un conseiller vous présente la fourchette de prix et propose, si utile, une visite d'expertise sur place."],
];

export default function EstimerPage() {
  return (
    <div>
      <div className="bg-ardoise py-16 text-craie-100">
        <div className="container-roc">
          <p className="eyebrow text-colombage">Estimation gratuite & sans engagement</p>
          <h1 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-semibold sm:text-5xl">
            Quelle est la vraie valeur de votre bien aujourd'hui ?
          </h1>
          <p className="mt-4 max-w-lg text-sm text-craie-100/75">
            Le marché immobilier abidjanais évolue vite, quartier par quartier. Obtenez
            une estimation fiable, réalisée par une équipe qui connaît réellement le
            terrain — pas un algorithme générique.
          </p>
        </div>
      </div>

      <div className="container-roc grid gap-14 py-16 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              [TrendingUp, "Analyse du marché local"],
              [Clock3, "Réponse sous 24h"],
              [ShieldCheck, "Sans engagement"],
            ].map(([Icon, label]: any) => (
              <div key={label} className="rounded-sm border border-ligne bg-craie-100 p-4 text-center">
                <Icon className="mx-auto text-pinot" size={22} />
                <p className="mt-2 text-xs font-medium text-ardoise">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-6">
            {STEPS.map(([n, title, text]) => (
              <div key={title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pinot font-[family-name:var(--font-data)] text-sm font-semibold text-craie-100">
                  {n}
                </span>
                <div>
                  <p className="font-semibold text-ardoise">{title}</p>
                  <p className="mt-1 text-sm text-encre/70">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-sm border border-ligne bg-craie-100 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-ardoise">
              <CheckCircle2 className="text-vigne" size={18} /> Pourquoi être précis dans vos réponses ?
            </p>
            <p className="mt-2 text-sm text-encre/70">
              Plus les informations transmises sont complètes (quartier exact, état du
              bien, dépendances), plus l'analyse préliminaire de notre équipe sera
              proche de la réalité du marché — avant même la visite d'expertise.
            </p>
          </div>
        </div>

        <div className="h-fit rounded-sm border border-ligne bg-craie-100 p-7">
          <EstimateForm />
        </div>
      </div>
    </div>
  );
}
