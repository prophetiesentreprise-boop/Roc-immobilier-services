-- =========================================================================
-- ROC IMMOBILIER SERVICES — Migration Phase 6
-- (réseaux sociaux de l'équipe + catégories de biens élargies)
-- À exécuter dans Supabase : Project > SQL Editor > New query > coller > Run
-- Sans risque : n'efface aucune donnée existante.
-- =========================================================================

-- 1) RÉSEAUX SOCIAUX PAR MEMBRE DE L'ÉQUIPE ----------------------------------
alter table team_members add column if not exists facebook_url text default '';
alter table team_members add column if not exists instagram_url text default '';
alter table team_members add column if not exists linkedin_url text default '';

-- 2) CATÉGORIES DE BIENS ÉLARGIES --------------------------------------------
-- On retire l'ancienne contrainte (qui limitait à 4 catégories) et on la
-- remplace par une liste plus complète, pour que chaque bien trouve sa
-- catégorie exacte.
alter table properties drop constraint if exists properties_category_check;
alter table properties add constraint properties_category_check
  check (category in (
    'Maison', 'Villa', 'Duplex', 'Immeuble', 'Appartement', 'Studio',
    'Terrain', 'Local commercial', 'Bureau', 'Autre'
  ));
