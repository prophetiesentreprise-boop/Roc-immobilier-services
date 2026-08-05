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

  // Adresse e-mail unique : affichée sur le site ET destinataire des
  // notifications automatiques (voir src/lib/notify.ts).
  emails: ["info@rocimmobilierservices.ci"],

  address: {
    line1: "Cocody - II Plateaux",
    line2: "derrière la pharmacie Las Palmas - Bat I - porte 106",
    postal: "06 BP 740 ABIDJAN 06",
    city: "Abidjan",
    country: "Côte d'Ivoire",
  },

  hours: "Lun–Ven 9h–17h · Sam 9h–12h",
} as const;

/** Adresse complète en une ligne (utilisée dans les textes et le titre de la carte). */
export const fullAddressQuery = `${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.city}, ${siteConfig.address.country}`;

/** Adresse publique du site, utilisée pour le sitemap et le fichier robots.txt. */
export const siteUrl = "https://rocimmobilierservices.ci";

/** Carte Google Maps centrée sur les coordonnées exactes de l'agence. */
export const mapEmbedUrl = "https://maps.google.com/maps?q=5.3815026,-3.9943939&z=17&output=embed";

export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
