import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const BASE_URL = 'https://rocimmobilierservices.ci'

// Utilise les mêmes variables d'environnement que le reste de ton app
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Pages statiques du site
  const staticRoutes = [
    { path: '', changeFrequency: 'daily' as const, priority: 1.0 },
    { path: 'agence', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: 'acheter', changeFrequency: 'daily' as const, priority: 0.9 },
    { path: 'louer', changeFrequency: 'daily' as const, priority: 0.9 },
    { path: 'estimer', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: 'nos-services', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: 'actualites', changeFrequency: 'weekly' as const, priority: 0.7 },
    { path: 'rdv', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: 'contact', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: 'mentions-legales', changeFrequency: 'yearly' as const, priority: 0.2 },
  ].map((route) => ({
    url: `${BASE_URL}/${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // 2. Biens immobiliers — adapte 'properties' et les noms de colonnes
  //    à ta table réelle (ex: 'biens', 'listings'...)
  let propertyRoutes: MetadataRoute.Sitemap = []
  try {
    const { data: properties, error } = await supabase
      .from('properties')
      .select('slug, updated_at')
      // décommente si tu as un statut (ex: ne montrer que les biens publiés/disponibles)
      // .eq('status', 'published')

    if (error) throw error

    propertyRoutes = (properties ?? []).map((property) => ({
      url: `${BASE_URL}/biens/${property.slug}`,
      lastModified: property.updated_at ? new Date(property.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch (err) {
    console.error('Erreur sitemap (properties):', err)
  }

  // 3. Articles d'actualité — adapte 'articles' et les colonnes si besoin
  let articleRoutes: MetadataRoute.Sitemap = []
  try {
    const { data: articles, error } = await supabase
      .from('articles')
      .select('slug, updated_at')
      // .eq('status', 'published')

    if (error) throw error

    articleRoutes = (articles ?? []).map((article) => ({
      url: `${BASE_URL}/actualites/${article.slug}`,
      lastModified: article.updated_at ? new Date(article.updated_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))
  } catch (err) {
    console.error('Erreur sitemap (articles):', err)
  }

  return [...staticRoutes, ...propertyRoutes, ...articleRoutes]
}