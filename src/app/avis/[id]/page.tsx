import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FeedbackForm } from "@/components/FeedbackForm";

export const metadata = { title: "Votre avis — Roc Immobilier SErvices" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AvisPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  if (!supabase) notFound();

  const { data: lead } = await supabase
    .from("leads")
    .select("id, full_name, status, feedback_submitted_at")
    .eq("id", id)
    .single();

  if (!lead) notFound();

  return (
    <div className="container-roc max-w-xl py-16">
      <p className="eyebrow">Votre avis</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-ardoise">
        Comment s'est passé le traitement de votre demande ?
      </h1>
      <p className="mt-3 text-sm text-encre/70">
        Bonjour {lead.full_name}, votre retour nous aide à améliorer notre service.
      </p>

      <div className="mt-8 rounded-sm border border-ligne bg-craie-100 p-7">
        {lead.status !== "traite" ? (
          <p className="text-sm text-encre/70">
            Votre demande est encore en cours de traitement. Vous pourrez déposer votre
            avis une fois qu'elle sera marquée comme traitée.
          </p>
        ) : lead.feedback_submitted_at ? (
          <p className="text-sm text-encre/70">
            Vous avez déjà déposé un avis pour cette demande. Merci !
          </p>
        ) : (
          <FeedbackForm leadId={lead.id} />
        )}
      </div>
    </div>
  );
}
