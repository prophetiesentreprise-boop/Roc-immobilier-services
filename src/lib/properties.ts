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
    if (error || !data || data.length === 0) {
      results = demoProperties;
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
