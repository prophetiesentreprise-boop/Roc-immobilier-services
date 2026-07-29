import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TeamMemberForm } from "@/components/admin/TeamMemberForm";
import { TeamMember } from "@/lib/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMembrePage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  if (!supabase) notFound();

  const { data } = await supabase.from("team_members").select("*").eq("id", id).single();
  if (!data) notFound();

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
        Modifier ce membre
      </h1>
      <p className="mt-1 mb-8 text-sm text-encre/60">{(data as TeamMember).full_name}</p>
      <TeamMemberForm member={data as TeamMember} />
    </div>
  );
}
