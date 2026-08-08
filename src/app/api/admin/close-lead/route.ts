import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/require-admin";
import { notifyClientClosed } from "@/lib/notify";

export async function POST(request: NextRequest) {
  const caller = await requireAdmin();
  if (!caller) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const { leadId } = await request.json();
  if (!leadId) return NextResponse.json({ error: "Identifiant manquant." }, { status: 400 });

  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Supabase non configuré." }, { status: 500 });

  const { data: lead, error } = await supabase.from("leads").select("*").eq("id", leadId).single();
  if (error || !lead) return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });

  // On évite de renvoyer deux fois le même e-mail de clôture.
  if (lead.closed_notified_at) return NextResponse.json({ ok: true, skipped: true });

  await notifyClientClosed(lead.email, lead.full_name, lead.id);
  await supabase.from("leads").update({ closed_notified_at: new Date().toISOString() }).eq("id", leadId);

  return NextResponse.json({ ok: true });
}
