import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-config";
import { getProperties } from "@/lib/properties";
import { getArticles } from "@/lib/articles";

const STATIC_ROUTES = [
  { path: "", priority: 1 },
  { path: "/agence", priority: 0.8 },
  { path: "/acheter", priority: 0.9 },
  { path: "/louer", priority: 0.9 },
  { path: "/estimer", priority: 0.7 },
  { path: "/nos-services", priority: 0.7 },
  { path: "/actualites", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
  { path: "/rdv", priority: 0.6 },
  { path: "/mentions-legales", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, articles] = await Promise.all([getProperties(), getArticles()]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route.path}`,
    changeFrequency: "weekly",
    priority: route.priority,
  }));

  const propertyEntries: MetadataRoute.Sitemap = properties.map((property) => ({
    url: `${siteUrl}/biens/${property.slug}`,
    lastModified: property.created_at,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteUrl}/actualites/${article.slug}`,
    lastModified: article.published_at,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...propertyEntries, ...articleEntries];
}