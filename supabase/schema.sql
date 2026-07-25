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
  ('maison-colombages-centre-colmar', 'Maison à colombages rénovée, centre historique', 'vente', 'Maison', 495000, 'Colmar', '68000', 140, 6, 4, 'C', 'B',
   'À deux pas de la Petite Venise, cette maison à colombages entièrement rénovée offre de belles pièces de vie, une cour intérieure privative et des matériaux d''origine préservés.',
   array['Cour privative','Poutres apparentes','Cave voûtée','Proche centre historique'], 'disponible', true, '#8B5A34'),

  ('appartement-lumineux-quartier-gare', 'Appartement traversant lumineux, quartier gare', 'vente', 'Appartement', 219000, 'Colmar', '68000', 78, 4, 2, 'D', 'D',
   'Au 3e étage avec ascenseur, cet appartement traversant bénéficie d''une double exposition est-ouest, avec balcon filant et parking privatif.',
   array['Ascenseur','Double exposition','Parking privatif','Proche gare TGV'], 'disponible', true, '#5F6F52'),

  ('villa-contemporaine-piscine-wintzenheim', 'Villa contemporaine avec piscine, Wintzenheim', 'vente', 'Maison', 690000, 'Wintzenheim', '68920', 210, 7, 5, 'A', 'A',
   'Construction 2022 basse consommation, cette villa d''architecte offre de vastes volumes baignés de lumière, une piscine à débordement et un jardin paysager.',
   array['Piscine à débordement','Domotique','BBC 2022','Jardin 1200 m²'], 'disponible', true, '#202B38'),

  ('studio-meuble-hyper-centre', 'Studio meublé, hyper-centre', 'location', 'Appartement', 480, 'Colmar', '68000', 24, 1, 0, 'D', 'C',
   'Studio meublé et fonctionnel en plein cœur de Colmar, idéal étudiant ou jeune actif, charges comprises.',
   array['Meublé','Charges comprises','Hyper-centre','Disponible immédiatement'], 'disponible', false, '#6E2A34')
on conflict (slug) do nothing;
