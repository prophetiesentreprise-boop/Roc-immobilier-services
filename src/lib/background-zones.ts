export interface BackgroundZone {
  key: string;
  label: string;
  hint: string;
}

/**
 * Toutes les zones du site qui peuvent recevoir une photo de fond,
 * modifiables depuis /admin/arriere-plans. Ajouter une nouvelle zone au
 * site plus tard = ajouter une ligne ici + l'utiliser dans la page
 * concernée avec getBackgroundImages() (lib/backgrounds.ts).
 *
 * Ce fichier ne doit importer AUCUN module côté serveur (pas de Supabase,
 * pas de "next/headers") car il est aussi utilisé par des composants
 * client (formulaire d'administration).
 */
export const BACKGROUND_ZONES: BackgroundZone[] = [
  { key: "home_hero", label: "Accueil — encart « Bien du moment »", hint: "Photo d'un bien ou de l'agence, à droite du titre principal." },
  { key: "home_cta", label: "Accueil — bandeau « Estimation gratuite »", hint: "Photo de fond du bandeau orange en bas de page." },
  { key: "letterhead", label: "Contact & Prendre RDV — bandeau supérieur", hint: "Photo de fond commune aux deux pages." },
  { key: "services_banner", label: "Nos services — bandeau supérieur", hint: "Photo de fond du haut de la page « Nos services »." },
  { key: "services_cta", label: "Nos services — bandeau final", hint: "Photo de fond du bandeau de contact en bas de page." },
  { key: "service_vente", label: "Nos services — bloc « Vente »", hint: "" },
  { key: "service_achat", label: "Nos services — bloc « Achat »", hint: "" },
  { key: "service_location", label: "Nos services — bloc « Location »", hint: "" },
  { key: "service_gestion", label: "Nos services — bloc « Gestion locative »", hint: "" },
  { key: "service_investissement", label: "Nos services — bloc « Investissement »", hint: "" },
  { key: "service_juridique", label: "Nos services — bloc « Accompagnement juridique »", hint: "" },
];
