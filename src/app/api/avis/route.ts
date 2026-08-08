import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const { leadId, rating, comment, disputed } = await request.json();

  if (!leadId || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Note invalide." }, { status: 400 });
  }

  // On utilise le client admin uniquement pour cette action précise et
  // contrôlée (voir migration_phase11.sql) : aucun accès public plus large
  // n'est ouvert dans la base de données.
  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "Non configuré." }, { status: 500 });

  const { data: lead, error: fetchError } = await admin
    .from("leads")
    .select("id, status, feedback_submitted_at")
    .eq("id", leadId)
    .single();

  if (fetchError || !lead) return NextResponse.json({ error: "Demande introuvable." }, { status: 404 });
  if (lead.status !== "traite") {
    return NextResponse.json({ error: "Cette demande n'est pas encore marquée comme traitée." }, { status: 400 });
  }
  if (lead.feedback_submitted_at) {
    return NextResponse.json({ error: "Un avis a déjà été déposé pour cette demande." }, { status: 400 });
  }

  const { error: updateError } = await admin
    .from("leads")
    .update({
      feedback_rating: rating,
      feedback_comment: comment ?? "",
      feedback_disputed: Boolean(disputed),
      feedback_submitted_at: new Date().toISOString(),
    })
    .eq("id", leadId);

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
