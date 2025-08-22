import type { MetadataRoute } from "next"
import { createClient } from "@/prismicio"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  const client = createClient()

  // Fetch dynamic content
  const [posts, categories] = await Promise.all([
    client.getAllByType("blog_post"),
    client.getAllByType("category"),
  ])

  // Helper to turn Prismic date strings into Date objects
  const toDate = (d?: string | null) => (d ? new Date(d) : undefined)

  // Static routes you ship with this boilerplate
  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${base}/`, priority: 1.0 },
    { url: `${base}/blog`, priority: 0.7 },
  ]

  // Dynamic routes
  const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.uid}`,
    lastModified: toDate(p.last_publication_date),
    changeFrequency: "weekly",
    priority: 0.6,
  }))

  const categoryUrls: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/category/${c.uid}`,
    lastModified: toDate(c.last_publication_date),
    changeFrequency: "weekly",
    priority: 0.4,
  }))

  return [...staticUrls, ...postUrls, ...categoryUrls]
}
