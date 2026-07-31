# Phase 3 — Logo modifiable et textes clés éditables

## 1. Mettre à jour la base de données (obligatoire)

1. Supabase → **SQL Editor** → **New query**.
2. Copiez tout le contenu de `supabase/migration_phase3.sql`, collez, cliquez **Run**.
3. Cela crée : la table `site_settings` (une seule ligne, avec des valeurs par défaut
   identiques aux textes actuels) et un espace de stockage pour le logo.

## 2. Mettre à jour le code

Même méthode que les phases précédentes (remplacez le contenu du dossier en gardant
`node_modules`, `.git`, `.env.local`), puis :

```
npm install
npm run dev
```

## 3. Changer le logo

1. Connectez-vous sur `/admin/login`.
2. Menu **Réglages du site**.
3. Dans le bloc "Logo de l'agence", cliquez **Ajouter un logo** et sélectionnez le
   fichier du logo Roc Immobilier SErvices (idéalement un PNG à fond transparent,
   environ 400×120 px).
4. Cliquez **Enregistrer les modifications**.
5. Rafraîchissez la page d'accueil : le logo doit apparaître dans l'en-tête et le
   pied de page, à la place du texte "Roc Immobilier SErvices".

## 4. Modifier les textes clés

Toujours dans **Réglages du site**, vous pouvez maintenant modifier sans toucher au
code :
- le petit texte et le grand titre de la page d'accueil
- le texte sous le titre
- les 3 titres/textes du bandeau "pourquoi nous choisir"
- le premier paragraphe de la page "L'agence"
- la phrase sous le logo dans le pied de page

Chaque modification est visible immédiatement après avoir cliqué **Enregistrer**.

## 5. Important à savoir : ce qui n'est PAS encore éditable depuis le back-office

Pour rester réalisable et fiable, seuls les textes les plus visibles (ci-dessus) sont
pilotés depuis le back-office. Tout le reste du contenu (pages Acheter/Louer, Nos
services, Contact, Mentions légales, etc.) reste dans le code, modifiable comme avant
directement dans les fichiers `.tsx` avec VS Code (voir GUIDE_10_JOURS.md, Jour 6).

Rendre **absolument tous** les textes du site éditables depuis le back-office
reviendrait à construire un véritable système de gestion de contenu (CMS) complet —
un chantier possible, mais plus lourd. Si vous voulez qu'on étende ce système à
d'autres pages précises en priorité, dites-moi lesquelles et on les ajoute une par une.

## 6. Design

Cette phase inclut aussi une passe de style inspirée des grandes agences (mot-clé mis
en valeur dans le titre, bandeau de valeurs sous le hero, plus de hiérarchie visuelle)
— sans reprendre le contenu ni les visuels d'aucun site existant.
