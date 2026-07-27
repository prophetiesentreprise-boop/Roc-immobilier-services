import { createClient } from "./supabase/server";

export interface SiteSettings {
  logo_url: string | null;
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  value_prop_title_1: string;
  value_prop_text_1: string;
  value_prop_title_2: string;
  value_prop_text_2: string;
  value_prop_title_3: string;
  value_prop_text_3: string;
  agency_intro: string;
  footer_tagline: string;
}

export const defaultSiteSettings: SiteSettings = {
  logo_url: null,
  hero_eyebrow: "Agence indépendante à Abidjan · depuis 2016",
  hero_title: "L'immobilier ivoirien, conseillé avec exigence.",
  hero_subtitle:
    "ROC Immobilier Services accompagne particuliers et investisseurs à Abidjan et dans sa région : vente, achat, location et gestion locative, avec la même rigueur à chaque étape.",
  value_prop_title_1: "Spécialistes du terrain",
  value_prop_text_1: "Une équipe de professionnels qui connaît chaque quartier d'Abidjan.",
  value_prop_title_2: "Efficacité",
  value_prop_text_2: "Chaque demande est traitée avec rigueur pour une réponse rapide.",
  value_prop_title_3: "Accompagnement",
  value_prop_text_3: "Un suivi personnalisé du premier contact jusqu'à la signature.",
  agency_intro:
    "ROC Immobilier Services est née de la conviction qu'une agence immobilière doit avant tout être une agence de confiance : proche de ses clients, précise dans ses estimations, et rigoureuse dans le suivi de chaque dossier.",
  footer_tagline:
    "Agence indépendante à Abidjan, Côte d'Ivoire. Vente, achat, location et gestion locative depuis 2016.",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient();
  if (!supabase) return defaultSiteSettings;

  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  if (error || !data) return defaultSiteSettings;

  return { ...defaultSiteSettings, ...data };
}
