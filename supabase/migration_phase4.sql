-- =========================================================================
-- ROC IMMOBILIER SERVICES — Migration Phase 4 (équipe, photo de fond agence)
-- À exécuter dans Supabase : Project > SQL Editor > New query > coller > Run
-- Sans risque : n'efface aucune donnée existante.
-- =========================================================================

-- 1) PHOTO DE FOND DE LA BANNIÈRE "L'AGENCE" --------------------------------
alter table site_settings add column if not exists agency_hero_photo_url text;

-- 2) MEMBRES DE L'ÉQUIPE -----------------------------------------------------
create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  role text not null,
  photo_url text,
  phone text default '',
  email text default '',
  whatsapp text default '',
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table team_members enable row level security;

create policy "Lecture publique de l'équipe"
  on team_members for select
  to anon, authenticated
  using (true);

create policy "Équipe : gestion des membres (ajout)"
  on team_members for insert
  to authenticated
  with check (true);

create policy "Équipe : gestion des membres (modification)"
  on team_members for update
  to authenticated
  using (true);

create policy "Équipe : gestion des membres (suppression)"
  on team_members for delete
  to authenticated
  using (true);

-- Les photos de l'équipe utilisent le même espace de stockage que le logo
-- (bucket "site-assets", créé en Phase 3) — aucune nouvelle policy nécessaire.
