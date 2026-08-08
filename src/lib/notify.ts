import { siteConfig, siteUrl } from "./site-config";
import { TeamMember } from "./types";

/**
 * Envoie un e-mail via l'API Resend, si la clé RESEND_API_KEY est
 * configurée. Si elle ne l'est pas, cette fonction ne fait rien : le site
 * continue de fonctionner normalement, les informations restent de toute
 * façon visibles immédiatement dans le back-office (/admin).
 *
 * Pour activer les notifications par e-mail (optionnel, voir PHASE_2.md) :
 *   1. Créez un compte gratuit sur https://resend.com
 *   2. Créez une clé API (Dashboard > API Keys)
 *   3. Ajoutez-la comme variable d'environnement RESEND_API_KEY dans Vercel,
 *      puis redéployez.
 *   4. Pour que les e-mails partent bien depuis info@rocimmobilierservices.ci,
 *      vérifiez ce domaine dans Resend et renseignez la variable
 *      d'environnement RESEND_FROM (ex. "Roc Immobilier SErvices
 *      <info@rocimmobilierservices.ci>") ; sinon une adresse de test
 *      Resend est utilisée automatiquement.
 */
async function sendEmail(to: string | string[], subject: string, text: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const from = process.env.RESEND_FROM || "Roc Immobilier SErvices <onboarding@resend.dev>";

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, text }),
    });
  } catch {
    // On n'interrompt jamais une action du site si l'envoi d'e-mail échoue.
  }
}

/** Notifie l'agence (boîte générale) d'une nouvelle demande. */
export async function notifyAgency(subject: string, text: string) {
  await sendEmail(siteConfig.emails as unknown as string[], subject, text);
}

/** Notifie le conseiller qu'une demande vient de lui être attribuée. */
export async function notifyCollaboratorAssigned(member: TeamMember, summary: string) {
  if (!member.email) return;
  await sendEmail(
    member.email,
    "Nouvelle demande qui vous est attribuée",
    `Bonjour ${member.full_name},\n\nUne demande vient de vous être attribuée sur le site Roc Immobilier SErvices :\n\n${summary}\n\nMerci de la traiter dans les meilleurs délais.\n\nEspace professionnel : ${siteUrl}/admin/leads`
  );
}

/** Informe le client du nom du conseiller désormais en charge de sa demande. */
export async function notifyClientAssigned(clientEmail: string, clientName: string, member: TeamMember) {
  const contactLine = [member.phone, member.email, member.whatsapp ? `WhatsApp : +${member.whatsapp}` : null]
    .filter(Boolean)
    .join(" · ");
  await sendEmail(
    clientEmail,
    "Votre demande est prise en charge — Roc Immobilier SErvices",
    `Bonjour ${clientName},\n\nVotre demande a été prise en charge par ${member.full_name}${member.role ? ` (${member.role})` : ""}.\n${contactLine ? `Vous pouvez le/la joindre directement : ${contactLine}\n` : ""}\nNous revenons vers vous très prochainement.\n\nL'équipe Roc Immobilier SErvices\n${siteConfig.phoneDisplay}`
  );
}

/** Informe le client que sa demande est clôturée, avec un lien pour donner son avis. */
export async function notifyClientClosed(clientEmail: string, clientName: string, leadId: string) {
  await sendEmail(
    clientEmail,
    "Votre demande a été traitée — Roc Immobilier SErvices",
    `Bonjour ${clientName},\n\nVotre demande auprès de Roc Immobilier SErvices vient d'être marquée comme traitée.\n\nVotre avis nous intéresse : dites-nous comment s'est passé le traitement de votre demande, ou signalez un problème si besoin, via ce lien :\n${siteUrl}/avis/${leadId}\n\nMerci de votre confiance.\n\nL'équipe Roc Immobilier SErvices\n${siteConfig.phoneDisplay}`
  );
}
