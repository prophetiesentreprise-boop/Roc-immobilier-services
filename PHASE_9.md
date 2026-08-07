# Phase 9 — Corrections de l'audit + biens optionnels, vidéos, carrousel partout, anti-spam

## 1. Mettre à jour la base de données (obligatoire)

Supabase → **SQL Editor** → **New query** → copiez tout `supabase/migration_phase9.sql`
→ **Run**.

## 2. Mettre à jour le code

Comme d'habitude (remplacez le dossier en gardant `node_modules`, `.git`,
`.env.local`), puis :
```
npm install
npm run dev
```

## 3. Ce qui a changé

- **Surface, DPE et GES ne sont plus obligatoires** lors de l'ajout d'un bien —
  un choix « Non renseigné » est maintenant disponible.
- **Vidéos** : un nouveau champ dans le formulaire de bien permet de coller un ou
  plusieurs liens (YouTube, Vimeo, ou fichier vidéo déjà hébergé), un par ligne.
  Elles s'affichent automatiquement sur la fiche du bien.
- **Carrousel de photos partout** : les vignettes de biens (listes Acheter/Louer,
  accueil) font désormais défiler toutes les photos automatiquement, comme la fiche
  détaillée.
- **Description avec paragraphes** : un retour à la ligne tapé dans le champ
  Description du back-office est maintenant respecté sur la fiche publique du bien
  (avant, tout le texte était collé sur une seule ligne).
- **Anti-spam invisible** sur les 3 formulaires publics (Contact, Estimation,
  Rendez-vous) : un champ piège invisible pour les visiteurs bloque silencieusement
  les robots, sans captcha ni gêne pour vos clients.
- **Titre et description propres à chaque bien et chaque article** pour Google —
  amélioration directe du référencement individuel de chaque annonce.
- **Textes retirés** : "Conseil juridique et accompagnement fiscal" (page Agence,
  liste des engagements) et la note interne visible sous l'équipe.

## 4. Ce qui n'a pas été fait dans cette phase, et pourquoi

- **Migration des images vers l'optimisation automatique de Next.js** : préparée
  (le fichier de configuration est prêt), mais volontairement non appliquée dans
  cette phase. C'est un changement qui touche l'affichage de nombreuses pages à la
  fois, et je préfère le livrer séparément avec une vérification plus poussée,
  plutôt que de risquer une régression visuelle difficile à repérer sans pouvoir
  tester l'affichage réel.

## 5. Points restants demandés (chantiers séparés, à venir)

Ces demandes sont plus lourdes et seront traitées dans des phases dédiées :

- **Phase 10** — Ajouter des collaborateurs directement depuis `/admin` (au lieu
  de Supabase), avec possibilité pour chacun de modifier ses propres accès.
- **Phase 11** — Attribution des demandes à un collaborateur, notification
  automatique par e-mail au collaborateur ET au client (avec le nom du conseiller
  en charge), message de clôture avec possibilité de noter le collaborateur.
- **Phase 12** — Carte interactive des biens sur Abidjan (position, regroupement
  par zone, clic pour accéder au bien).
- **API WhatsApp Business officielle** — voir l'explication dédiée : ce point
  dépend d'abord d'une démarche administrative de votre part (vérification
  d'entreprise Meta), avant tout développement.
