import Link from "next/link";
import {
  Handshake, KeyRound, ClipboardList, ShieldCheck, Scale, Building2, ArrowRight,
} from "lucide-react";
import { RooflineMotif } from "@/components/RooflineMotif";
import { PhotoBackdrop } from "@/components/PhotoBackdrop";
import { getBackgroundImages } from "@/lib/backgrounds";

export const metadata = { title: "Nos services — Roc Immobilier SErvices" };

const SERVICES = [
  {
    icon: Handshake,
    title: "Vente",
    bgKey: "service_vente",
    tag: "Propriétaires",
    color: "#3340B6",
    text:
      "De l'estimation à la signature définitive, nous pilotons chaque étape de la vente de votre bien : diffusion ciblée, visites qualifiées, négociation et suivi jusqu'à l'acte notarié.",
    points: ["Estimation gratuite", "Diffusion large de l'annonce", "Négociation par un expert", "Suivi du dossier notarial"],
    href: "/estimer",
  },
  {
    icon: KeyRound,
    title: "Achat",
    bgKey: "service_achat",
    tag: "Acquéreurs & investisseurs",
    color: "#4C8B57",
    text:
      "Nous recherchons pour vous le bien qui correspond réellement à votre projet — résidence principale ou investissement locatif — et vous accompagnons jusqu'à la remise des clés.",
    points: ["Recherche personnalisée", "Visites organisées", "Analyse du marché local", "Accompagnement financement"],
    href: "/acheter",
  },
  {
    icon: ClipboardList,
    title: "Location",
    bgKey: "service_location",
    tag: "Locataires & propriétaires",
    color: "#262F82",
    text:
      "Sélection rigoureuse des candidats, constitution du dossier locataire, rédaction du bail et état des lieux : une mise en location sereine, des deux côtés.",
    points: ["Vérification des dossiers", "Rédaction du bail", "État des lieux numérique", "Remise des clés"],
    href: "/louer",
  },
  {
    icon: ShieldCheck,
    title: "Gestion locative",
    bgKey: "service_gestion",
    tag: "Propriétaires bailleurs",
    color: "#FF5100",
    text:
      "Confiez la gestion quotidienne de votre bien : encaissement des loyers, relances, coordination des travaux et reporting mensuel clair et transparent.",
    points: ["Encaissement des loyers", "Relance des impayés", "Suivi des travaux", "Reporting mensuel"],
    href: "/contact",
  },
  {
    icon: Building2,
    title: "Investissement immobilier",
    bgKey: "service_investissement",
    tag: "Investisseurs",
    color: "#3340B6",
    text:
      "Nous identifions les opportunités les plus rentables du marché abidjanais et vous aidons à construire un patrimoine immobilier durable, en location ou en revente.",
    points: ["Analyse de rentabilité", "Sélection d'opportunités", "Simulation de revenus locatifs", "Suivi post-acquisition"],
    href: "/contact",
  },
  {
    icon: Scale,
    title: "Accompagnement juridique",
    bgKey: "service_juridique",
    tag: "Tous nos clients",
    color: "#4C8B57",
    text:
      "Nous coordonnons les démarches administratives et juridiques liées à votre projet (titres fonciers, actes, formalités notariales) avec nos partenaires de confiance.",
    points: ["Vérification des titres", "Coordination notariale", "Conformité réglementaire", "Conseils personnalisés"],
    href: "/contact",
  },
];

export default async function NosServicesPage() {
  const backgrounds = await getBackgroundImages();
  return (
    <div>
      <div className="relative overflow-hidden py-20 text-craie-100">
        <PhotoBackdrop photoUrl={backgrounds.services_banner} fallbackGradient="linear-gradient(135deg, #262F82 0%, #3340B6 100%)" overlay="bg-ardoise/40" />
        <RooflineMotif className="absolute bottom-0 left-0 w-full h-20 text-craie-100/5" />
        <div className="container-roc relative">
          <p className="eyebrow text-colombage">Nos services</p>
          <h1 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-5xl font-semibold">
            Un <strong className="font-bold">accompagnement complet</strong> pour <strong className="font-bold">chaque projet</strong> immobilier
          </h1>
          <p className="mt-4 max-w-lg text-base text-craie-100/85">
            Vente, achat, location, gestion locative, investissement : Roc Immobilier SErvices
            réunit sous un même toit toute l'expertise nécessaire à votre projet à
            Abidjan et dans sa région.
          </p>
        </div>
      </div>

      <div className="container-roc py-20">
        <div className="grid gap-16">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className={`grid gap-8 lg:grid-cols-2 lg:items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="relative h-64 overflow-hidden rounded-sm">
                <PhotoBackdrop
                  photoUrl={backgrounds[service.bgKey]}
                  fallbackGradient={`linear-gradient(150deg, ${service.color} 0%, #262F82 130%)`}
                  overlay="bg-ardoise/30"
                />
                <RooflineMotif className="absolute bottom-0 left-0 w-full h-16 text-craie-100/10" />
                <service.icon className="absolute right-6 top-6 text-craie-100/70" size={32} />
              </div>

              <div>
                <p className="eyebrow">{service.tag}</p>
                <h2 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
                  {service.title}
                </h2>
                <p className="mt-3 text-base font-medium leading-relaxed text-encre/85">{service.text}</p>
                <ul className="mt-4 grid grid-cols-2 gap-2 text-base font-medium text-encre/80">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-pinot" /> {point}
                    </li>
                  ))}
                </ul>
                <Link href={service.href} className="mt-5 inline-flex items-center gap-1 text-base font-semibold text-pinot">
                  En savoir plus <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-roc pb-24">
        <div className="relative overflow-hidden rounded-sm bg-pinot px-8 py-14 text-center text-craie-100 sm:px-16">
          <PhotoBackdrop photoUrl={backgrounds.services_cta} fallbackGradient="none" overlay="bg-pinot/70" />
          <h2 className="relative font-[family-name:var(--font-display)] text-3xl font-semibold">
            Un projet en tête ? Parlons-en.
          </h2>
          <p className="relative mx-auto mt-2 max-w-md text-base text-craie-100/85">
            Nos conseillers vous répondent sous 72h ouvrées pour définir ensemble la
            meilleure approche.
          </p>
          <Link href="/contact" className="btn-primary relative mt-6 bg-craie-100 text-pinot hover:bg-craie">
            Prendre contact <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
