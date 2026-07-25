import { PropertyForm } from "@/components/admin/PropertyForm";

export default function NouveauBienPage() {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
        Ajouter un bien
      </h1>
      <p className="mt-1 mb-8 text-sm text-encre/60">
        Ce bien sera immédiatement visible sur le site public une fois publié.
      </p>
      <PropertyForm />
    </div>
  );
}
