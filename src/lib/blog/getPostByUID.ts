import { getClient } from '@/lib/utils/getClient';
import { Content } from '@prismicio/client';

/**
 *
 * @param uid the blog post's UID
 * @returns the post with associated UID
 */
export const getPostByUID = async (
  uid: string,
): Promise<Content.BlogPostDocument | null> => {
  const client = getClient();
  const post = await client.getByUID<Content.BlogPostDocument>(
    'blog_post',
    uid,
    {
      fetchLinks: ['category.uid'],
    },
  );
  return post ?? null;
};
