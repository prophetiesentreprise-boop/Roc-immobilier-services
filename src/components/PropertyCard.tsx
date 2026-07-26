import Link from "next/link";
import { BedDouble, Ruler, MapPin } from "lucide-react";
import { Property } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { RooflineMotif } from "./RooflineMotif";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/biens/${property.slug}`}
      className="card-lift group block overflow-hidden rounded-sm border border-ligne bg-craie-100"
    >
      <div
        className="relative h-52 overflow-hidden"
        style={
          property.photos?.[0]
            ? undefined
            : { background: `linear-gradient(160deg, ${property.cover_color} 0%, #202b38 130%)` }
        }
      >
        {property.photos?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={property.photos[0]} alt={property.title} className="h-full w-full object-cover" />
        ) : (
          <RooflineMotif className="absolute bottom-0 left-0 w-full h-16 text-craie-100/15" />
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="eyebrow rounded-sm bg-craie-100 px-2 py-1 text-[0.65rem] text-ardoise">
            {property.kind === "vente" ? "À vendre" : "À louer"}
          </span>
          {property.featured && (
            <span className="eyebrow rounded-sm bg-pinot px-2 py-1 text-[0.65rem] text-craie-100">
              Coup de cœur
            </span>
          )}
        </div>
        <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-craie-100 font-[family-name:var(--font-data)] text-xs font-bold text-ardoise">
          {property.dpe}
        </span>
      </div>

      <div className="p-5">
        <p className="flex items-center gap-1 text-xs text-encre/60">
          <MapPin size={13} /> {property.city} ({property.postal_code})
        </p>
        <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug text-ardoise group-hover:text-pinot transition-colors">
          {property.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-encre/65">{property.description}</p>

        <div className="mt-3 flex items-center gap-4 text-sm text-encre/70">
          <span className="flex items-center gap-1">
            <Ruler size={15} /> {property.surface_m2} m²
          </span>
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble size={15} /> {property.bedrooms} ch.
            </span>
          )}
          <span className="text-encre/40">·</span>
          <span>{property.category}</span>
        </div>

        {property.highlights.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {property.highlights.slice(0, 3).map((h) => (
              <span key={h} className="rounded-full bg-craie px-2 py-0.5 text-[0.7rem] text-encre/65">
                {h}
              </span>
            ))}
          </div>
        )}

        <p className="mt-4 font-[family-name:var(--font-data)] text-xl font-semibold text-pinot">
          {formatPrice(property.price, property.kind)}
        </p>
      </div>
    </Link>
  );
}
