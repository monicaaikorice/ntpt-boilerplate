// src/prismicio.ts
import {
  createClient as baseCreateClient,
  type ClientConfig,
  type Route,
} from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'
import sm from '../slicemachine.config.json'

/** Your repository name (NEXT_PUBLIC_PRISMIC_ENVIRONMENT can override if you use environments) */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName

/** Define where each Prismic type should resolve (used for previews + doc.url) */
const routes: Route[] = [
  // Uncomment/edit to match your types. Safe to leave empty if you haven't created them yet.
  // { type: "home", path: "/" },
  { type: 'home', path: '/' },
  { type: 'post', path: '/blog/:uid' },
]

/** Create the Prismic client with sensible Next.js caching + previews */
export const createClient = (config: ClientConfig = {}) => {
  const client = baseCreateClient(repositoryName, {
    routes,
    // Add token if your repo is private keep undefined if public
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    fetchOptions:
      process.env.NODE_ENV === 'production'
        ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
        : { next: { revalidate: 5 } },
    ...config,
  })

  // Enables Prismic Preview with Next.js Draft Mode
  enableAutoPreviews({ client })

  return client
}
