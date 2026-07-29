"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { SiteSettings } from "@/lib/site-settings";
import { SingleImageUploader } from "./SingleImageUploader";

export function SiteSettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const [logoUrl, setLogoUrl] = useState<string | null>(settings.logo_url);
  const [heroPhotoUrl, setHeroPhotoUrl] = useState<string | null>(settings.agency_hero_photo_url);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaved(false);

    const supabase = createClient();
    if (!supabase) {
      setError("Supabase n'est pas configuré.");
      setLoading(false);
      return;
    }

    const form = new FormData(e.currentTarget);
    const payload = {
      logo_url: logoUrl,
      agency_hero_photo_url: heroPhotoUrl,
      hero_eyebrow: form.get("hero_eyebrow"),
      hero_title: form.get("hero_title"),
      hero_subtitle: form.get("hero_subtitle"),
      value_prop_title_1: form.get("value_prop_title_1"),
      value_prop_text_1: form.get("value_prop_text_1"),
      value_prop_title_2: form.get("value_prop_title_2"),
      value_prop_text_2: form.get("value_prop_text_2"),
      value_prop_title_3: form.get("value_prop_title_3"),
      value_prop_text_3: form.get("value_prop_text_3"),
      agency_intro: form.get("agency_intro"),
      footer_tagline: form.get("footer_tagline"),
    };

    const { error } = await supabase.from("site_settings").update(payload).eq("id", 1);
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-2xl gap-8">
      <div className="rounded-sm border border-ligne bg-craie-100 p-5">
        <SingleImageUploader
          imageUrl={logoUrl}
          onChange={setLogoUrl}
          label="Logo de l'agence"
          folder="logo"
          hint="Format recommandé : PNG avec fond transparent, environ 400×120 px."
        />
      </div>

      <div className="rounded-sm border border-ligne bg-craie-100 p-5">
        <p className="eyebrow mb-3">Page d'accueil — en-tête</p>
        <div className="grid gap-4">
          <div>
            <label className="eyebrow mb-1 block">Petite phrase au-dessus du titre</label>
            <input name="hero_eyebrow" defaultValue={settings.hero_eyebrow} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
          </div>
          <div>
            <label className="eyebrow mb-1 block">Titre principal</label>
            <input name="hero_title" defaultValue={settings.hero_title} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
            <p className="mt-1 text-xs text-encre/45">Le dernier mot est automatiquement mis en couleur.</p>
          </div>
          <div>
            <label className="eyebrow mb-1 block">Texte sous le titre</label>
            <textarea name="hero_subtitle" rows={3} defaultValue={settings.hero_subtitle} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-ligne bg-craie-100 p-5">
        <p className="eyebrow mb-3">Page d'accueil — bandeau « pourquoi nous choisir »</p>
        <div className="grid gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="grid gap-2 sm:grid-cols-2">
              <input
                name={`value_prop_title_${n}`}
                defaultValue={settings[`value_prop_title_${n}` as keyof SiteSettings] as string}
                placeholder={`Titre ${n}`}
                className="rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm"
              />
              <input
                name={`value_prop_text_${n}`}
                defaultValue={settings[`value_prop_text_${n}` as keyof SiteSettings] as string}
                placeholder={`Texte ${n}`}
                className="rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-sm border border-ligne bg-craie-100 p-5">
        <p className="eyebrow mb-3">Page « L'agence »</p>
        <div className="grid gap-4">
          <SingleImageUploader
            imageUrl={heroPhotoUrl}
            onChange={setHeroPhotoUrl}
            label="Photo de fond de la bannière"
            folder="agence"
            hint="Une photo large (bâtiment, équipe, ville) rend la bannière plus vivante. Sans photo, un dégradé de couleur chaleureux s'affiche à la place."
          />
          <div>
            <label className="eyebrow mb-1 block">Premier paragraphe de présentation</label>
            <textarea name="agency_intro" rows={4} defaultValue={settings.agency_intro} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-ligne bg-craie-100 p-5">
        <p className="eyebrow mb-3">Pied de page</p>
        <label className="eyebrow mb-1 block">Phrase sous le logo</label>
        <textarea name="footer_tagline" rows={2} defaultValue={settings.footer_tagline} className="w-full rounded-sm border border-ligne bg-white px-3 py-2.5 text-sm" />
      </div>

      {error && <p className="text-sm text-pinot">{error}</p>}
      {saved && !error && <p className="text-sm text-vigne">Réglages enregistrés avec succès.</p>}

      <button type="submit" disabled={loading} className="btn-primary w-fit text-sm">
        {loading && <Loader2 className="animate-spin" size={16} />}
        Enregistrer les modifications
      </button>
    </form>
  );
}
