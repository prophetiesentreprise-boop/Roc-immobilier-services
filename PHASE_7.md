# Phase 7 — Réseaux sociaux équipe, transfert WhatsApp, catégories de biens

## 1. Mettre à jour la base de données (obligatoire)

Supabase → **SQL Editor** → **New query** → copiez tout `supabase/migration_phase6.sql`
→ **Run**.

## 2. Mettre à jour le code

Comme d'habitude (remplacez le dossier en gardant `node_modules`, `.git`,
`.env.local`), puis :
```
npm install
npm run dev
```

## 3. Réseaux sociaux de l'équipe

1. `/admin/equipe` → ouvrez ou créez un membre.
2. Renseignez ses liens **Facebook**, **Instagram**, **LinkedIn** (optionnels).
3. Ils s'affichent désormais sous forme de petits badges cliquables sur la page
   "L'agence", à côté du téléphone, de l'e-mail et du WhatsApp de chaque membre.

## 4. Transfert des demandes vers le WhatsApp d'un membre de l'équipe

**Ce qui a été construit, en toute transparence :**

Dans `/admin/leads` et `/admin/rdv`, chaque demande affiche maintenant un menu
"Transférer sur WhatsApp" : vous choisissez le membre de l'équipe concerné, un clic
ouvre WhatsApp avec un message déjà rédigé (nom du client, téléphone, motif de la
demande), prêt à envoyer.

**Ce qui n'a pas été fait, et pourquoi :** une redirection **totalement automatique**
(sans clic, envoyée directement par le serveur) nécessite l'API WhatsApp Business
officielle de Meta — un accès payant, avec vérification d'entreprise, numéro dédié et
délai d'approbation. Ce n'est pas quelque chose qu'on peut activer gratuitement ni
immédiatement. La solution mise en place aujourd'hui (transfert en un clic) obtient le
même résultat pratique — le message part vers le bon conseiller — simplement avec
un clic de validation au lieu d'un envoi invisible. Si un jour le volume de demandes
justifie l'investissement dans l'API officielle, cette évolution reste possible.

## 5. Catégories de biens élargies

Le champ "Type de bien" propose maintenant : Maison, **Villa**, **Duplex**,
**Immeuble**, Appartement, **Studio**, Terrain, Local commercial, **Bureau**, **Autre**.

Le nombre de pièces (2 pièces, 3 pièces...) reste géré séparément, via le champ
"Pièces" déjà présent sur chaque bien — c'est volontaire : cela évite d'avoir à créer
une catégorie différente pour chaque combinaison possible ("Appartement 2 pièces",
"Appartement 3 pièces"...), et rend la recherche plus flexible pour vos clients.

Ce changement s'applique partout : recherche du site, filtres, formulaire d'ajout
de bien, formulaire d'estimation.

## 6. Page « L'agence »

- Ajout de « Conseil juridique et accompagnement fiscal » dans la liste des
  engagements.
- Suppression de la phrase de rappel interne qui s'affichait sous cette liste.
