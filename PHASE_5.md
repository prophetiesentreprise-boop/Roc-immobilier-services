# Phase 5 — Photos de fond sur tout le design du site

## 1. Mettre à jour la base de données (obligatoire)

Supabase → **SQL Editor** → **New query** → copiez tout `supabase/migration_phase5.sql`
→ **Run**.

## 2. Mettre à jour le code

Comme d'habitude (remplacez le dossier en gardant `node_modules`, `.git`,
`.env.local`), puis :
```
npm install
npm run dev
```

## 3. Ajouter des photos partout

1. `/admin/login` → menu **Arrière-plans**.
2. Vous voyez la liste de toutes les zones du site qui peuvent recevoir une photo :
   - Accueil : encart « Bien du moment » et bandeau « Estimation gratuite »
   - Contact & Prendre RDV : bandeau supérieur (photo commune aux deux pages)
   - Nos services : bandeau du haut, les 6 blocs de service, bandeau final
3. Ajoutez une photo à la zone de votre choix, cliquez **Enregistrer tous les
   arrière-plans**.
4. Chaque zone sans photo continue d'afficher son dégradé de couleur actuel — rien
   ne casse si vous n'en ajoutez que quelques-unes.

Un calque semi-transparent est automatiquement posé sur chaque photo pour que le
texte reste lisible par-dessus.

## 4. Cas particulier : la page « L'agence »

La bannière de la page "L'agence" a sa propre photo, réglée séparément dans
`/admin/parametres` (ajoutée en Phase 4) — pas besoin de la dupliquer ici.

## 5. Ce qui n'a volontairement pas de photo de fond

Le **pied de page** (fond bleu foncé) n'a pas été rendu personnalisable par une
photo : avec autant de texte et de liens dessus, une photo derrière nuirait à la
lisibilité. C'est un choix de design assumé, pas un oubli.

## 6. Conseil pratique

Pour un rendu propre, privilégiez des photos assez larges (1600 px de large minimum)
et pas trop chargées visuellement au centre, là où le texte vient se superposer.
