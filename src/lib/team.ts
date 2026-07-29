import { createClient } from "./supabase/server";
import { TeamMember } from "./types";

const demoTeam: TeamMember[] = [
  {
    id: "demo-1",
    full_name: "Direction",
    role: "Pilotage général de l'agence et des grands comptes",
    photo_url: null,
    phone: "",
    email: "",
    whatsapp: "",
    display_order: 1,
    created_at: "",
  },
  {
    id: "demo-2",
    full_name: "Conseillers Vente & Achat",
    role: "Accompagnement des particuliers et investisseurs",
    photo_url: null,
    phone: "",
    email: "",
    whatsapp: "",
    display_order: 2,
    created_at: "",
  },
  {
    id: "demo-3",
    full_name: "Gestion locative",
    role: "Suivi des propriétaires bailleurs et des locataires",
    photo_url: null,
    phone: "",
    email: "",
    whatsapp: "",
    display_order: 3,
    created_at: "",
  },
];

export async function getTeamMembers(): Promise<TeamMember[]> {
  const supabase = await createClient();
  if (!supabase) return demoTeam;

  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("display_order", { ascending: true });

  if (error || !data || data.length === 0) return demoTeam;
  return data as TeamMember[];
}
