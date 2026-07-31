# Roc Immobilier SErvices — site web + back-office

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
- Fiches biens détaillées (DPE/GES, points forts, carrousel de photos, formulaire de visite)
- Upload de photos multiples (biens et demandes d'estimation) via Supabase Storage
- Formulaires connectés (contact, estimation, demande de visite)
- Page de prise de rendez-vous dédiée, avec règle des 48h minimum (vérifiée aussi côté serveur)
- Notifications e-mail optionnelles vers l'agence (via Resend, voir PHASE_2.md)
- Liens WhatsApp directs (contact, fiche bien, confirmation de RDV)
- Chatbot à menus guidés pour orienter les visiteurs
- Back-office : connexion sécurisée, gestion des biens (avec photos), suivi des
  demandes et des rendez-vous
- Design entièrement personnalisé (pas un thème générique)
- Responsive (mobile, tablette, ordinateur)

## Fonctionnalités volontairement laissées pour une phase 3

- Diffusion automatique vers les portails (SeLoger, Leboncoin, Bien'ici…)
- Signature électronique des mandats/baux
- Espace client propriétaire/locataire avec documents et quittances
- Simulateurs de prêt et de rentabilité locative
- Chatbot conversationnel basé sur une IA générative (API payante)
- Envoi automatique de confirmation WhatsApp côté serveur (nécessite l'API WhatsApp Business)
- Blog

## Support

Ce projet est un point de départ solide, pas un produit figé : chaque page est un
fichier `.tsx` lisible, que vous pouvez modifier texte par texte même sans grande
expérience en code (voir GUIDE_10_JOURS.md, étape 6).
