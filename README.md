# NTPT Boilerplate

A minimal, a11y-first starter using **Next.js (App Router) + TypeScript + Prismic + Tailwind CSS**. Includes a blog, projects, categories, and a contact page, with solid SEO defaults and production-friendly structure.

> Demo: https://ntptboilerplatedemo.netlify.app

---

## Features

- **App Router** with SSR/SSG and file-based routing
- **Prismic** integration with SliceZone-ready pages
- **Content types** wired up: `blog_post`, `category`
- **Pages included**
  - `/blog` (index with pagination)
  - `/blog/[uid]` (post detail)
  - `/blog/[category]/[uid]` (taxonomy → filtered posts)
  - `app/not-found.tsx` (404)
- **SEO**: dynamic metadata, `app/sitemap.ts`, `app/robots.ts`
- **A11y**: semantic landmarks, strong focus-visible styles, minimal duplicate links, keyboard-friendly components
- **Styling**: Tailwind (utility-first) + CSS variables ready for theming

---

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **CMS:** Prismic
- **Styling:** Tailwind CSS
- **Deploy:** Netlify or Vercel (both supported)

---

## Getting Started

### 1) Prerequisites

- Node.js **18+** (or the current LTS)
- Package manager: `pnpm` (recommended) or `npm`/`yarn`

### 2) Install

```bash
pnpm i
# or
npm i
```

### 3) Environment

Create `.env.local` with the following (adjust to your setup):

```env
# Public site URL for sitemap/canonicals
NEXT_PUBLIC_SITE_URL=https://yourdomain.tld

# Prismic (pick the vars your prismicio client uses)
PRISMIC_ENDPOINT=https://your-repo-name.cdn.prismic.io/api/v2
# Optional if your repo/content is private
PRISMIC_ACCESS_TOKEN=
```

> Note: If you used `@prismicio/next` project generator, your `prismicio.ts` may encode the repository name. Update either that file **or** the env values above to match your repo.

### 4) Develop

```bash
pnpm dev
```

Visit http://localhost:3000

### 5) Typecheck, Lint, Build

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Or run them all:

```bash
pnpm check
```

---

## Content Model (Prismic)

### `blog_post`

- `title` (Key Text)
- `summary` (Rich Text or Key Text)
- `date` (Date)
- `category` (Content Relationship → `category`)
- `slices` (various)

### `category`

- `name` (Key Text)

> Category routes filter posts by the `category` relationship post detail pages render slices via `SliceZone`.

---

## Routes & Files

```
app/
  (site)/
    blog/
      page.tsx            # Blog index (+pagination via searchParams)
      [uid]/page.tsx      # Blog post detail (slices, metadata)
      [category]/[uid]/page.tsx
  not-found.tsx
  robots.ts
  sitemap.ts

src/
  slices/                 # Slice components map (exported as `components`)
  components/Card.tsx     # Reusable card component
  components/Header.tsx   # Header component (place in app/layout.tsx)
  lib/                    # Utils (e.g., prismic helpers, formatting)
  prismicio.ts            # Prismic client (createClient)
```

---

## Accessibility Notes

- **Landmarks:** `<main>` located in `app/layout.tsx`; headings are hierarchical.
- **Focus styles:** Uses `:focus-visible` rings on interactive elements.
- **Link purpose:** Avoids redundant multi-CTA links per card
- **Tap targets:** Aim for `44px` minimum height/width on interactive controls.
- **Color/contrast:** Tailwind palette + variables; verify with Axe/Lighthouse.
- **Motion:** Consider honoring `prefers-reduced-motion` for future animations.

---

## SEO

- `app/sitemap.ts` collects static and dynamic routes (posts/projects) with `lastModified`
- `app/robots.ts` references `NEXT_PUBLIC_SITE_URL`
- `app/layout.tsx` contains global metadata. For best SEO performance, consider setting metadata for each page.

---

## Deployment

### Netlify

- **Build command:** `pnpm build`
- **Publish directory:** `.next`
- Add environment variables (`NEXT_PUBLIC_SITE_URL`, Prismic keys)
- Netlify automatically detects Next.js; enable the Next Runtime if prompted

### Vercel

- Import the repo → Framework: Next.js
- Set env vars; defaults usually Just Work™

---

## NPM Scripts

```json
{
  "scripts": {
    "slicemachine": "start-slicemachine",
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "typecheck": "tsc --noEmit",
    "check": "pnpm typecheck && pnpm lint && pnpm build",
    "lint": "eslint"
  }
}
```

---

## Considerations (optional)

- 🔎 Search across posts
- 🧭 Breadcrumbs component (`aria-current="page"` on last item)
- 📰 RSS feed for blog
- 🧪 CI (GitHub Actions): run `pnpm check` on PRs
- 🎨 Theming toggles (light/dark/high-contrast/Astra mode)

---

## Contributing

PRs/issues welcome for improvements and a11y fixes. Please run `pnpm check` before submitting.

---

## License

MIT © 2025 Monica Rice
