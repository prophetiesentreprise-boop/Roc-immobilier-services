import { Suspense } from "react";
import { FiltersBar } from "@/components/FiltersBar";
import { PropertyCard } from "@/components/PropertyCard";
import { getProperties } from "@/lib/properties";

export const metadata = { title: "Acheter un bien — ROC Immobilier Services" };

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function AcheterPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const properties = await getProperties({
    kind: "vente",
    city: params.ville,
    category: params.type,
    minPrice: params.min ? Number(params.min) : undefined,
    maxPrice: params.max ? Number(params.max) : undefined,
  });

  return (
    <div className="container-roc py-16">
      <p className="eyebrow">Acheter</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold text-ardoise">
        Nos biens à vendre
      </h1>
      <p className="mt-3 max-w-xl text-sm text-encre/70">
        {properties.length} bien{properties.length > 1 ? "s" : ""} disponible
        {properties.length > 1 ? "s" : ""} à la vente à Abidjan et environs.
      </p>

      <div className="mt-6 flex items-start gap-3 rounded-sm border border-ligne bg-craie-100 p-4 text-sm text-encre/70">
        <span className="eyebrow shrink-0">Bon à savoir</span>
        <p>
          Chaque bien à la vente est vérifié par notre équipe (titre de propriété,
          situation du dossier). Besoin d'aide pour évaluer votre capacité d'achat ou le
          montage du dossier ? <a href="/contact" className="text-pinot underline">Contactez un conseiller</a>.
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
