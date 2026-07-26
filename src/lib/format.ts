export function formatPrice(value: number, kind: "vente" | "location") {
  const formatted = `${new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(value)} FCFA`;
  return kind === "location" ? `${formatted} / mois` : formatted;
}
