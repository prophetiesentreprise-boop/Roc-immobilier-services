import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";

export const metadata = { title: "Contact — ROC Immobilier Services" };

export default function ContactPage() {
  return (
    <div className="container-roc grid gap-14 py-16 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold text-ardoise">
          Parlons de votre projet
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-encre/75">
          Notre équipe vous répond sous 24h ouvrées. Pour une urgence, appelez-nous
          directement.
        </p>

        <div className="mt-8 space-y-5 text-sm text-encre/80">
          <p className="flex items-center gap-3"><MapPin size={18} className="text-pinot" />  Abidjan – Cocody - Genie 2000- Non de Playce Palmeraie</p>
          <p className="flex items-center gap-3"><Phone size={18} className="text-pinot" /> +225 05 76 83 84 84</p>
          <p className="flex items-center gap-3"><Mail size={18} className="text-pinot" /> info@rocimmobilierservice.ci</p>
          <p className="flex items-center gap-3"><Clock size={18} className="text-pinot" /> Lun–Ven 8h–18h00 · Sam 9h–12h30</p>
        </div>

        <div className="mt-10 aspect-video overflow-hidden rounded-sm border border-ligne">
          <iframe
            title="Localisation de l'agence ROC Immobilier à Abidjan"
            className="h-full w-full"
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=7.34%2C48.07%2C7.38%2C48.09&layer=mapnik"
          />
        </div>
      </div>

      <div className="h-fit rounded-sm border border-ligne bg-craie-100 p-7">
        <p className="eyebrow">Formulaire</p>
        <h2 className="mt-1 mb-5 font-[family-name:var(--font-display)] text-xl font-semibold text-ardoise">
          Envoyez-nous un message
        </h2>
        <LeadForm type="contact" submitLabel="Envoyer le message" />
      </div>
    </div>
  );
}
