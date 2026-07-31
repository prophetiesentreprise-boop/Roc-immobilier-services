/**
 * Configuration centrale du site Roc Immobilier SErvices.
 * Modifiez les valeurs ci-dessous pour mettre à jour les informations
 * partout sur le site (en-tête, pied de page, contact, RDV, WhatsApp...).
 */
export const siteConfig = {
  agencyName: "Roc Immobilier SErvices",
  city: "Abidjan",
  country: "Côte d'Ivoire",
  since: "2016",

  phoneDisplay: "+225 05 76 83 84 84",
  phoneHref: "+2250576838484",
  whatsappNumber: "2250576838484", // sans le "+", pour les liens wa.me

  // Deux adresses e-mail : affichées sur le site ET destinataires des
  // notifications automatiques (voir src/lib/notify.ts).
  emails: ["rocimmobilierservices@gmail.com", "info@rocimmobilierservices.com"],

  address: {
    line1: "Cocody - II Plateaux",
    line2: "derrière la pharmacie Las Palmas - Bat I - porte 106",
    postal: "06 BP 740 ABIDJAN 06",
    city: "Abidjan",
    country: "Côte d'Ivoire",
  },

  hours: "Lun–Ven 9h–18h30 · Sam 9h–13h",
} as const;

/** Adresse complète en une ligne, utilisée pour la recherche sur la carte. */
export const fullAddressQuery = `${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.city}, ${siteConfig.address.country}`;

/** Carte Google Maps centrée automatiquement sur l'adresse ci-dessus (aucune clé API requise). */
export const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(fullAddressQuery)}&z=16&output=embed`;

export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
