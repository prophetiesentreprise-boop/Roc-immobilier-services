import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/require-admin";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const caller = await requireAdmin();
  if (!caller) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const { id } = await params;

  if (id === caller.id) {
    return NextResponse.json({ error: "Vous ne pouvez pas supprimer votre propre compte." }, { status: 400 });
  }

  const admin = createAdminClient();
  if (!admin) return NextResponse.json({ error: "Non configuré (SUPABASE_SERVICE_ROLE_KEY manquante)." }, { status: 500 });

  const { error } = await admin.auth.admin.deleteUser(id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ ok: true });
}
