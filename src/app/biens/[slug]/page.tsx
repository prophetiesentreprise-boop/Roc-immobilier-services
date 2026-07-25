import { notFound } from "next/navigation";
import { MapPin, Ruler, BedDouble, DoorOpen, Leaf, CalendarCheck } from "lucide-react";
import { getPropertyBySlug } from "@/lib/properties";
import { formatPrice } from "@/lib/format";
import { RooflineMotif } from "@/components/RooflineMotif";
import { LeadForm } from "@/components/LeadForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const dpeColor: Record<string, string> = {
    A: "#2f7d4f", B: "#5f9d4c", C: "#a3b93b", D: "#e4c93b",
    E: "#e79b3a", F: "#d9662f", G: "#c23b3b",
  };

  return (
    <div>
      <div
        className="relative h-72 sm:h-96"
        style={{ background: `linear-gradient(160deg, ${property.cover_color} 0%, #202B38 130%)` }}
      >
        <RooflineMotif className="absolute bottom-0 left-0 w-full h-24 text-craie-100/10" />
        <div className="container-roc absolute bottom-6 left-1/2 -translate-x-1/2">
          <span className="eyebrow rounded-sm bg-craie-100 px-2 py-1 text-[0.65rem] text-ardoise">
            {property.kind === "vente" ? "À vendre" : "À louer"} · {property.status === "disponible" ? "Disponible" : property.status}
          </span>
        </div>
      </div>

      <div className="container-roc grid gap-12 py-14 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="flex items-center gap-1 text-sm text-encre/60">
            <MapPin size={14} /> {property.city} ({property.postal_code})
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise sm:text-4xl">
            {property.title}
          </h1>
          <p className="mt-4 font-[family-name:var(--font-data)] text-2xl font-semibold text-pinot">
            {formatPrice(property.price, property.kind)}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              [Ruler, `${property.surface_m2} m²`, "Surface"],
              [DoorOpen, `${property.rooms}`, "Pièces"],
              [BedDouble, `${property.bedrooms}`, "Chambres"],
              [CalendarCheck, property.status === "disponible" ? "Oui" : "Non", "Disponible"],
            ].map(([Icon, value, label]: any) => (
              <div key={label} className="rounded-sm border border-ligne bg-craie-100 p-4 text-center">
                <Icon className="mx-auto text-pinot" size={20} />
                <p className="mt-2 font-semibold text-ardoise">{value}</p>
                <p className="text-xs text-encre/55">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-ardoise">
              Description
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-encre/80">{property.description}</p>
          </div>

          {property.highlights.length > 0 && (
            <div className="mt-8">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-ardoise">
                Points forts
              </h2>
              <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-encre/80">
                {property.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-pinot" /> {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-ardoise">
              Performance énergétique
            </h2>
            <div className="mt-4 flex gap-6">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-sm font-[family-name:var(--font-data)] text-lg font-bold text-white"
                  style={{ background: dpeColor[property.dpe] }}
                >
                  {property.dpe}
                </span>
                <p className="text-xs text-encre/60">DPE<br />(énergie)</p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-sm font-[family-name:var(--font-data)] text-lg font-bold text-white"
                  style={{ background: dpeColor[property.ges] }}
                >
                  {property.ges}
                </span>
                <p className="text-xs text-encre/60">GES<br />(climat)</p>
              </div>
              <Leaf className="ml-auto text-vigne" size={22} />
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-sm border border-ligne bg-craie-100 p-6">
          <p className="eyebrow">Ce bien vous intéresse ?</p>
          <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-ardoise">
            Demander une visite
          </h2>
          <p className="mt-2 text-sm text-encre/65">
            Un conseiller ROC Immobilier vous recontacte sous 24h pour organiser une visite
            ou répondre à vos questions.
          </p>
          <div className="mt-5">
            <LeadForm type="visite" propertyId={property.id} submitLabel="Demander une visite" />
          </div>
        </aside>
      </div>
    </div>
  );
}
