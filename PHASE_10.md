# Phase 10 — Collaborateurs gérés depuis /admin

## 1. Récupérer la clé "service_role" (obligatoire, une seule fois)

⚠️ Cette clé donne un accès total à votre base de données. Elle ne doit **jamais**
être partagée, ni ajoutée sur GitHub — uniquement dans Vercel.

1. Supabase → votre projet → **Project Settings** (roue crantée) → **API**.
2. Repérez la clé **service_role** (différente de la clé "anon" déjà utilisée). Cliquez
   sur l'icône de copie.
3. Vercel → votre projet → **Settings → Environment Variables** → **Add New** :
   - Key : `SUPABASE_SERVICE_ROLE_KEY`
   - Value : la clé copiée
   - Environments : cochez **Production** (et Preview si vous voulez tester avant)
4. **Redeploy** votre dernier déploiement pour que la variable soit prise en compte.

## 2. Mettre à jour le code

Comme d'habitude (garder `node_modules`, `.git`, `.env.local`) :
```
npm install
git add .
git commit -m "Phase 10 : collaborateurs gérés depuis /admin"
git push
```
Aucune migration SQL n'est nécessaire pour cette phase (les comptes de connexion sont
gérés par Supabase Authentication, pas par une table).

## 3. Utilisation

1. `/admin/login` → menu **Collaborateurs**.
2. **Ajouter un collaborateur** : nom, e-mail, mot de passe provisoire (8 caractères
   minimum). Le compte est utilisable immédiatement, sans e-mail de confirmation à
   cliquer.
3. Chaque collaborateur peut ensuite se connecter et modifier lui-même son e-mail et
   son mot de passe depuis le menu **Mon compte**.
4. Pour retirer l'accès à quelqu'un : menu **Collaborateurs** → **Retirer**.

## 4. Ce qui n'a pas changé

Tous les collaborateurs ont toujours les mêmes droits (accès complet au back-office).
Une répartition plus fine (ex. un conseiller qui ne voit que ses propres demandes)
reste un chantier possible mais non traité ici.
