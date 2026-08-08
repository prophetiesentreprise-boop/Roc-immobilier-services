import { AlertTriangle, Mail, Phone, CalendarClock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Appointment, TeamMember } from "@/lib/types";
import { AppointmentStatusSelect } from "@/components/admin/AppointmentStatusSelect";
import { ForwardToWhatsApp } from "@/components/admin/ForwardToWhatsApp";
import { AssignSelect } from "@/components/admin/AssignSelect";

export default async function AdminRdvPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="max-w-lg rounded-sm border border-colombage/40 bg-colombage/10 p-6">
        <AlertTriangle className="text-colombage" size={22} />
        <p className="mt-3 font-semibold text-ardoise">Supabase n'est pas encore configuré</p>
        <p className="mt-2 text-sm text-encre/70">
          Exécutez `supabase/migration_phase2.sql` (voir README) puis rafraîchissez cette page.
        </p>
      </div>
    );
  }

  const [{ data }, { data: teamData }] = await Promise.all([
    supabase.from("appointments").select("*").order("appointment_date", { ascending: true }),
    supabase.from("team_members").select("*").order("display_order", { ascending: true }),
  ]);
  const appointments = (data ?? []) as Appointment[];
  const team = (teamData ?? []) as TeamMember[];

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
        Rendez-vous demandés
      </h1>
      <p className="mt-1 mb-8 text-sm text-encre/60">
        Toutes les demandes de rendez-vous envoyées depuis le site (règle des 48h déjà
        appliquée).
      </p>

      <div className="grid gap-4">
        {appointments.map((rdv) => (
          <div key={rdv.id} className="rounded-sm border border-ligne bg-craie-100 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="eyebrow flex items-center gap-1 rounded-sm bg-ardoise px-2 py-1 text-[0.65rem] text-craie-100">
                  <CalendarClock size={12} /> {rdv.appointment_date} · {rdv.appointment_time}
                </span>
                <p className="font-semibold text-ardoise">{rdv.full_name}</p>
              </div>
              <div className="flex items-center gap-3">
                <ForwardToWhatsApp
                  members={team}
                  message={`RDV demandé par ${rdv.full_name} le ${rdv.appointment_date} à ${rdv.appointment_time}.\n\nMotif : ${rdv.reason}\nTéléphone : ${rdv.phone}`}
                />
                <AppointmentStatusSelect id={rdv.id} status={rdv.status} />
              </div>
            </div>

            <div className="mt-2">
              <AssignSelect table="appointments" id={rdv.id} currentAssignee={rdv.assigned_to} members={team} />
            </div>

            <p className="mt-2 text-sm text-encre/70">Motif : {rdv.reason}</p>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-encre/70">
              <a href={`mailto:${rdv.email}`} className="flex items-center gap-1 hover:text-pinot">
                <Mail size={14} /> {rdv.email}
              </a>
              <a href={`tel:${rdv.phone}`} className="flex items-center gap-1 hover:text-pinot">
                <Phone size={14} /> {rdv.phone}
              </a>
            </div>

            {rdv.message && <p className="mt-3 text-sm text-encre/80">{rdv.message}</p>}
          </div>
        ))}

        {appointments.length === 0 && (
          <p className="rounded-sm border border-ligne bg-craie-100 p-8 text-center text-sm text-encre/50">
            Aucune demande de rendez-vous pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
