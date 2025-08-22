import { getClient } from './getClient'
import type { Client } from '@prismicio/client'
import { AllDocumentTypes } from '../../../prismicio-types'
import { DocumentTypeMap } from './prismicTypeMap'

/**
 * Strongly typed getAllByType for Prismic
 * @returns all documents with the given type
 */
export async function getAllByTypeTyped<K extends keyof DocumentTypeMap>(
  type: K,
  params?: Parameters<Client<AllDocumentTypes>['getAllByType']>[1],
): Promise<DocumentTypeMap[K][]> {
  const client: Client<AllDocumentTypes> = getClient()

  try {
    return (await client.getAllByType(type, params)) as DocumentTypeMap[K][];
  } catch (error) {
    throw new Error(
      `[getAllByTypeTyped] Error fetching type '${type}': ${(error as Error).message}`,
    )
  }
}
