import { getClient } from '../utils/getClient'
import { Content } from '@prismicio/client'

/**
 *
 * @returns the latest blog post
 */
export const getLatestPost =
  async (): Promise<Content.BlogPostDocument | null> => {
    const client = getClient()

    return (
      (await client.getFirst<Content.BlogPostDocument>({
        orderings: {
          field: 'my.blog_post.date',
          direction: 'desc',
        },
      })) ?? null
    )
  }
