/**
 * Configuration centrale du site ROC Immobilier.
 * Modifiez les valeurs ci-dessous pour mettre à jour les informations
 * partout sur le site (en-tête, pied de page, contact, RDV, WhatsApp...).
 */
export const siteConfig = {
  agencyName: "ROC Immobilier",
  city: "Abidjan",
  country: "Côte d'Ivoire",
  since: "2016",

  // ⚠️ Remplacez par le vrai numéro de l'agence (format international,
  // sans espaces, pour que les liens tél. et WhatsApp fonctionnent) :
  phoneDisplay: "+225 01 23 45 67 89",
  phoneHref: "+2250123456789",
  whatsappNumber: "2250123456789", // sans le "+", pour les liens wa.me

  email: "contact@rocimmobilierservice.com",

  address: {
    line1: "Cocody, Génie 2000",
    line2: "non loin de Playce Palmeraie",
    city: "Abidjan",
    country: "Côte d'Ivoire",
  },

  hours: "Lun–Ven 9h–18h30 · Sam 9h–13h",

  // Carte centrée sur Cocody / Riviera Palmeraie (Abidjan)
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=-3.9950%2C5.3450%2C-3.9500%2C5.3800&layer=mapnik&marker=5.3620%2C-3.9700",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
