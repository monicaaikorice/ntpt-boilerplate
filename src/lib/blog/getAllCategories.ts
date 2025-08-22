import { Content } from '@prismicio/client';
import { getAllByTypeTyped } from '../utils/getAllByTypeTyped';

/**
 *
 * @returns all categories
 */
export const getAllCategories = async (): Promise<
  Content.CategoryDocument[] | null
> => {
  return (await getAllByTypeTyped('category')) ?? [];
};
