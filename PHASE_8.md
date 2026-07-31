# Phase 8 — Actualité immobilière éditable depuis le back-office

## 1. Mettre à jour la base de données (obligatoire)

Supabase → **SQL Editor** → **New query** → copiez tout `supabase/migration_phase8.sql`
→ **Run**. L'article déjà présent sur le site (annexe fiscale 2026) est repris tel
quel, vous pourrez le modifier ou le supprimer ensuite.

## 2. Mettre à jour le code

Comme d'habitude (remplacez le dossier en gardant `node_modules`, `.git`,
`.env.local`), puis :
```
npm install
npm run dev
```

## 3. Gérer les articles

1. `/admin/login` → menu **Actualité immobilière**.
2. **Nouvel article** pour en créer un, ou cliquez sur un article existant pour le
   modifier / supprimer.
3. Champs à remplir : Titre, Date de publication, Résumé (affiché dans la liste),
   Contenu (le texte complet).

## 4. Mise en forme du contenu (simple, sans bouton "gras/italique")

Pour rester simple à utiliser, la mise en forme suit deux règles seulement :

- **Un paragraphe** = un bloc de texte, séparé du suivant par **une ligne vide**.
- **Un sous-titre** = une ligne qui commence par `## ` (deux dièses puis un espace).

Exemple complet à coller dans le champ Contenu :
```
Voici le premier paragraphe de l'article, qui introduit le sujet.

## Premier point important

Le développement de ce premier point, sur autant de lignes que nécessaire.

## Deuxième point important

Le développement de ce second point.
```

## 5. Ce qui a changé sur le site public

- `/actualites` affiche désormais la **liste** de tous les articles publiés.
- Chaque article a sa propre page à `/actualites/nom-de-larticle`.
- Le lien "Actualité immobilière" dans le menu pointe vers cette liste.
