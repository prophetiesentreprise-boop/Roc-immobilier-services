import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { siteConfig, whatsappLink } from "@/lib/site-config";

export const metadata = { title: "Contact — ROC Immobilier" };

export default function ContactPage() {
  return (
    <div className="container-roc grid gap-14 py-16 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold text-ardoise">
          Parlons de votre projet
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-encre/75">
          Notre équipe vous répond sous 24h ouvrées. Pour une réponse plus rapide,
          écrivez-nous directement sur WhatsApp.
        </p>

        <div className="mt-8 space-y-5 text-sm text-encre/80">
          <p className="flex items-center gap-3">
            <MapPin size={18} className="text-pinot" />
            {siteConfig.address.line1}, {siteConfig.address.line2} — {siteConfig.address.city}, {siteConfig.address.country}
          </p>
          <p className="flex items-center gap-3"><Phone size={18} className="text-pinot" /> {siteConfig.phoneDisplay}</p>
          <p className="flex items-center gap-3"><Mail size={18} className="text-pinot" /> {siteConfig.email}</p>
          <p className="flex items-center gap-3"><Clock size={18} className="text-pinot" /> {siteConfig.hours}</p>
        </div>

        <a
          href={whatsappLink("Bonjour ROC Immobilier, je souhaite avoir plus d'informations sur vos services.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-sm bg-vigne px-5 py-3 text-sm font-semibold text-craie-100 hover:opacity-90"
        >
          <MessageCircle size={17} /> Nous écrire sur WhatsApp
        </a>

        <div className="mt-10 aspect-video overflow-hidden rounded-sm border border-ligne">
          <iframe
            title="Localisation de l'agence ROC Immobilier — Cocody, Génie 2000, Abidjan"
            className="h-full w-full"
            loading="lazy"
            src={siteConfig.mapEmbedUrl}
          />
        </div>
        <p className="mt-2 text-xs text-encre/50">
          Cocody, Génie 2000 — non loin de Playce Palmeraie, Abidjan.
        </p>
      </div>

      <div className="h-fit rounded-sm border border-ligne bg-craie-100 p-7">
        <p className="eyebrow">Formulaire</p>
        <h2 className="mt-1 mb-5 font-[family-name:var(--font-display)] text-xl font-semibold text-ardoise">
          Envoyez-nous un message
        </h2>
        <LeadForm type="contact" submitLabel="Envoyer le message" />
        <p className="mt-4 text-xs text-encre/50">
          Votre message est enregistré et visible immédiatement par notre équipe dans
          notre espace professionnel. Pour une réponse encore plus rapide, écrivez-nous
          directement via WhatsApp ci-contre.
        </p>
      </div>
    </div>
  );
}
