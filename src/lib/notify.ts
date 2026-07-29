import { siteConfig } from "./site-config";

/**
 * Envoie un e-mail de notification à l'agence via l'API Resend, si la clé
 * RESEND_API_KEY est configurée dans les variables d'environnement.
 * Si elle ne l'est pas, cette fonction ne fait rien : le site continue de
 * fonctionner normalement, la demande reste de toute façon visible
 * immédiatement dans le back-office (/admin).
 *
 * Pour activer les notifications par e-mail (optionnel, voir GUIDE_10_JOURS.md) :
 *   1. Créez un compte gratuit sur https://resend.com
 *   2. Créez une clé API (Dashboard > API Keys)
 *   3. Ajoutez-la comme variable d'environnement RESEND_API_KEY dans Vercel
 *      (Project Settings > Environment Variables), puis redéployez.
 *   4. Pour un envoi depuis votre propre domaine (recommandé), vérifiez
 *      rocimmobilierservices.com dans Resend et remplacez RESEND_FROM
 *      ci-dessous ; sinon l'adresse de test onboarding@resend.dev est
 *      utilisée automatiquement.
 */
export async function notifyAgency(subject: string, text: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const from = process.env.RESEND_FROM || "ROC Immobilier Services <onboarding@resend.dev>";

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: siteConfig.emails,
        subject,
        text,
      }),
    });
  } catch {
    // On n'interrompt jamais la soumission du formulaire si l'e-mail échoue.
  }
}
