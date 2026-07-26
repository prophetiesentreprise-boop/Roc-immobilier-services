-- =========================================================================
-- ROC IMMOBILIER — Migration Phase 2 (photos, rendez-vous)
-- À exécuter dans Supabase : Project > SQL Editor > New query > coller > Run
-- Sans risque : n'efface aucune donnée existante.
-- =========================================================================

-- 1) PHOTOS DES BIENS -------------------------------------------------------
alter table properties add column if not exists photos text[] not null default '{}';

-- Bucket de stockage pour les photos (lecture publique, écriture réservée
-- à l'équipe connectée)
insert into storage.buckets (id, name, public)
values ('property-photos', 'property-photos', true)
on conflict (id) do nothing;

create policy "Lecture publique des photos"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'property-photos');

create policy "Équipe : upload de photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'property-photos');

create policy "Équipe : suppression de photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'property-photos');

-- 2) PHOTOS SUR LES DEMANDES (ex. estimation avec photos du bien) ----------
alter table leads add column if not exists photos text[] not null default '{}';

-- 3) RENDEZ-VOUS ------------------------------------------------------------
create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text not null,
  reason text not null,
  appointment_date date not null,
  appointment_time text not null,
  message text default '',
  status text not null default 'nouveau' check (status in ('nouveau','confirme','annule'))
);

alter table appointments enable row level security;

create policy "Formulaire public : prise de RDV"
  on appointments for insert
  to anon, authenticated
  with check (true);

create policy "Équipe : lecture des RDV"
  on appointments for select
  to authenticated
  using (true);

create policy "Équipe : mise à jour des RDV"
  on appointments for update
  to authenticated
  using (true);
