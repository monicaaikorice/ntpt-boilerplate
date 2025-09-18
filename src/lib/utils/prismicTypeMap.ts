// lib/utils/prismicTypeMap.ts
// Map for all Prismic document types

import { Content } from '@prismicio/client'

export type DocumentTypeMap = {
  home: Content.HomeDocument
  blog_post: Content.BlogPostDocument
  category: Content.CategoryDocument
}
