"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Lead } from "@/lib/types";

export function LeadStatusSelect({ leadId, status }: { leadId: string; status: Lead["status"] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    setLoading(true);

    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      return;
    }
    await supabase.from("leads").update({ status: newStatus }).eq("id", leadId);

    if (newStatus === "traite") {
      try {
        await fetch("/api/admin/close-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ leadId }),
        });
      } catch {
        // La demande reste marquée comme traitée même si l'e-mail échoue.
      }
    }

    setLoading(false);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1.5">
      <select
        defaultValue={status}
        onChange={handleChange}
        disabled={loading}
        className="rounded-sm border border-ligne bg-white px-2 py-1 text-xs"
      >
        <option value="nouveau">Nouveau</option>
        <option value="en_cours">En cours</option>
        <option value="traite">Traité</option>
      </select>
      {loading && <Loader2 size={13} className="animate-spin text-encre/40" />}
    </div>
  );
}
