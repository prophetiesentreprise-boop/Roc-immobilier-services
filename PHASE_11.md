# Phase 11 — Attribution des demandes, e-mails automatiques, avis client

## 1. Mettre à jour la base de données (obligatoire)

Supabase → **SQL Editor** → **New query** → copiez tout `supabase/migration_phase11.sql`
→ **Run**.

## 2. Activer les e-mails automatiques (fortement recommandé pour cette phase)

Sans cette étape, l'attribution et le suivi fonctionnent normalement dans le
back-office, mais **aucun e-mail n'est envoyé**. Voir PHASE_2.md pour la marche à
suivre complète (compte Resend gratuit). Pour que les e-mails partent bien depuis
`info@rocimmobilierservices.ci`, vérifiez ce domaine dans Resend puis ajoutez dans
Vercel :
```
RESEND_FROM = Roc Immobilier SErvices <info@rocimmobilierservices.ci>
```

## 3. Mettre à jour le code

```
npm install
git add .
git commit -m "Phase 11 : attribution, e-mails automatiques, avis client"
git push
```

## 4. Comment ça fonctionne

1. Dans `/admin/leads` ou `/admin/rdv`, chaque demande affiche un menu **Attribuer
   à...** : choisissez un collaborateur (doit avoir un e-mail renseigné dans **Notre
   équipe**).
2. Dès l'attribution :
   - Le collaborateur reçoit un e-mail avec le détail de la demande.
   - Le client reçoit un e-mail lui indiquant le nom du conseiller en charge (et ses
     coordonnées si renseignées).
3. Quand une demande (`/admin/leads`) est marquée **Traité**, le client reçoit
   automatiquement un e-mail de clôture avec un lien pour noter le traitement de sa
   demande (1 à 5 étoiles, commentaire, et une case pour contester si un problème
   n'est pas résolu).
4. L'avis déposé par le client reste consultable directement dans la base de données
   (colonnes `feedback_rating`, `feedback_comment`, `feedback_disputed` de la table
   `leads`) — un affichage dédié dans le back-office pourra être ajouté si vous le
   souhaitez.

## 5. Limites actuelles, en toute transparence

- Le mécanisme de clôture + avis concerne les **demandes** (`leads`), pas encore les
  rendez-vous : un rendez-vous n'a pas vraiment de moment de "clôture" équivalent, on
  peut en discuter si vous voulez un comportement précis à la confirmation ou après la
  date du rendez-vous.
- Sans Resend configuré, tout fonctionne sauf l'envoi réel des e-mails (l'attribution
  et le statut se mettent quand même à jour normalement).
