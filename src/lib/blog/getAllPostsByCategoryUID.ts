import { getClient } from '@/lib/utils/getClient'
import { isFilled } from '@prismicio/client'
import { Content } from '@prismicio/client'

/**
 * @returns all blog posts associated with a given category UID.
 */
export const getAllPostsByCategoryUID = async (
  uid: string,
): Promise<Content.BlogPostDocument[] | null> => {
  const client = getClient()

  const posts = await client.getAllByType('blog_post', {
    orderings: {
      field: 'my.blog_post.date',
      direction: 'desc',
    },
  })

  return (
    posts.filter(
      (doc): doc is Content.BlogPostDocument =>
        isFilled.contentRelationship(doc.data.category) &&
        doc.data.category.uid === uid,
    ) ?? []
  )
}
