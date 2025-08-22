import type {
  ContentRelationshipField,
  FilledContentRelationshipField,
} from '@prismicio/client';

/**
 * Type guard to check if a Prismic Content Relationship field has a UID.
 *
 * @param rel = A content relationship field (e.g., category, author)
 * @returns true if the field has a filled UID
 */
export function hasUID<Type extends string>(
  rel: ContentRelationshipField<Type> | null | undefined,
): rel is FilledContentRelationshipField<Type> & { uid: string } {
  return (
    !!rel &&
    typeof rel === 'object' &&
    'uid' in rel &&
    typeof rel.uid === 'string'
  );
}

/**
 *
 * @param doc = a document
 * @returns true if the constant has a document UID
 */
export function hasDocUID<T extends { uid?: string }>(
  doc: T,
): doc is T & { uid: string } {
  return typeof doc.uid === 'string';
}
