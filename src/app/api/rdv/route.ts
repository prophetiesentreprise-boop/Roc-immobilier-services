import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { notifyAgency } from "@/lib/notify";

const MIN_HOURS_NOTICE = 48;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { full_name, email, phone, reason, appointment_date, appointment_time, message } = body;

  if (!full_name || !email || !phone || !appointment_date || !appointment_time) {
    return NextResponse.json({ error: "Merci de remplir tous les champs obligatoires." }, { status: 400 });
  }

  // Règle des 48h, vérifiée côté serveur (ne fait pas confiance au navigateur)
  const requested = new Date(`${appointment_date}T${appointment_time}:00`);
  const minAllowed = new Date(Date.now() + MIN_HOURS_NOTICE * 60 * 60 * 1000);

  if (Number.isNaN(requested.getTime()) || requested < minAllowed) {
    return NextResponse.json(
      { error: `Merci de choisir un créneau au moins ${MIN_HOURS_NOTICE}h à l'avance.` },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  if (!supabase) {
    console.log("[Nouvelle demande de RDV - mode démo, Supabase non configuré]", body);
    return NextResponse.json({ ok: true, mode: "demo" });
  }

  const { error } = await supabase.from("appointments").insert({
    full_name,
    email,
    phone,
    reason: reason ?? "Non précisée",
    appointment_date,
    appointment_time,
    message: message ?? "",
    status: "nouveau",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await notifyAgency(
    `Nouvelle demande de RDV — ${full_name}`,
    `${full_name} demande un rendez-vous le ${appointment_date} à ${appointment_time}.\n\nRaison : ${reason}\nTéléphone : ${phone}\nE-mail : ${email}\nMessage : ${message ?? "(aucun)"}`
  );

  return NextResponse.json({ ok: true });
}
