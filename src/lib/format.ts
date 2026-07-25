export function formatPrice(value: number, kind: "vente" | "location") {
  const formatted = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
  return kind === "location" ? `${formatted} / mois` : formatted;
}
