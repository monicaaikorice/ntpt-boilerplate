import { getClient } from '@/lib/utils/getClient';
import { isFilled, FilledContentRelationshipField } from '@prismicio/client';
import { Content } from '@prismicio/client';
import { hasDocUID } from '@/lib/utils/typeGuards';

/**
 *
 * @returns the category uid and an array of post UIDs belonging to that category
 */
export const getAllCategoryUIDPairs = async (): Promise<
  {
    category: string;
    post: string;
  }[]
> => {
  const client = getClient();
  const posts =
    await client.getAllByType<Content.BlogPostDocument>('blog_post');

  return (
    posts
      .filter(
        (post): post is Content.BlogPostDocument =>
          isFilled.contentRelationship(post.data.category) && hasDocUID(post),
      )
      .map((post) => {
        const cat = post.data
          .category as FilledContentRelationshipField<'category'> & {
          uid: string;
        };

        return {
          category: cat.uid,
          post: post.uid,
        };
      }) ?? null
  );
};
