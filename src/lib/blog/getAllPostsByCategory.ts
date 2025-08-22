import { getClient } from '@/lib/utils/getClient'
import { Content } from '@prismicio/client'
import { hasUID } from '@/lib/utils/typeGuards'

export async function getAllPostsByCategory(categoryUID: string) {
  const client = getClient()

  const posts = await client.getAllByType<Content.BlogPostDocument>(
    'blog_post',
    {
      fetchLinks: ['category.uid'],
      orderings: {
        field: 'my.blog_post.date',
        direction: 'desc',
      },
    },
  )

  return (
    posts.filter(
      (
        post,
      ): post is Content.BlogPostDocument & {
        data: { category: { uid: string } }
      } => hasUID(post.data.category) && post.data.category.uid === categoryUID,
    ) ?? []
  )
}
