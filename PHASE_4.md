# Phase 4 — Équipe, bannière Agence, cartes statistiques, logo agrandi

## 1. Mettre à jour la base de données (obligatoire)

Supabase → **SQL Editor** → **New query** → copiez tout `supabase/migration_phase4.sql`
→ **Run**.

## 2. Mettre à jour le code

Même méthode que d'habitude (remplacez le dossier en gardant `node_modules`, `.git`,
`.env.local`), puis :
```
npm install
npm run dev
```

## 3. Ajouter les membres de l'équipe

1. `/admin/login` → menu **Notre équipe** → **Ajouter un membre**.
2. Renseignez nom, fonction, photo (portrait carré recommandé), téléphone, e-mail,
   WhatsApp (optionnels — n'affichez que ce que vous voulez rendre public).
3. Le champ "Ordre d'affichage" permet de choisir qui apparaît en premier (0 = en
   tête).
4. Retirez les 3 membres d'exemple ("Direction", "Conseillers Vente & Achat",
   "Gestion locative") une fois vos vrais membres ajoutés — ce sont des données de
   démonstration, elles disparaissent automatiquement dès qu'un vrai membre existe.

Chaque membre s'affiche désormais avec sa photo réelle sur la page "L'agence", avec
des icônes cliquables (appel, e-mail, WhatsApp) selon les coordonnées renseignées.

## 4. Ajouter une photo de fond à la bannière "L'agence"

1. `/admin/parametres` → bloc "Page « L'agence »" → **Photo de fond de la bannière**.
2. Ajoutez une photo (bâtiment de l'agence, équipe, vue d'Abidjan...).
3. Sans photo, un dégradé de couleurs chaleureuses (brun/bordeaux) s'affiche à la
   place — déjà plus vivant que l'ancien fond uni.

## 5. Logo agrandi

Le logo dans l'en-tête du site est maintenant nettement plus grand et visible.
Uploadez le vrai logo Roc Immobilier SErvices depuis `/admin/parametres` si ce
n'est pas déjà fait.

## 6. Statistiques en cartes

Les chiffres clés ("9 ans d'expertise...") s'affichent maintenant en cartes
individuelles avec icône et effet au survol, sur la page d'accueil et sur la page
"L'agence".

## 7. Logo et typographie sur Contact / Prendre RDV

Ces deux pages affichent maintenant un bandeau avec le logo et une phrase en
italique (police Fraunces, la police élégante déjà utilisée pour les titres du
site), pour une présentation plus soignée.

## 8. Couleurs du site adaptées à votre logo

Cette étape est en attente : envoyez le fichier de votre logo dans la conversation
pour que les couleurs exactes du site (actuellement ardoise / bordeaux / brun) soient
ajustées à votre charte graphique.
