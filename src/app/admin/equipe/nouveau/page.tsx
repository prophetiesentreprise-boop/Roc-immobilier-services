import { TeamMemberForm } from "@/components/admin/TeamMemberForm";

export default function NouveauMembrePage() {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
        Ajouter un membre de l'équipe
      </h1>
      <p className="mt-1 mb-8 text-sm text-encre/60">
        Ce membre apparaîtra immédiatement sur la page « L'agence » du site.
      </p>
      <TeamMemberForm />
    </div>
  );
}
