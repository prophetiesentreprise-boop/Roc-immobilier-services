import { createClient } from "./supabase/server";
import { demoProperties, getDemoPropertyBySlug } from "./demo-data";
import { Property, PropertyKind } from "./types";

export interface PropertyFilters {
  kind?: PropertyKind;
  city?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export async function getProperties(filters: PropertyFilters = {}): Promise<Property[]> {
  const supabase = await createClient();

  let results: Property[];

  if (!supabase) {
    results = demoProperties;
  } else {
    let query = supabase.from("properties").select("*").order("created_at", { ascending: false });
    if (filters.kind) query = query.eq("kind", filters.kind);
    if (filters.city) query = query.ilike("city", `%${filters.city}%`);
    if (filters.category) query = query.eq("category", filters.category);
    if (filters.minPrice) query = query.gte("price", filters.minPrice);
    if (filters.maxPrice) query = query.lte("price", filters.maxPrice);

    const { data, error } = await query;

    if (error) {
      // Vraie erreur (mauvaise configuration...) : on affiche les biens de
      // démonstration pour que le site reste présentable.
      results = demoProperties;
    } else if (!data || data.length === 0) {
      // Aucun bien ne correspond à ces filtres. Avant de conclure que la
      // base est "vide" (site tout neuf, jamais configuré), on vérifie s'il
      // existe au moins un bien réel ailleurs dans la table, filtres
      // exclus. Si oui, ce résultat vide est légitime (ex. plus aucun bien
      // "à vendre" pour l'instant) : on ne doit surtout pas le masquer avec
      // les données de démonstration, qui donneraient l'impression qu'une
      // suppression n'a pas fonctionné.
      const { count } = await supabase.from("properties").select("*", { count: "exact", head: true });
      results = count && count > 0 ? [] : demoProperties;
    } else {
      results = data as Property[];
      // On applique quand même les filtres en mémoire si jamais la requête
      // Supabase ne les a pas tous supportés (garde-fou pour débutants).
    }
  }

  return results.filter((p) => {
    if (filters.kind && p.kind !== filters.kind) return false;
    if (filters.city && !p.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (filters.category && p.category !== filters.category) return false;
    if (filters.minPrice && p.price < filters.minPrice) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    return true;
  });
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const all = await getProperties();
  const featured = all.filter((p) => p.featured);
  return (featured.length > 0 ? featured : all).slice(0, 3);
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const supabase = await createClient();
  if (!supabase) return getDemoPropertyBySlug(slug);

  const { data, error } = await supabase.from("properties").select("*").eq("slug", slug).single();
  if (error || !data) return getDemoPropertyBySlug(slug);
  return data as Property;
}
