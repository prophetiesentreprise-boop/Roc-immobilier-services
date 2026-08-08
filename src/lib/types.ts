export type PropertyKind = "vente" | "location";

export type PropertyCategory =
  | "Maison"
  | "Villa"
  | "Duplex"
  | "Immeuble"
  | "Appartement"
  | "Studio"
  | "Terrain"
  | "Local commercial"
  | "Bureau"
  | "Autre";

export const PROPERTY_CATEGORIES: PropertyCategory[] = [
  "Maison", "Villa", "Duplex", "Immeuble", "Appartement", "Studio",
  "Terrain", "Local commercial", "Bureau", "Autre",
];

export interface Property {
  id: string;
  slug: string;
  title: string;
  kind: PropertyKind;
  category: PropertyCategory;
  price: number; // FCFA ; loyer mensuel si location
  city: string;
  postal_code: string;
  surface_m2: number | null;
  rooms: number;
  bedrooms: number;
  dpe: "A" | "B" | "C" | "D" | "E" | "F" | "G" | null;
  ges: "A" | "B" | "C" | "D" | "E" | "F" | "G" | null;
  description: string;
  highlights: string[];
  status: "disponible" | "sous_compromis" | "vendu" | "loue";
  featured: boolean;
  cover_color: string; // repli visuel tant qu'aucune photo n'est ajoutée
  photos: string[]; // URLs Supabase Storage
  videos: string[]; // liens YouTube/Vimeo ou fichiers vidéo hébergés
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
  assigned_to: string | null;
  feedback_rating: number | null;
  feedback_comment: string | null;
  feedback_disputed: boolean;
  feedback_submitted_at: string | null;
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
  assigned_to: string | null;
}

export interface TeamMember {
  id: string;
  full_name: string;
  role: string;
  photo_url: string | null;
  phone: string;
  email: string;
  whatsapp: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  display_order: number;
  created_at: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  published_at: string; // YYYY-MM-DD
  created_at: string;
}
