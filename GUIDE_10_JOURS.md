# Guide de mise en ligne — 10 jours, zéro expérience requise

Ce guide suppose que vous ne connaissez rien au développement. Chaque étape indique
quoi cliquer, dans quel ordre. Prenez les jours dans l'ordre : chaque jour dépend du
précédent. Si un nom de bouton a légèrement changé depuis la rédaction de ce guide,
cherchez l'option la plus proche — les grandes étapes ne changent pas.

**Avant de commencer**, gardez sous la main : votre carte bancaire (pour le nom de
domaine et Microsoft 365 — quelques dizaines d'euros au total), une adresse e-mail
personnelle valide, et le dossier `roc-immobilier` que vous avez téléchargé.

---

## Jour 1 — Créer tous les comptes nécessaires

Vous allez créer 4 comptes. Tous ont une offre gratuite suffisante pour démarrer.

1. **GitHub** (https://github.com/signup) — c'est l'endroit où votre code va vivre.
   Créez un compte gratuit avec votre e-mail.
2. **Vercel** (https://vercel.com/signup) — c'est l'hébergeur qui va faire tourner le
   site. Choisissez **"Continue with GitHub"** pour lier directement les deux comptes.
3. **Supabase** (https://supabase.com/dashboard) — c'est la base de données et le
   système de connexion du back-office. Créez un compte, de préférence aussi avec
   "Continue with GitHub".
4. **Nom de domaine** : si `rocimmobilierservice.com` est déjà déposé par vous ailleurs
   (OVH, Google Domains, Namecheap...), gardez l'accès à ce compte. Sinon, achetez le
   nom de domaine choisi chez un registrar (OVH, Namecheap ou directement dans Vercel
   sous l'onglet "Domains").

**Fin de journée 1 :** vous avez 4 comptes ouverts, notés dans un endroit sûr (gestionnaire
de mots de passe si possible).

---

## Jour 2 — Installer les outils et ouvrir le projet

1. Installez **Node.js** (version 20 ou plus récente) : allez sur https://nodejs.org,
   téléchargez la version "LTS" et installez-la comme n'importe quel logiciel.
2. Installez **Visual Studio Code** (https://code.visualstudio.com) — c'est l'éditeur
   dans lequel vous ouvrirez et modifierez les fichiers du site.
3. Décompressez le dossier `roc-immobilier.zip` que vous avez reçu, par exemple sur
   votre Bureau.
4. Ouvrez **VS Code** → **File > Open Folder** → sélectionnez le dossier `roc-immobilier`.
5. Ouvrez le terminal intégré : menu **Terminal > New Terminal**. Un bandeau de
   commande s'affiche en bas de l'écran.
6. Dans ce terminal, tapez puis validez avec Entrée :
   ```
   npm install
   ```
   Cela installe toutes les briques du site (patientez 1 à 2 minutes).
7. Puis lancez :
   ```
   npm run dev
   ```
8. Ouvrez votre navigateur sur **http://localhost:3000**. Le site s'affiche, avec des
   biens de démonstration. C'est normal et volontaire : le site fonctionne déjà, même
   sans base de données branchée.

**Fin de journée 2 :** le site tourne sur votre ordinateur.

---

## Jour 3 — Mettre le code sur GitHub

1. Sur https://github.com, cliquez sur le **+** en haut à droite → **New repository**.
2. Nom : `roc-immobilier`. Laissez-le en **Private** (privé). Ne cochez aucune case
   d'initialisation. Cliquez **Create repository**.
3. GitHub affiche des commandes. Retournez dans le terminal VS Code (dossier du
   projet) et tapez, une ligne à la fois :
   ```
   git init
   git add .
   git commit -m "Premier envoi du site ROC Immobilier"
   git branch -M main
   git remote add origin URL_DE_VOTRE_DEPOT
   git push -u origin main
   ```
   Remplacez `URL_DE_VOTRE_DEPOT` par l'adresse affichée par GitHub (elle ressemble à
   `https://github.com/votre-nom/roc-immobilier.git`).
4. Si Git vous demande de vous connecter, suivez les instructions à l'écran (une
   fenêtre de connexion GitHub s'ouvre).
5. Rafraîchissez la page GitHub : vos fichiers doivent apparaître.

**Fin de journée 3 :** votre code est sauvegardé en ligne sur GitHub.

---

## Jour 4 — Créer la base de données (Supabase)

1. Sur https://supabase.com/dashboard, cliquez **New project**.
2. Donnez un nom (`roc-immobilier`), choisissez un mot de passe de base de données
   **solide** (notez-le précieusement), choisissez une région proche (Europe).
   Cliquez **Create new project** et patientez 1 à 2 minutes.
3. Une fois le projet prêt, allez dans le menu de gauche **SQL Editor** → **New query**.
4. Ouvrez le fichier `supabase/schema.sql` (dans votre dossier de projet, avec VS Code),
   sélectionnez tout son contenu (Ctrl+A puis Ctrl+C), collez-le dans l'éditeur SQL de
   Supabase, puis cliquez **Run**. Vous devez voir un message de succès.
   → Cela crée les tables `properties` (biens) et `leads` (demandes), avec la sécurité
   nécessaire et 4 biens d'exemple.
5. Allez dans **Project Settings** (icône d'engrenage) → **API**. Notez deux valeurs :
   - **Project URL**
   - **anon public key**
6. Retour dans VS Code : dupliquez le fichier `.env.example`, renommez la copie en
   `.env.local`, et collez-y vos deux valeurs :
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon-publique
   ```
7. Arrêtez le serveur local (Ctrl+C dans le terminal) puis relancez `npm run dev`.
   Le site utilise maintenant vraiment Supabase.
8. Créez votre compte administrateur : dans Supabase, menu **Authentication** →
   **Users** → **Add user** → **Create new user**. Renseignez votre e-mail
   professionnel et un mot de passe. Décochez "Send invitation" si présent, ou validez
   l'e-mail directement selon l'option proposée.
9. Retournez sur http://localhost:3000/admin/login et connectez-vous avec cet e-mail
   et ce mot de passe. Vous arrivez sur le tableau de bord du back-office.

**Fin de journée 4 :** la vraie base de données est connectée, le back-office
fonctionne en local.

---

## Jour 5 — Mettre le site en ligne (Vercel)

1. Sur https://vercel.com, cliquez **Add New... > Project**.
2. Choisissez **Import** en face de votre dépôt `roc-immobilier` (Vercel doit le voir
   automatiquement puisqu'il est lié à GitHub).
3. Dans la section **Environment Variables**, ajoutez les deux mêmes variables que
   dans votre fichier `.env.local` :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Cliquez **Deploy**. Patientez 2 à 3 minutes.
5. Une fois terminé, Vercel affiche un lien du type `roc-immobilier.vercel.app`.
   Ouvrez-le : votre site est en ligne, visible par tout le monde.

**Fin de journée 5 :** le site est accessible sur Internet (avec une adresse provisoire).

---

## Jour 6 — Personnaliser les textes et les informations de l'agence

Ouvrez ces fichiers dans VS Code et remplacez les textes d'exemple par les vraies
informations (adresse, téléphone, carte professionnelle, SIRET). Après chaque
modification, enregistrez (Ctrl+S) : si `npm run dev` tourne, le site se met à jour
automatiquement dans le navigateur.

| Fichier | Contenu à personnaliser |
|---|---|
| `src/components/Footer.tsx` | Adresse, téléphone, e-mail |
| `src/app/agence/page.tsx` | Texte de présentation, agréments |
| `src/app/mentions-legales/page.tsx` | SIRET, carte professionnelle, hébergeur |
| `src/app/contact/page.tsx` | Adresse, horaires, carte (coordonnées GPS) |
| `src/app/page.tsx` | Chiffres clés, témoignages (à remplacer par de vrais avis) |

Astuce : dans VS Code, **Ctrl+F** (ou **Cmd+F**) dans un fichier ouvert pour chercher
un texte précis à remplacer.

Une fois vos modifications faites, renvoyez-les en ligne :
```
git add .
git commit -m "Personnalisation des textes de l'agence"
git push
```
Vercel republie automatiquement le site à chaque `git push`.

**Fin de journée 6 :** le site affiche les vraies informations de l'agence.

---

## Jour 7 — Ajouter les vrais biens et tester les formulaires

1. Allez sur `https://roc-immobilier.vercel.app/admin/login` et connectez-vous.
2. Menu **Biens > Ajouter un bien** : remplissez le formulaire pour chaque bien réel
   (titre, prix, ville, surface, description, points forts, DPE...). Cliquez
   **Publier le bien**.
3. Supprimez les biens de démonstration que vous ne voulez pas garder (bouton
   **Supprimer ce bien** sur la page de modification de chacun).
4. Testez chaque formulaire du site public (Contact, Estimer mon bien, Demander une
   visite sur une fiche bien) avec une vraie adresse e-mail de test.
5. Vérifiez que la demande apparaît bien dans **Demandes reçues** du back-office.

**Fin de journée 7 :** le catalogue de biens est réel, les formulaires sont vérifiés.

---

## Jour 8 — Domaine et 10 adresses e-mail professionnelles

### A. Connecter le nom de domaine à Vercel
1. Dans Vercel, ouvrez votre projet → **Settings > Domains** → saisissez
   `rocimmobilierservice.com` → **Add**.
2. Vercel indique un ou deux enregistrements DNS à créer (souvent un enregistrement
   **A** vers une adresse IP, et/ou un **CNAME** pour `www`).
3. Connectez-vous à l'interface de gestion DNS de votre registrar (OVH, Namecheap...)
   et ajoutez exactement les enregistrements demandés par Vercel.
4. Patientez de quelques minutes à quelques heures (propagation DNS). Vercel affiche
   un badge vert une fois que c'est actif.

### B. Créer les 10 boîtes e-mail professionnelles (Microsoft 365 / Outlook)
1. Allez sur https://www.microsoft.com/microsoft-365/business et souscrivez à une
   offre **Business Basic** ou **Business Standard**, pour 10 utilisateurs.
2. Pendant la configuration, Microsoft vous demande votre nom de domaine
   (`rocimmobilierservice.com`) : indiquez que vous le possédez déjà.
3. Microsoft affiche des enregistrements DNS à ajouter (TXT de vérification, puis
   **MX**, **SPF (TXT)**, **CNAME Autodiscover**). Ajoutez-les chez votre registrar,
   comme à l'étape A.
4. Une fois le domaine vérifié, créez vos 10 utilisateurs (**Admin center > Users >
   Active users > Add a user**), par exemple :
   `contact@`, `vente@`, `location@`, `gestion-locative@`, `estimation@`,
   `direction@`, `comptabilite@`, puis les adresses nominatives des agents.
5. Activez **DKIM** (Admin center > Exchange > Protection DKIM, ou via Defender) puis
   ajoutez un enregistrement **DMARC** (TXT) chez votre registrar. Cela évite que vos
   e-mails partent en spam.
6. Chaque utilisateur peut ensuite se connecter sur https://outlook.com ou dans
   l'application Outlook (bureau/mobile) avec son adresse et son mot de passe.

**Fin de journée 8 :** le site répond sur votre vrai nom de domaine, et les 10 boîtes
mail professionnelles fonctionnent dans Outlook.

---

## Jour 9 — Référencement et vérifications légales

1. **Google Search Console** (https://search.google.com/search-console) : ajoutez
   votre propriété `rocimmobilierservice.com`, validez-la (méthode DNS proposée), puis
   soumettez votre site pour indexation.
2. **Google Business Profile** (https://business.google.com) : créez ou revendiquez la
   fiche de l'agence (adresse, horaires, téléphone, site web) — c'est ce qui fait
   apparaître l'agence sur Google Maps.
3. Relisez `src/app/mentions-legales/page.tsx` : faites valider le texte final par un
   professionnel (comptable, juriste ou syndicat professionnel) avant le grand
   lancement.
4. Testez le site sur mobile (votre téléphone) et sur un autre navigateur.
5. Vérifiez l'orthographe et les prix de chaque bien publié.

**Fin de journée 9 :** le site est prêt à être annoncé publiquement.

---

## Jour 10 — Lancement

1. Faites un dernier tour du site en conditions réelles : recherche, fiche bien,
   formulaire de contact, back-office.
2. Si un ancien site existait à la même adresse, vérifiez qu'il ne reste aucune page
   cassée (redirection vers le nouveau site le cas échéant).
3. Annoncez le nouveau site : réseaux sociaux, e-mail aux contacts existants (envoyé
   depuis une de vos nouvelles adresses Outlook), affichage en agence.
4. Notez dans un document à part vos identifiants (Vercel, Supabase, Microsoft 365,
   registrar) dans un gestionnaire de mots de passe.

**Bravo — le site ROC Immobilier est en ligne.**

---

## Pour la suite (quand vous serez à l'aise)

- Ajouter une photo/galerie réelle par bien (actuellement, chaque bien affiche un
  bandeau de couleur en attendant de vraies photos — cela demande d'ajouter le
  stockage de fichiers Supabase, une évolution simple à demander ensuite).
- Ajouter les fonctionnalités listées dans le README sous "phase 2".
- Si vous êtes bloqué à une étape précise, revenez avec le message d'erreur exact :
  cela permet de corriger rapidement.
