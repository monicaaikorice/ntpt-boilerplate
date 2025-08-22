import * as prismic from '@prismicio/client';
import { DocumentTypeMap } from '@/lib/utils/prismicTypeMap';

/**
 *
 * @param client = Prismic client
 * @param type = document type
 * @param params = any filters or orderings
 * @returns a document of the single type
 */
export async function getSingleTyped<K extends keyof DocumentTypeMap>(
  client: prismic.Client<DocumentTypeMap[keyof DocumentTypeMap]>,
  type: K,
  params?: prismic.BuildQueryURLArgs,
): Promise<DocumentTypeMap[K]> {
  return client.getSingle(type, params) as Promise<DocumentTypeMap[K]>;
}
