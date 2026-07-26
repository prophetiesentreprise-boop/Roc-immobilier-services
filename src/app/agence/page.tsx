import { ShieldCheck, Users, Award, Target, Heart, Handshake } from "lucide-react";
import { RooflineMotif } from "@/components/RooflineMotif";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "L'agence — ROC Immobilier" };

const VALEURS = [
  { icon: Heart, title: "Écoute", text: "Chaque projet est unique : nous prenons le temps de comprendre vos besoins réels avant de proposer une solution." },
  { icon: ShieldCheck, title: "Transparence", text: "Prix, délais, frais : nous communiquons clairement à chaque étape, sans mauvaise surprise." },
  { icon: Target, title: "Exigence", text: "Chaque bien et chaque dossier sont vérifiés avec rigueur avant d'être proposés à nos clients." },
  { icon: Handshake, title: "Engagement", text: "Nous restons disponibles jusqu'à la conclusion effective de votre projet, et au-delà si besoin." },
];

const EQUIPE = [
  { role: "Direction", text: "Pilotage général de l'agence et des grands comptes." },
  { role: "Conseillers Vente & Achat", text: "Accompagnement des particuliers et investisseurs." },
  { role: "Gestion locative", text: "Suivi des propriétaires bailleurs et des locataires." },
];

export default function AgencePage() {
  return (
    <div>
      <div className="relative overflow-hidden bg-ardoise py-24 text-craie-100">
        <RooflineMotif className="absolute bottom-0 left-0 w-full h-20 text-craie-100/5" />
        <div className="container-roc relative">
          <p className="eyebrow text-colombage">L'agence</p>
          <h1 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-semibold sm:text-5xl">
            Une agence indépendante, fondée sur des valeurs humaines
          </h1>
          <p className="mt-5 max-w-xl text-sm text-craie-100/75">
            Depuis {siteConfig.since}, ROC Immobilier accompagne particuliers et
            investisseurs à {siteConfig.city} dans leurs projets de vente, d'achat, de
            location et de gestion locative — avec la même exigence à chaque étape.
          </p>
        </div>
      </div>

      {/* CHIFFRES CLES */}
      <div className="border-b border-ligne bg-craie-100">
        <div className="container-roc grid grid-cols-2 gap-8 py-10 sm:grid-cols-4">
          {[
            ["9 ans", "d'expertise locale"],
            ["100%", "biens vérifiés"],
            ["24h", "délai moyen de réponse"],
            ["3", "expertises réunies : vente, location, gestion"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="font-[family-name:var(--font-display)] text-3xl font-semibold text-pinot">{value}</p>
              <p className="mt-1 text-xs text-encre/60">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* NOTRE HISTOIRE */}
      <div className="container-roc grid gap-14 py-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="eyebrow">Notre histoire</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-ardoise">
            Une expertise construite sur le terrain, quartier par quartier
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-encre/80">
            ROC Immobilier est née de la conviction qu'une agence immobilière doit avant
            tout être une agence de confiance : proche de ses clients, précise dans ses
            estimations, et rigoureuse dans le suivi de chaque dossier. Depuis nos
            débuts, nous avons accompagné des centaines de familles et d'investisseurs
            dans leurs projets à {siteConfig.city} et dans sa région, en construisant
            une connaissance fine des quartiers, des prix et des dynamiques locales.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-encre/80">
            Aujourd'hui, notre équipe combine expertise commerciale, rigueur juridique
            et connaissance du marché local pour offrir un accompagnement complet, de
            l'estimation à la signature définitive — et bien au-delà, grâce à notre
            pôle de gestion locative.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              [ShieldCheck, "Agréments", "Documents professionnels et garanties à jour, communiqués sur simple demande."],
              [Users, "Équipe locale", "Des conseillers spécialisés vente, location et gestion, basés à Abidjan."],
              [Award, `${siteConfig.since} → aujourd'hui`, "Une expertise construite sur le terrain, secteur par secteur."],
            ].map(([Icon, title, text]: any) => (
              <div key={title} className="rounded-sm border border-ligne bg-craie-100 p-5">
                <Icon className="text-pinot" size={22} />
                <p className="mt-3 font-semibold text-ardoise">{title}</p>
                <p className="mt-1 text-xs text-encre/65">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-fit rounded-sm border border-ligne bg-craie-100 p-7">
          <p className="eyebrow">Nos engagements</p>
          <ul className="mt-4 space-y-3 text-sm text-encre/80">
            <li>— Écoute active et analyse précise de chaque besoin.</li>
            <li>— Transparence sur les prix, les délais et les frais.</li>
            <li>— Suivi personnalisé jusqu'à la signature définitive.</li>
            <li>— Confidentialité et protection des données clients.</li>
          </ul>
          <p className="mt-6 text-xs text-encre/50">
            Remplacez ce texte et ces chiffres par les informations exactes de l'agence
            avant la mise en ligne (agréments, numéro RCCM, garantie financière).
          </p>
        </div>
      </div>

      {/* VALEURS */}
      <div className="bg-craie-100 py-20">
        <div className="container-roc">
          <p className="eyebrow">Nos valeurs</p>
          <h2 className="mt-2 max-w-lg font-[family-name:var(--font-display)] text-2xl font-semibold text-ardoise">
            Ce qui guide chacune de nos décisions
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALEURS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-sm border border-ligne bg-craie p-6">
                <Icon className="text-pinot" size={24} />
                <p className="mt-3 font-[family-name:var(--font-display)] font-semibold text-ardoise">{title}</p>
                <p className="mt-2 text-sm text-encre/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EQUIPE */}
      <div className="container-roc py-20">
        <p className="eyebrow">Notre équipe</p>
        <h2 className="mt-2 max-w-lg font-[family-name:var(--font-display)] text-2xl font-semibold text-ardoise">
          Des experts dédiés à chaque étape de votre projet
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {EQUIPE.map((member) => (
            <div key={member.role} className="rounded-sm border border-ligne bg-craie-100 p-6">
              <div
                className="h-32 w-full rounded-sm"
                style={{ background: "linear-gradient(150deg, #8B5A34 0%, #202B38 130%)" }}
              />
              <p className="mt-4 font-[family-name:var(--font-display)] font-semibold text-ardoise">{member.role}</p>
              <p className="mt-1 text-sm text-encre/65">{member.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-encre/50">
          Remplacez ces blocs par les photos et noms réels de votre équipe une fois
          l'upload de photos activé (voir Phase 2 du projet).
        </p>
      </div>
    </div>
  );
}
