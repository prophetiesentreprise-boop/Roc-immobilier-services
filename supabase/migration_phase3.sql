-- =========================================================================
-- ROC IMMOBILIER — Migration Phase 3 (logo + textes modifiables)
-- À exécuter dans Supabase : Project > SQL Editor > New query > coller > Run
-- Sans risque : n'efface aucune donnée existante.
-- =========================================================================

create table if not exists site_settings (
  id int primary key default 1,
  logo_url text,
  hero_eyebrow text not null default 'Agence indépendante à Abidjan · depuis 2016',
  hero_title text not null default 'L''immobilier ivoirien, conseillé avec exigence.',
  hero_subtitle text not null default 'ROC Immobilier Services accompagne particuliers et investisseurs à Abidjan et dans sa région : vente, achat, location et gestion locative, avec la même rigueur à chaque étape.',
  value_prop_title_1 text not null default 'Spécialistes du terrain',
  value_prop_text_1 text not null default 'Une équipe de professionnels qui connaît chaque quartier d''Abidjan.',
  value_prop_title_2 text not null default 'Efficacité',
  value_prop_text_2 text not null default 'Chaque demande est traitée avec rigueur pour une réponse rapide.',
  value_prop_title_3 text not null default 'Accompagnement',
  value_prop_text_3 text not null default 'Un suivi personnalisé du premier contact jusqu''à la signature.',
  agency_intro text not null default 'ROC Immobilier Services est née de la conviction qu''une agence immobilière doit avant tout être une agence de confiance : proche de ses clients, précise dans ses estimations, et rigoureuse dans le suivi de chaque dossier.',
  footer_tagline text not null default 'Agence indépendante à Abidjan, Côte d''Ivoire. Vente, achat, location et gestion locative depuis 2016.',
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

insert into site_settings (id) values (1) on conflict (id) do nothing;

alter table site_settings enable row level security;

create policy "Lecture publique des réglages"
  on site_settings for select
  to anon, authenticated
  using (true);

create policy "Équipe : modification des réglages"
  on site_settings for update
  to authenticated
  using (true);

-- Bucket dédié au logo (même principe que les photos de biens)
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

create policy "Lecture publique des assets du site"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'site-assets');

create policy "Équipe : upload des assets du site"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'site-assets');

create policy "Équipe : suppression des assets du site"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'site-assets');
