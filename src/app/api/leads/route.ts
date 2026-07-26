import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { notifyAgency } from "@/lib/notify";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type, full_name, email, phone, message, property_id, photos } = body;

  if (!full_name || !email) {
    return NextResponse.json(
      { error: "Le nom et l'e-mail sont obligatoires." },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  if (!supabase) {
    // Mode démo : pas de base connectée. On journalise simplement la
    // demande côté serveur pour que le formulaire fonctionne malgré tout.
    console.log("[Nouvelle demande - mode démo, Supabase non configuré]", body);
    return NextResponse.json({ ok: true, mode: "demo" });
  }

  const { error } = await supabase.from("leads").insert({
    type: type ?? "contact",
    full_name,
    email,
    phone: phone ?? "",
    message: message ?? "",
    property_id: property_id ?? null,
    photos: photos ?? [],
    status: "nouveau",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await notifyAgency(
    `Nouvelle demande (${type ?? "contact"}) — ${full_name}`,
    `${full_name} a envoyé une demande depuis le site.\n\nType : ${type ?? "contact"}\nTéléphone : ${phone ?? "(non renseigné)"}\nE-mail : ${email}\nMessage : ${message ?? "(aucun)"}`
  );

  return NextResponse.json({ ok: true });
}
