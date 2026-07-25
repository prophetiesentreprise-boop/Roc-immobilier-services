import { AlertTriangle, Mail, Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Lead } from "@/lib/types";
import { LeadStatusSelect } from "@/components/admin/LeadStatusSelect";

const TYPE_LABEL: Record<Lead["type"], string> = {
  estimation: "Estimation",
  contact: "Contact",
  visite: "Visite",
  alerte: "Alerte",
};

export default async function AdminLeadsPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="max-w-lg rounded-sm border border-colombage/40 bg-colombage/10 p-6">
        <AlertTriangle className="text-colombage" size={22} />
        <p className="mt-3 font-semibold text-ardoise">Supabase n'est pas encore configuré</p>
        <p className="mt-2 text-sm text-encre/70">Voir README, étape 4.</p>
      </div>
    );
  }

  const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
  const leads = (data ?? []) as Lead[];

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
        Demandes reçues
      </h1>
      <p className="mt-1 mb-8 text-sm text-encre/60">
        Toutes les demandes envoyées depuis le site (contact, estimation, visite).
      </p>

      <div className="grid gap-4">
        {leads.map((lead) => (
          <div key={lead.id} className="rounded-sm border border-ligne bg-craie-100 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="eyebrow rounded-sm bg-ardoise px-2 py-1 text-[0.65rem] text-craie-100">
                  {TYPE_LABEL[lead.type]}
                </span>
                <p className="font-semibold text-ardoise">{lead.full_name}</p>
              </div>
              <LeadStatusSelect leadId={lead.id} status={lead.status} />
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-encre/70">
              <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-pinot">
                <Mail size={14} /> {lead.email}
              </a>
              {lead.phone && (
                <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-pinot">
                  <Phone size={14} /> {lead.phone}
                </a>
              )}
              <span className="text-encre/45">
                {new Date(lead.created_at).toLocaleString("fr-FR")}
              </span>
            </div>

            {lead.message && <p className="mt-3 text-sm text-encre/80">{lead.message}</p>}
          </div>
        ))}

        {leads.length === 0 && (
          <p className="rounded-sm border border-ligne bg-craie-100 p-8 text-center text-sm text-encre/50">
            Aucune demande reçue pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
