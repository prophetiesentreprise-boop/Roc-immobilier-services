-- =========================================================================
-- ROC IMMOBILIER — Script de création de la base de données
-- À exécuter dans Supabase : Project > SQL Editor > New query > coller > Run
-- Voir README.md, étape 4, pour le mode d'emploi complet.
-- =========================================================================

-- 1) TABLE DES BIENS -------------------------------------------------------
create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  kind text not null check (kind in ('vente', 'location')),
  category text not null check (category in ('Maison', 'Appartement', 'Terrain', 'Local commercial')),
  price numeric not null,
  city text not null,
  postal_code text not null,
  surface_m2 numeric not null,
  rooms integer not null default 0,
  bedrooms integer not null default 0,
  dpe text not null default 'D' check (dpe in ('A','B','C','D','E','F','G')),
  ges text not null default 'D' check (ges in ('A','B','C','D','E','F','G')),
  description text not null default '',
  highlights text[] not null default '{}',
  status text not null default 'disponible' check (status in ('disponible','sous_compromis','vendu','loue')),
  featured boolean not null default false,
  cover_color text not null default '#8B5A34',
  created_at timestamptz not null default now()
);

-- 2) TABLE DES DEMANDES (LEADS) --------------------------------------------
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null check (type in ('estimation','contact','visite','alerte')),
  full_name text not null,
  email text not null,
  phone text default '',
  message text default '',
  property_id uuid references properties(id) on delete set null,
  status text not null default 'nouveau' check (status in ('nouveau','en_cours','traite'))
);

-- 3) SÉCURITÉ (Row Level Security) -----------------------------------------
-- Le site public peut LIRE les biens et ENVOYER des demandes (formulaires),
-- mais seule une personne connectée (votre équipe, via /admin) peut créer,
-- modifier ou supprimer des biens, et lire/modifier les demandes reçues.

alter table properties enable row level security;
alter table leads enable row level security;

create policy "Lecture publique des biens"
  on properties for select
  to anon, authenticated
  using (true);

create policy "Équipe : création de biens"
  on properties for insert
  to authenticated
  with check (true);

create policy "Équipe : modification de biens"
  on properties for update
  to authenticated
  using (true);

create policy "Équipe : suppression de biens"
  on properties for delete
  to authenticated
  using (true);

create policy "Formulaires publics : envoi d'une demande"
  on leads for insert
  to anon, authenticated
  with check (true);

create policy "Équipe : lecture des demandes"
  on leads for select
  to authenticated
  using (true);

create policy "Équipe : mise à jour des demandes"
  on leads for update
  to authenticated
  using (true);

-- 4) DONNÉES DE DÉPART (facultatif, vous pouvez les modifier ou les supprimer) --
insert into properties
  (slug, title, kind, category, price, city, postal_code, surface_m2, rooms, bedrooms, dpe, ges, description, highlights, status, featured, cover_color)
values
  ('villa-standing-cocody-riviera', 'Villa de standing avec piscine, Cocody Riviera', 'vente', 'Maison', 185000000, 'Cocody', 'Abidjan', 320, 7, 5, 'B', 'B',
   'Dans un quartier résidentiel calme de Cocody Riviera, cette villa contemporaine offre de vastes volumes, une piscine, un jardin paysager et un système de sécurité 24h/24.',
   array['Piscine','Groupe électrogène','Forage d''eau','Quartier sécurisé'], 'disponible', true, '#8B5A34'),

  ('appartement-standing-plateau', 'Appartement 3 pièces avec vue, Le Plateau', 'vente', 'Appartement', 65000000, 'Plateau', 'Abidjan', 95, 4, 2, 'C', 'C',
   'Au 8e étage d''une résidence sécurisée du Plateau, cet appartement offre une vue dégagée sur la lagune. Ascenseur, parking privatif, gardiennage permanent.',
   array['Vue lagune','Ascenseur','Parking privatif','Gardiennage 24h/24'], 'disponible', true, '#5F6F52'),

  ('villa-moderne-angre', 'Villa moderne 4 chambres, Angré', 'vente', 'Maison', 98000000, 'Angré', 'Abidjan', 260, 6, 4, 'B', 'A',
   'Construction récente à Angré 8e Tranche, cette villa moderne dispose d''un salon double, d''une cuisine équipée et d''une cour arborée.',
   array['Construction récente','Logement gardien','Cour arborée','Cuisine équipée'], 'disponible', true, '#202B38'),

  ('studio-meuble-marcory', 'Studio meublé, Marcory Résidentiel', 'location', 'Appartement', 180000, 'Marcory', 'Abidjan', 28, 1, 0, 'D', 'C',
   'Studio meublé et climatisé dans une résidence calme de Marcory, idéal jeune actif ou expatrié.',
   array['Meublé','Climatisé','Résidence sécurisée','Disponible immédiatement'], 'disponible', false, '#6E2A34')
on conflict (slug) do nothing;
