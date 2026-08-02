import Link from "next/link";
import { ShieldCheck, KeyRound, ClipboardList, Handshake, Star, ArrowRight, Compass, Zap, HeartHandshake, Award } from "lucide-react";
import { HeroSearch } from "@/components/HeroSearch";
import { PropertyCard } from "@/components/PropertyCard";
import { RooflineMotif } from "@/components/RooflineMotif";
import { StatCard } from "@/components/StatCard";
import { getFeaturedProperties } from "@/lib/properties";
import { getSiteSettings } from "@/lib/site-settings";
import { getBackgroundImages } from "@/lib/backgrounds";
import { PhotoBackdrop } from "@/components/PhotoBackdrop";
import { FeaturedPropertyBackdrop } from "@/components/FeaturedPropertyBackdrop";

export default async function Home() {
  const [featured, settings, backgrounds] = await Promise.all([
    getFeaturedProperties(),
    getSiteSettings(),
    getBackgroundImages(),
  ]);

  const titleWords = settings.hero_title.trim().split(" ");
  const lastWord = titleWords.pop();
  const titleStart = titleWords.join(" ");

  const valueProps = [
    { icon: Compass, title: settings.value_prop_title_1, text: settings.value_prop_text_1 },
    { icon: Zap, title: settings.value_prop_title_2, text: settings.value_prop_text_2 },
    { icon: HeartHandshake, title: settings.value_prop_title_3, text: settings.value_prop_text_3 },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-craie pt-16 pb-20">
        <div className="container-roc grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="eyebrow">{settings.hero_eyebrow}</p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.08] text-ardoise sm:text-5xl">
              {titleStart} <span className="text-pinot italic">{lastWord}</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-encre/75">{settings.hero_subtitle}</p>

            <div className="mt-8">
              <HeroSearch />
            </div>

            <p className="mt-4 text-xs text-encre/50">
              Exemple : « Villa à Cocody », « Appartement à Marcory »…
            </p>
          </div>

          <div className="relative h-[420px] overflow-hidden rounded-sm border border-ligne bg-ardoise">
            <FeaturedPropertyBackdrop
              photos={featured[0]?.photos ?? []}
              fallbackPhotoUrl={backgrounds.home_hero}
              fallbackGradient="linear-gradient(150deg, #3340B6 0%, #262F82 75%)"
            />
            <RooflineMotif className="absolute bottom-0 left-0 w-full h-2/3 text-craie/10" />
            <div className="absolute left-6 top-6 right-6 rounded-sm bg-craie-100/95 p-5">
              <p className="eyebrow">Bien du moment</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-ardoise">
                {featured[0]?.title ?? "Découvrez nos biens"}
              </p>
              <p className="mt-1 text-sm text-encre/60">
                {featured[0] ? `${featured[0].city} · ${featured[0].surface_m2} m²` : "Abidjan et région"}
              </p>
              <Link
                href={featured[0] ? `/biens/${featured[0].slug}` : "/acheter"}
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-pinot"
              >
                Voir le bien <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VALEURS (bandeau façon "pourquoi nous choisir") */}
      <section className="border-y border-ligne bg-craie-100">
        <div className="container-roc grid gap-8 py-10 sm:grid-cols-3">
          {valueProps.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-4">
              <Icon className="mt-0.5 shrink-0 text-pinot" size={24} />
              <div>
                <p className="font-[family-name:var(--font-display)] font-semibold text-ardoise">{title}</p>
                <p className="mt-1 text-sm text-encre/65">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-ardoise py-16">
        <div className="container-roc">
          <p className="eyebrow text-colombage">En chiffres</p>
          <h2 className="mt-2 max-w-md font-[family-name:var(--font-display)] text-2xl font-semibold text-craie-100">
            Une expertise qui se mesure, pas seulement qui se déclare
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={Award} value="9 ans" label="d'expertise locale" accent="#5A66C9" />
            <StatCard icon={ShieldCheck} value="100%" label="biens vérifiés & agréés" accent="#4C8B57" />
            <StatCard icon={Zap} value="72h" label="délai moyen de réponse" accent="#3340B6" />
            <StatCard icon={Handshake} value="4/4" label="activités : vente, achat, location, gestion" accent="#FF5100" />
          </div>
        </div>
      </section>

      {/* BIENS EN AVANT */}
      <section className="container-roc py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Sélection</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
              Nos biens disponibles du moment
            </h2>
          </div>
          <Link href="/acheter" className="btn-ghost text-sm">
            Voir tous les biens <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-craie-100 py-24">
        <div className="container-roc">
          <p className="eyebrow">Nos expertises</p>
          <h2 className="mt-2 max-w-xl font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
            Un accompagnement complet, à chaque étape de votre projet
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Handshake, title: "Vente", text: "Estimation, publicité ciblée, négociation et suivi notarial.", href: "/acheter" },
              { icon: KeyRound, title: "Achat", text: "Recherche personnalisée et accompagnement jusqu'à la signature.", href: "/acheter" },
              { icon: ClipboardList, title: "Location", text: "Sélection des candidats, dossier locataire, état des lieux.", href: "/louer" },
              { icon: ShieldCheck, title: "Gestion locative", text: "Encaissement des loyers, reporting propriétaire, entretien du bien.", href: "/nos-services" },
            ].map(({ icon: Icon, title, text, href }) => (
              <Link key={title} href={href} className="card-lift group rounded-sm border border-ligne bg-craie p-6">
                <Icon className="text-pinot" size={26} />
                <p className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold text-ardoise">
                  {title}
                </p>
                <p className="mt-2 text-sm text-encre/70">{text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-pinot opacity-0 transition-opacity group-hover:opacity-100">
                  En savoir plus <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TEMOIGNAGES */}
      <section className="container-roc py-24">
        <p className="eyebrow">Ils nous ont fait confiance</p>
        <h2 className="mt-2 max-w-xl font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
          La satisfaction de nos clients, notre meilleure référence
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            { name: "Élise M.", text: "Vente conclue en six semaines, un accompagnement transparent du premier rendez-vous jusqu'à l'acte." },
            { name: "Karim B.", text: "Gestion locative fiable : rapports mensuels clairs et réactivité en cas de souci sur le bien." },
            { name: "Anne-Sophie R.", text: "Recherche d'appartement suivie de près, avec des visites correspondant vraiment à nos critères." },
          ].map((t) => (
            <div key={t.name} className="rounded-sm border border-ligne bg-craie-100 p-6">
              <div className="flex gap-0.5 text-colombage">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-4 text-sm text-encre/80">"{t.text}"</p>
              <p className="mt-4 text-sm font-semibold text-ardoise">{t.name}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-encre/45">
          Avis illustratifs — à remplacer par vos avis Google vérifiés (voir README, section avis clients).
        </p>
      </section>

      {/* CTA ESTIMATION */}
      <section className="container-roc pb-24">
        <div className="relative overflow-hidden rounded-sm bg-pinot px-8 py-16 text-craie-100 sm:px-16">
          <PhotoBackdrop photoUrl={backgrounds.home_cta} fallbackGradient="none" overlay="bg-pinot/70" />
          <RooflineMotif className="absolute -bottom-4 left-0 w-full h-24 text-craie-100/10" />
          <div className="relative max-w-lg">
            <p className="eyebrow text-craie-100/70">Estimation gratuite</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold">
              Combien vaut votre bien aujourd'hui ?
            </h2>
            <p className="mt-3 text-sm text-craie-100/80">
              Obtenez une première fourchette de prix en ligne, puis un rendez-vous avec un
              expert local pour affiner l'estimation.
            </p>
            <Link href="/estimer" className="btn-primary mt-6 bg-craie-100 text-pinot hover:bg-craie">
              Estimer mon bien <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
