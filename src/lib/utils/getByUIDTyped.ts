import * as prismic from '@prismicio/client';
import { DocumentTypeMap } from './prismicTypeMap';

/**
 *
 * @param client = Prismic client
 * @param type = Document type
 * @param uid = Document UID
 * @param params = Filters and orderings
 * @returns document by its associated UID
 */
export async function getByUIDTyped<K extends keyof DocumentTypeMap>(
  client: prismic.Client<DocumentTypeMap[keyof DocumentTypeMap]>,
  type: K,
  uid: string,
  params?: prismic.BuildQueryURLArgs,
): Promise<DocumentTypeMap[K]> {
  return client.getByUID(type, uid, params) as Promise<DocumentTypeMap[K]>;
}
