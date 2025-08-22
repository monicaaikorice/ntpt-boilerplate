import { PrismicDocument, Slice } from '@prismicio/client';

/**
 *
 * @param doc = a document
 * @returns a summary (for things like blog posts, project updates, and Astra logs)
 */
export const getSummary = (doc: PrismicDocument): string => {
  // Prefer explicit summary if present
  if (doc?.data?.summary) return doc.data.summary;

  // Try to find text-like slice with a primary text field
  const slice = doc?.data?.slices?.find((slice: Slice) => {
    return (
      slice.slice_type === 'text_block' ||
      slice.primary?.text_content ||
      slice.primary?.text
    );
  });

  if (slice?.primary?.text_content) {
    return slice.primary.text_content;
  }

  if (slice?.primary?.text) {
    return slice.primary.text;
  }

  return '';
};
