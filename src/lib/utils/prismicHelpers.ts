// lib/utils/prismicHelpers.ts
// De-slug + slug helpers

/**
 * De-slugify strings for UI (breadcrumbs, labels, etc.)
 * - Handles common exceptions like "ai-and-llm" → "AI and LLM"
 */
export function deslugify(slug: string): string {
  if (!slug) return ''

  // Explicit exceptions (add more as needed)
  const EXCEPTIONS: Record<string, string> = {
    'ai-and-llm': 'AI and LLM',
  }
  const hit = EXCEPTIONS[slug]
  if (hit) return hit

  // Default: split on dashes, capitalize first letter of each word
  return slug
    .split('-')
    .map((word) =>
      word.length > 1
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word.toUpperCase(),
    )
    .join(' ')
}

/**
 * Slugify text for ARIA labels / URLs (basic)
 */
export function sluggify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove anything not alphanumeric, space, or dash
    .replace(/\s+/g, '-') // Replace whitespace with dash
    .replace(/-+/g, '-') // Collapse multiple dashes
    .replace(/^-+|-+$/g, '')
}
