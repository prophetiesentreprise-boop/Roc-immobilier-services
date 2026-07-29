"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { TeamMember } from "@/lib/types";

interface ForwardToWhatsAppProps {
  members: TeamMember[];
  message: string;
}

export function ForwardToWhatsApp({ members, message }: ForwardToWhatsAppProps) {
  const withWhatsapp = members.filter((m) => m.whatsapp);
  const [selected, setSelected] = useState(withWhatsapp[0]?.id ?? "");

  if (withWhatsapp.length === 0) return null;

  const member = withWhatsapp.find((m) => m.id === selected);
  const href = member ? `https://wa.me/${member.whatsapp}?text=${encodeURIComponent(message)}` : "#";

  return (
    <div className="flex items-center gap-2">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="rounded-sm border border-ligne bg-white px-2 py-1 text-xs"
        aria-label="Choisir le membre de l'équipe"
      >
        {withWhatsapp.map((m) => (
          <option key={m.id} value={m.id}>{m.full_name}</option>
        ))}
      </select>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 rounded-sm bg-vigne px-2.5 py-1 text-xs font-semibold text-craie-100 hover:opacity-90"
      >
        <Send size={12} /> Transférer sur WhatsApp
      </a>
    </div>
  );
}
