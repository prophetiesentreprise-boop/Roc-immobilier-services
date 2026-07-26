# Phase 2 — Photos, prise de rendez-vous, chatbot

Ce guide suppose que la Phase 1 est déjà en ligne et fonctionne. Suivez les
étapes dans l'ordre.

## 1. Mettre à jour la base de données (obligatoire)

1. Allez sur https://supabase.com/dashboard → votre projet → **SQL Editor** → **New query**.
2. Ouvrez le fichier `supabase/migration_phase2.sql` de ce projet, copiez tout son
   contenu, collez-le dans l'éditeur SQL, puis cliquez **Run**.
3. Cela ajoute : le stockage des photos, la colonne "photos" sur les biens et les
   demandes, et la table des rendez-vous — sans toucher à vos données existantes.

## 2. Mettre à jour le code

Remplacez votre dossier de projet par le contenu du nouveau zip (même méthode que la
Phase 1 : gardez `node_modules`, `.git` et `.env.local`), puis :

```
npm install
npm run dev
```

Vérifiez en local que :
- `/admin/biens/nouveau` affiche bien un bloc pour ajouter des photos
- `/rdv` affiche le nouveau formulaire de prise de rendez-vous
- Un petit bouton rond apparaît en bas à droite de chaque page : c'est le chatbot

Puis envoyez sur GitHub comme d'habitude :
```
git add .
git commit -m "Phase 2 : photos, rendez-vous, chatbot"
git push
```

## 3. Tester l'upload de photos

1. Connectez-vous sur `/admin/login`.
2. Ouvrez un bien existant ou créez-en un nouveau.
3. Dans le bloc "Photos", cliquez sur la case "Ajouter" et sélectionnez une ou
   plusieurs images.
4. Enregistrez le bien, puis ouvrez sa fiche publique : les photos doivent
   s'afficher en carrousel (flèches gauche/droite + points en bas).

## 4. Tester la prise de rendez-vous

1. Allez sur `/rdv`.
2. Essayez de choisir une date/heure **dans moins de 48h** : le formulaire doit
   refuser (c'est la règle demandée, appliquée à la fois dans le formulaire et
   côté serveur, donc impossible à contourner).
3. Choisissez une date valide (48h ou plus) et envoyez la demande.
4. Vérifiez qu'elle apparaît dans `/admin/rdv`.
5. Après l'envoi, un bouton "Confirmer aussi par WhatsApp" apparaît : il ouvre
   WhatsApp avec un message pré-rempli vers votre numéro d'agence.

## 5. (Optionnel) Activer les notifications automatiques par e-mail

Par défaut, chaque nouvelle demande (contact, estimation, rendez-vous) est
immédiatement visible dans votre back-office — mais aucun e-mail n'est envoyé tant
que vous n'avez pas activé cette option, gratuite jusqu'à un certain volume :

1. Créez un compte sur https://resend.com (gratuit, 100 e-mails/jour inclus).
2. Menu **API Keys** → créez une clé, copiez-la.
3. Dans Vercel : **Project Settings > Environment Variables**, ajoutez :
   - `RESEND_API_KEY` = la clé copiée
4. Redéployez (**Deployments** → **⋯** → **Redeploy**).
5. Testez à nouveau le formulaire de contact : un e-mail doit arriver à
   `contact@rocimmobilierservice.com` (l'adresse définie dans
   `src/lib/site-config.ts`).

Sans cette étape, le site continue de fonctionner normalement : les demandes restent
visibles dans `/admin`, simplement sans e-mail de notification automatique.

## 6. À propos du chatbot

Le chatbot ajouté est un **assistant à menus guidés** (pas une intelligence
artificielle générative) : il oriente le visiteur vers la bonne page ou vers
WhatsApp selon ses réponses. C'est volontaire — cette version fonctionne
immédiatement, sans compte supplémentaire ni coût récurrent.

Si vous souhaitez plus tard un chatbot capable de répondre librement à des
questions ouvertes (type intelligence artificielle), cela demande de connecter
une API payante (par exemple l'API Claude d'Anthropic) : n'hésitez pas à
demander de l'aide pour cette évolution le moment venu.

## 7. Limites connues de cette version

- Les photos sont stockées sans compression automatique : évitez d'envoyer des
  photos de plus de 5 Mo chacune pour garder le site rapide.
- La confirmation WhatsApp du rendez-vous est envoyée **par le client**, en un
  clic (pas encore automatique côté serveur) : une vraie automatisation
  nécessite l'API WhatsApp Business (payante), qui pourra être ajoutée plus tard.
- Le chatbot ne lit pas dans votre base de biens en temps réel ; il oriente vers
  les pages de recherche existantes.
