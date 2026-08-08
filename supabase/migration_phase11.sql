-- =========================================================================
-- ROC IMMOBILIER SERVICES — Migration Phase 11
-- (attribution des demandes, notifications automatiques, avis client)
-- À exécuter dans Supabase : Project > SQL Editor > New query > coller > Run
-- Sans risque : n'efface aucune donnée existante.
-- =========================================================================

-- 1) ATTRIBUTION D'UN CONSEILLER --------------------------------------------
alter table leads add column if not exists assigned_to uuid references team_members(id) on delete set null;
alter table appointments add column if not exists assigned_to uuid references team_members(id) on delete set null;

-- 2) SUIVI DES NOTIFICATIONS ENVOYÉES (évite les doublons d'e-mails) --------
alter table leads add column if not exists assigned_notified_at timestamptz;
alter table leads add column if not exists closed_notified_at timestamptz;
alter table appointments add column if not exists assigned_notified_at timestamptz;

-- 3) AVIS CLIENT SUR LE TRAITEMENT DE SA DEMANDE -----------------------------
-- Le dépôt d'avis se fait via une route API dédiée côté serveur (pas
-- d'accès direct depuis le navigateur), donc aucune policy publique
-- supplémentaire n'est nécessaire : la sécurité est assurée par le code,
-- pas par une ouverture de la base de données.
alter table leads add column if not exists feedback_rating int check (feedback_rating between 1 and 5);
alter table leads add column if not exists feedback_comment text;
alter table leads add column if not exists feedback_disputed boolean not null default false;
alter table leads add column if not exists feedback_submitted_at timestamptz;
