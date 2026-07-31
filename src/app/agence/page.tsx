import { ShieldCheck, Users, Award, Target, Heart, Handshake, Zap, Phone, Mail, MessageCircle } from "lucide-react";
import { RooflineMotif } from "@/components/RooflineMotif";
import { StatCard } from "@/components/StatCard";
import { siteConfig } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/site-settings";
import { getTeamMembers } from "@/lib/team";

export const metadata = { title: "L'agence — Roc Immobilier SErvices" };

const VALEURS = [
  { icon: Heart, title: "Écoute", text: "Chaque projet est unique : nous prenons le temps de comprendre vos besoins réels avant de proposer une solution." },
  { icon: ShieldCheck, title: "Transparence", text: "Prix, délais, frais : nous communiquons clairement à chaque étape, sans mauvaise surprise." },
  { icon: Target, title: "Exigence", text: "Chaque bien et chaque dossier sont vérifiés avec rigueur avant d'être proposés à nos clients." },
  { icon: Handshake, title: "Engagement", text: "Nous restons disponibles jusqu'à la conclusion effective de votre projet, et au-delà si besoin." },
];

export default async function AgencePage() {
  const [settings, team] = await Promise.all([getSiteSettings(), getTeamMembers()]);
  const heroPhoto = settings.agency_hero_photo_url;

  return (
    <div>
      {/* BANNIERE */}
      <div className="relative overflow-hidden py-24 text-craie-100">
        {heroPhoto ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ardoise via-ardoise/80 to-colombage/50" />
          </>
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #3340B6 0%, #FF5100 55%, #262F82 100%)" }} />
        )}
        <RooflineMotif className="absolute bottom-0 left-0 w-full h-20 text-craie-100/10" />
        <div className="container-roc relative">
          <p className="eyebrow text-craie-100/80">L'agence</p>
          <h1 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-4xl font-semibold sm:text-5xl">
            Une agence agréée, fondée sur des valeurs humaines
          </h1>
          <p className="mt-5 max-w-xl text-sm text-craie-100/85">
            Depuis {siteConfig.since}, Roc Immobilier SErvices accompagne particuliers et
            investisseurs à {siteConfig.city} dans leurs projets de vente, d'achat, de
            location et de gestion locative — avec la même exigence à chaque étape.
          </p>
        </div>
      </div>

      {/* CHIFFRES CLES */}
      <div className="bg-ardoise py-14">
        <div className="container-roc grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={Award} value="9 ans" label="d'expertise locale" accent="#5A66C9" />
          <StatCard icon={ShieldCheck} value="100%" label="biens vérifiés" accent="#4C8B57" />
          <StatCard icon={Zap} value="72h" label="délai moyen de réponse" accent="#3340B6" />
          <StatCard icon={Handshake} value="3" label="expertises réunies : vente, location, gestion" accent="#FF5100" />
        </div>
      </div>

      {/* NOTRE HISTOIRE */}
      <div className="container-roc grid gap-14 py-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="eyebrow">Notre histoire</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-ardoise">
            Une expertise construite sur le terrain, quartier par quartier
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-encre/80">{settings.agency_intro}</p>
          <p className="mt-4 text-sm leading-relaxed text-encre/80">
            Aujourd'hui, notre équipe combine expertise commerciale, rigueur juridique
            et connaissance du marché local pour offrir un accompagnement complet, de
            l'estimation à la signature définitive — et bien au-delà, grâce à notre
            pôle de gestion locative.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              [ShieldCheck, "Agréments", "Agence agréée N° 19-00046, agrément délivré le 14 mai 2019 (renouvelable)."],
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
            <li>— Conseil juridique et accompagnement fiscal.</li>
          </ul>
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
              <div key={title} className="card-lift rounded-sm border border-ligne bg-craie p-6">
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
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div key={member.id} className="card-lift overflow-hidden rounded-sm border border-ligne bg-craie-100">
              <div className="relative h-44 w-full overflow-hidden bg-craie">
                {member.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.photo_url} alt={member.full_name} className="h-full w-full object-cover" />
                ) : (
                  <div
                    className="h-full w-full"
                    style={{ background: "linear-gradient(150deg, #3340B6 0%, #262F82 130%)" }}
                  />
                )}
              </div>
              <div className="p-5">
                <p className="font-[family-name:var(--font-display)] font-semibold text-ardoise">{member.full_name}</p>
                <p className="mt-1 text-sm text-encre/65">{member.role}</p>

                {(member.phone || member.email || member.whatsapp || member.facebook_url || member.instagram_url || member.linkedin_url) && (
                  <div className="mt-4 flex flex-wrap gap-3 border-t border-ligne pt-4">
                    {member.phone && (
                      <a href={`tel:${member.phone}`} aria-label={`Appeler ${member.full_name}`} className="text-pinot hover:opacity-70">
                        <Phone size={16} />
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} aria-label={`Écrire à ${member.full_name}`} className="text-pinot hover:opacity-70">
                        <Mail size={16} />
                      </a>
                    )}
                    {member.whatsapp && (
                      <a
                        href={`https://wa.me/${member.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp de ${member.full_name}`}
                        className="text-vigne hover:opacity-70"
                      >
                        <MessageCircle size={16} />
                      </a>
                    )}
                    {member.facebook_url && (
                      <a href={member.facebook_url} target="_blank" rel="noopener noreferrer" aria-label={`Facebook de ${member.full_name}`} className="flex h-6 w-6 items-center justify-center rounded-full bg-colombage text-[0.6rem] font-bold text-craie-100 hover:opacity-80">
                        f
                      </a>
                    )}
                    {member.instagram_url && (
                      <a href={member.instagram_url} target="_blank" rel="noopener noreferrer" aria-label={`Instagram de ${member.full_name}`} className="flex h-6 w-6 items-center justify-center rounded-full bg-colombage text-[0.6rem] font-bold text-craie-100 hover:opacity-80">
                        IG
                      </a>
                    )}
                    {member.linkedin_url && (
                      <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${member.full_name}`} className="flex h-6 w-6 items-center justify-center rounded-full bg-colombage text-[0.6rem] font-bold text-craie-100 hover:opacity-80">
                        in
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-encre/50">
          Modifiable à tout moment depuis le back-office : Menu « Notre équipe ».
        </p>
      </div>
    </div>
  );
}
