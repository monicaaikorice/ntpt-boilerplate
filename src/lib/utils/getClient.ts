// lib/utils/getClient.ts
// Prismic client wrapper

import * as prismic from '@prismicio/client'

/**
 * @returns the Prismic client, can handle filters, orderings
 */
export const getClient = () => {
  const repoName = 'ntpt-boilerplate' // ← replace with your actual Prismic repo name
  const endpoint = prismic.getRepositoryEndpoint(repoName)

  const client = prismic.createClient(endpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN, // stored in your .env file
  })

  return client
}
