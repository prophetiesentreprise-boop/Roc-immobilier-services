import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ici tu peux appeler Supabase pour lister dynamiquement
  // les biens et les articles d'actualité
  const staticPages = [
    '', 'agence', 'acheter', 'louer', 'estimer',
    'nos-services', 'actualites', 'rdv', 'contact', 'mentions-legales',
  ].map((path) => ({
    url: `https://rocimmobilierservices.ci/${path}`,
    lastModified: new Date(),
  }))

  return staticPages
}