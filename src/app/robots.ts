import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    // Optional: set your canonical host for clarity
    host: base,
    sitemap: `${base}/sitemap.xml`,
  }
}
