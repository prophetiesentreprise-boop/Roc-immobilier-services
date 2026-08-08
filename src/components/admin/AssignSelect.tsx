"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, UserCheck } from "lucide-react";
import { TeamMember } from "@/lib/types";

interface AssignSelectProps {
  table: "leads" | "appointments";
  id: string;
  currentAssignee: string | null;
  members: TeamMember[];
}

export function AssignSelect({ table, id, currentAssignee, members }: AssignSelectProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const memberId = e.target.value;
    if (!memberId) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table, id, memberId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <UserCheck size={13} className="text-encre/40" />
      <select
        defaultValue={currentAssignee ?? ""}
        onChange={handleChange}
        disabled={loading}
        className="rounded-sm border border-ligne bg-white px-2 py-1 text-xs"
      >
        <option value="" disabled>
          {loading ? "Attribution..." : "Attribuer à..."}
        </option>
        {members.map((m) => (
          <option key={m.id} value={m.id}>{m.full_name}</option>
        ))}
      </select>
      {error && <span className="text-xs text-pinot">{error}</span>}
      {loading && <Loader2 size={13} className="animate-spin text-encre/40" />}
    </div>
  );
}
