import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/require-admin";
import { notifyCollaboratorAssigned, notifyClientAssigned } from "@/lib/notify";

export async function POST(request: NextRequest) {
  const caller = await requireAdmin();
  if (!caller) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const { table, id, memberId } = await request.json();
  if (!["leads", "appointments"].includes(table) || !id || !memberId) {
    return NextResponse.json({ error: "Paramètres invalides." }, { status: 400 });
  }

  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Supabase non configuré." }, { status: 500 });

  const { data: member, error: memberError } = await supabase
    .from("team_members")
    .select("*")
    .eq("id", memberId)
    .single();
  if (memberError || !member) return NextResponse.json({ error: "Conseiller introuvable." }, { status: 404 });

  const { data: record, error: recordError } = await supabase
    .from(table)
    .select("*")
    .eq("id", id)
    .single();
  if (recordError || !record) return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });

  const { error: updateError } = await supabase
    .from(table)
    .update({ assigned_to: memberId, assigned_notified_at: new Date().toISOString() })
    .eq("id", id);
  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

  const summary =
    table === "leads"
      ? `Type : ${record.type}\nNom : ${record.full_name}\nTéléphone : ${record.phone || "(non renseigné)"}\nE-mail : ${record.email}\nMessage : ${record.message || "(aucun)"}`
      : `Rendez-vous le ${record.appointment_date} à ${record.appointment_time}\nMotif : ${record.reason}\nNom : ${record.full_name}\nTéléphone : ${record.phone}`;

  await notifyCollaboratorAssigned(member, summary);
  await notifyClientAssigned(record.email, record.full_name, member);

  return NextResponse.json({ ok: true });
}
