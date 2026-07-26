"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Appointment } from "@/lib/types";

export function AppointmentStatusSelect({ id, status }: { id: string; status: Appointment["status"] }) {
  const router = useRouter();

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.from("appointments").update({ status: e.target.value }).eq("id", id);
    router.refresh();
  }

  return (
    <select
      defaultValue={status}
      onChange={handleChange}
      className="rounded-sm border border-ligne bg-white px-2 py-1 text-xs"
    >
      <option value="nouveau">Nouveau</option>
      <option value="confirme">Confirmé</option>
      <option value="annule">Annulé</option>
    </select>
  );
}
