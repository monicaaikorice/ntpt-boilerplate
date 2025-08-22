import { Content, filter } from '@prismicio/client';
import { getAllByTypeTyped } from '../utils/getAllByTypeTyped';

/**
 *
 * @returns all blog posts
 */
export const getAllPosts = async (): Promise<
  Content.BlogPostDocument[] | null
> => {
  return (
    (await getAllByTypeTyped('blog_post', {
      orderings: {
        field: 'my.blog_post.date',
        direction: 'desc',
      },
      fetchLinks: ['category.uid'],
    })) ?? []
  );
};

/**
 *
 * @param category = category UID
 * @returns all blog posts associated with a specific category
 */
export const getAllPostsByCategory = async (
  category: Content.CategoryDocument,
): Promise<Content.BlogPostDocument[]> => {
  return (
    getAllByTypeTyped('blog_post', {
      filters: [filter.at('my.blog_post.category', category.id)],
    }) ?? []
  );
};
