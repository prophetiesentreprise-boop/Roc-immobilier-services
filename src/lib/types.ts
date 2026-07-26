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
  price: number; // FCFA ; loyer mensuel si location
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
  cover_color: string; // repli visuel tant qu'aucune photo n'est ajoutée
  photos: string[]; // URLs Supabase Storage
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
  photos: string[];
  status: "nouveau" | "en_cours" | "traite";
}

export interface Appointment {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  reason: string;
  appointment_date: string; // YYYY-MM-DD
  appointment_time: string; // ex. "10:00"
  message: string;
  status: "nouveau" | "confirme" | "annule";
}
