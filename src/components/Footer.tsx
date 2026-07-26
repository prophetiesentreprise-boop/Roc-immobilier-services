import Link from "next/link";
import { RooflineMotif } from "./RooflineMotif";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="relative mt-24 bg-ardoise text-craie-100 overflow-hidden">
      <RooflineMotif className="absolute top-0 left-0 w-full h-24 text-ardoise-700/70 -translate-y-1" />
      <div className="container-roc relative pt-24 pb-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl font-semibold">
              ROC <span className="text-colombage">Immobilier</span>
            </p>
            <p className="mt-3 text-sm text-craie-100/70">
              Agence indépendante à {siteConfig.city}, {siteConfig.country}. Vente, achat,
              location et gestion locative depuis {siteConfig.since}.
            </p>
          </div>

          <div>
            <p className="eyebrow text-colombage">Nos services</p>
            <ul className="mt-3 space-y-2 text-sm text-craie-100/80">
              <li><Link href="/acheter" className="hover:text-craie-100">Acheter un bien</Link></li>
              <li><Link href="/louer" className="hover:text-craie-100">Louer un bien</Link></li>
              <li><Link href="/estimer" className="hover:text-craie-100">Estimer mon bien</Link></li>
              <li><Link href="/nos-services" className="hover:text-craie-100">Tous nos services</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-colombage">Agence</p>
            <ul className="mt-3 space-y-2 text-sm text-craie-100/80">
              <li><Link href="/agence" className="hover:text-craie-100">Qui sommes-nous</Link></li>
              <li><Link href="/contact" className="hover:text-craie-100">Contact</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-craie-100">Mentions légales</Link></li>
              <li><Link href="/admin/login" className="hover:text-craie-100">Espace professionnel</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-colombage">Nous contacter</p>
            <ul className="mt-3 space-y-2 text-sm text-craie-100/80">
              <li>{siteConfig.address.line1}, {siteConfig.address.line2}</li>
              <li>{siteConfig.address.city}, {siteConfig.address.country}</li>
              <li>{siteConfig.phoneDisplay}</li>
              <li>{siteConfig.email}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-craie-100/15 pt-6 text-xs text-craie-100/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} ROC Immobilier — Carte professionnelle [à compléter] · Garantie financière sur demande.</p>
          <p>Site conçu pour ROC Immobilier.</p>
        </div>
      </div>
    </footer>
  );
}
