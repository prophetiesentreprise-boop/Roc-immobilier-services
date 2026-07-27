import { CalendarClock, MapPin, Phone, Clock } from "lucide-react";
import { AppointmentForm } from "@/components/AppointmentForm";
import { siteConfig } from "@/lib/site-config";

export const metadata = { title: "Prendre rendez-vous — ROC Immobilier Services" };

export default function RdvPage() {
  return (
    <div className="container-roc grid gap-14 py-16 lg:grid-cols-[1fr_1.15fr]">
      <div>
        <p className="eyebrow">Rendez-vous</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold text-ardoise">
          Planifiez un rendez-vous avec un conseiller
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-encre/75">
          Visite d'un bien, estimation sur place, mise en location ou simple prise de
          contact : choisissez le motif et le créneau qui vous conviennent.
        </p>

        <div className="mt-8 flex items-start gap-3 rounded-sm border border-colombage/40 bg-colombage/10 p-4 text-sm text-encre/75">
          <CalendarClock className="mt-0.5 shrink-0 text-colombage" size={20} />
          <p>
            Pour garantir la disponibilité de notre équipe, les rendez-vous doivent être
            pris <strong>au moins 48h à l'avance</strong>. Pour une urgence, contactez-nous
            directement par téléphone ou WhatsApp.
          </p>
        </div>

        <div className="mt-8 space-y-4 text-sm text-encre/80">
          <p className="flex items-center gap-3">
            <MapPin size={18} className="text-pinot" />
            {siteConfig.address.line1}, {siteConfig.address.line2} — {siteConfig.address.city}
          </p>
          <p className="flex items-center gap-3"><Phone size={18} className="text-pinot" /> {siteConfig.phoneDisplay}</p>
          <p className="flex items-center gap-3"><Clock size={18} className="text-pinot" /> {siteConfig.hours}</p>
        </div>
      </div>

      <div className="h-fit rounded-sm border border-ligne bg-craie-100 p-7">
        <AppointmentForm />
      </div>
    </div>
  );
}
