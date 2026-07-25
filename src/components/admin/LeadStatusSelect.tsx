"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Lead } from "@/lib/types";

export function LeadStatusSelect({ leadId, status }: { leadId: string; status: Lead["status"] }) {
  const router = useRouter();

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.from("leads").update({ status: e.target.value }).eq("id", leadId);
    router.refresh();
  }

  return (
    <select
      defaultValue={status}
      onChange={handleChange}
      className="rounded-sm border border-ligne bg-white px-2 py-1 text-xs"
    >
      <option value="nouveau">Nouveau</option>
      <option value="en_cours">En cours</option>
      <option value="traite">Traité</option>
    </select>
  );
}
