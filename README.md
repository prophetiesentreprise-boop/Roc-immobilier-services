# ROC Immobilier — site web + back-office

Site vitrine et back-office pour une agence immobilière, construit avec :

- **Next.js** (React) + **TypeScript** + **Tailwind CSS** pour le site
- **Supabase** (base de données + authentification) pour le back-office et les biens
- Déploiement prévu sur **Vercel** (gratuit pour démarrer)

Le site fonctionne **dès maintenant en mode démo**, avec 6 biens d'exemple, même sans
configurer Supabase. Une fois Supabase branché (voir `GUIDE_10_JOURS.md`), les vraies
données prennent le relais automatiquement, et le back-office `/admin` s'active.

## Structure du projet

```
src/
  app/                  → toutes les pages (une page = un dossier)
    page.tsx            → page d'accueil
    acheter/            → page "Acheter"
    louer/               → page "Louer"
    biens/[slug]/        → fiche bien détaillée
    estimer/              → estimation en ligne
    contact/               → page contact
    agence/                → page "L'agence"
    gestion-locative/       → page gestion locative
    admin/                  → back-office (protégé par mot de passe)
      login/                → connexion
      biens/                → gestion des biens (liste, ajout, édition)
      leads/                → demandes reçues
    api/leads/route.ts     → réception des formulaires
  components/            → éléments réutilisables (menu, pied de page, cartes biens…)
  lib/                    → connexion Supabase, types, données de démo
supabase/schema.sql      → script à exécuter dans Supabase pour créer la base
.env.example             → variables à copier dans .env.local
```

## Démarrage en local (résumé — détails dans GUIDE_10_JOURS.md)

```bash
npm install
npm run dev
```

Puis ouvrez http://localhost:3000

## Fonctionnalités incluses

- Recherche de biens avec filtres (ville, type, budget)
- Fiches biens détaillées (DPE/GES, points forts, formulaire de visite)
- Formulaires connectés (contact, estimation, demande de visite)
- Back-office : connexion sécurisée, ajout/modification/suppression de biens,
  suivi des demandes reçues
- Design entièrement personnalisé (pas un thème générique)
- Responsive (mobile, tablette, ordinateur)

## Fonctionnalités volontairement laissées pour une phase 2

Pour tenir un délai de 10 jours avec une base saine, ces éléments du cahier des charges
initial ne sont pas encore inclus. Ils s'ajoutent sans tout reconstruire :

- Diffusion automatique vers les portails (SeLoger, Leboncoin, Bien'ici…)
- Signature électronique des mandats/baux
- Espace client propriétaire/locataire avec documents et quittances
- Simulateurs de prêt et de rentabilité locative
- Chatbot et matching IA
- Blog

## Support

Ce projet est un point de départ solide, pas un produit figé : chaque page est un
fichier `.tsx` lisible, que vous pouvez modifier texte par texte même sans grande
expérience en code (voir GUIDE_10_JOURS.md, étape 6).
