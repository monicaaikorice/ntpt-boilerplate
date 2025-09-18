import { NextResponse } from 'next/server';
import { isFilled, Content } from '@prismicio/client';
import { getAllPosts } from '@/lib/blog/getAllPosts';
import { getAllCategories } from '@/lib/blog/getAllCategories';

// Type guards
function hasCategory(
  post: Content.BlogPostDocument | null | undefined,
): post is Content.BlogPostDocument & {
  data: { category: Content.CategoryDocument };
} {
  return Boolean(post && isFilled.contentRelationship(post.data.category));
}

export async function GET() {
  const staticUrls = [
    '/',
    '/blog'
  ];

  const blogPosts = (await getAllPosts()) ?? [];
  const categories = (await getAllCategories()) ?? [];

  const blogPostUrls = blogPosts
    .filter(hasCategory)
    .map((post) => `/blog/${post.data.category.uid}/${post.uid}`);

  const categoryUrls = categories.map((category) => `/blog/${category.uid}`);

  const allUrls = [
    ...staticUrls,
    ...blogPostUrls,
    ...categoryUrls,
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      (url) => `
    <url>
      <loc>https://maiko.dev${url}</loc>
    </url>`,
    )
    .join('')}
</urlset>`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
