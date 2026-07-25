export type PropertyKind = "vente" | "location";

export type PropertyCategory =
  | "Maison"
  | "Appartement"
  | "Terrain"
  | "Local commercial";

export interface Property {
  id: string;
  slug: string;
  title: string;
  kind: PropertyKind;
  category: PropertyCategory;
  price: number; // euros ; loyer mensuel si location
  city: string;
  postal_code: string;
  surface_m2: number;
  rooms: number;
  bedrooms: number;
  dpe: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  ges: "A" | "B" | "C" | "D" | "E" | "F" | "G";
  description: string;
  highlights: string[];
  status: "disponible" | "sous_compromis" | "vendu" | "loue";
  featured: boolean;
  cover_color: string; // placeholder visual accent while real photos are added
  created_at: string;
}

export interface Lead {
  id: string;
  created_at: string;
  type: "estimation" | "contact" | "visite" | "alerte";
  full_name: string;
  email: string;
  phone: string;
  message: string;
  property_id: string | null;
  status: "nouveau" | "en_cours" | "traite";
}
