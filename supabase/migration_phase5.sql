-- =========================================================================
-- ROC IMMOBILIER SERVICES — Migration Phase 5 (photos de fond du design)
-- À exécuter dans Supabase : Project > SQL Editor > New query > coller > Run
-- Sans risque : n'efface aucune donnée existante.
-- =========================================================================

create table if not exists background_images (
  key text primary key,
  image_url text,
  updated_at timestamptz not null default now()
);

alter table background_images enable row level security;

create policy "Lecture publique des arrière-plans"
  on background_images for select
  to anon, authenticated
  using (true);

create policy "Équipe : ajout d'arrière-plans"
  on background_images for insert
  to authenticated
  with check (true);

create policy "Équipe : modification des arrière-plans"
  on background_images for update
  to authenticated
  using (true);

-- Les photos utilisent le même espace de stockage que le logo
-- (bucket "site-assets", créé en Phase 3) — aucune nouvelle policy nécessaire.
