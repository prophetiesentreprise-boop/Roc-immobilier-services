import { Suspense } from "react";
import { FiltersBar } from "@/components/FiltersBar";
import { PropertyCard } from "@/components/PropertyCard";
import { getProperties } from "@/lib/properties";

export const metadata = { title: "Louer un bien — Roc Immobilier SErvices" };

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function LouerPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const properties = await getProperties({
    kind: "location",
    city: params.ville,
    category: params.type,
    minPrice: params.min ? Number(params.min) : undefined,
    maxPrice: params.max ? Number(params.max) : undefined,
  });

  return (
    <div className="container-roc py-16">
      <p className="eyebrow">Louer</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold text-ardoise">
        Nos biens à louer
      </h1>
      <p className="mt-3 max-w-xl text-sm text-encre/70">
        {properties.length} bien{properties.length > 1 ? "s" : ""} disponible
        {properties.length > 1 ? "s" : ""} à la location à Abidjan et environs.
      </p>

      <div className="mt-6 flex items-start gap-3 rounded-sm border border-ligne bg-craie-100 p-4 text-sm text-encre/70">
        <span className="eyebrow shrink-0">Bon à savoir</span>
        <p>
          Préparez votre dossier locataire (pièce d'identité, justificatif de revenus,
          dépôt de garantie) pour accélérer la réservation d'un bien qui vous plaît.
          <a href="/contact" className="text-pinot underline"> Contactez-nous</a> pour
          connaître la liste exacte des pièces demandées.
        </p>
      </div>

      <div className="mt-8">
        <Suspense>
          <FiltersBar />
        </Suspense>
      </div>

      {properties.length === 0 ? (
        <p className="rounded-sm border border-ligne bg-craie-100 p-8 text-center text-sm text-encre/60">
          Aucun bien ne correspond à ces critères pour le moment. Essayez d'élargir votre
          recherche ou créez une alerte depuis la page Contact.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
