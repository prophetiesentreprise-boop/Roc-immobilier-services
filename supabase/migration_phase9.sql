-- =========================================================================
-- ROC IMMOBILIER SERVICES — Migration Phase 9
-- (champs optionnels, vidéos des biens)
-- À exécuter dans Supabase : Project > SQL Editor > New query > coller > Run
-- Sans risque : n'efface aucune donnée existante.
-- =========================================================================

-- 1) Surface, DPE et GES deviennent optionnels ------------------------------
alter table properties alter column surface_m2 drop not null;
alter table properties alter column dpe drop not null;
alter table properties alter column dpe drop default;
alter table properties alter column ges drop not null;
alter table properties alter column ges drop default;
-- Note : les contraintes existantes (dpe/ges parmi A-G) continuent
-- d'accepter la valeur vide (NULL) automatiquement, aucune modification
-- supplémentaire n'est nécessaire.

-- 2) Vidéos des biens ---------------------------------------------------------
alter table properties add column if not exists videos text[] not null default '{}';
