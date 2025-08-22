import { notFound } from 'next/navigation'
import { SliceZone } from '@prismicio/react'
import { hasUID } from '@/lib/utils/typeGuards'
import { components } from '@/slices'
import { getPostByUID } from '@/lib/blog/getPostByUID'
import { getAllPosts } from '@/lib/blog/getAllPosts'
import { Content, isFilled } from '@prismicio/client'
import { deslugify, slugify } from '@/lib/utils/prismicHelpers'
import Link from 'next/link'

export const revalidate = 60

interface PageParams {
  category: string
  uid: string
}

/**
 * Renders a single blog post
 * @param {{ params: { category: string, uid: string } }} props - The route params for the category and post UIDs
 * @returns {Promise<PageParams>} Rendered post
 */

export default async function BlogPostPage({ params }: { params: Promise<PageParams> }) {
  const { category, uid } = await params

  const shownPost = await getPostByUID(uid)

  const categoryName = deslugify(category)

  if (
    !shownPost ||
    !hasUID(shownPost.data.category) ||
    shownPost.data.category.uid !== category
  ) {
    notFound()
  }

  const allPosts = await getAllPosts()
  const currentIndex =
    allPosts && allPosts.length > 0
      ? allPosts.findIndex((u: Content.BlogPostDocument) => u.uid === shownPost.uid)
      : -1

  const prevPost = allPosts && currentIndex > 0 ? allPosts[currentIndex - 1] : null

  const nextPost =
    allPosts && currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : null

  const prevCat =
    prevPost && hasUID(prevPost.data.category) ? prevPost.data.category.uid : null
  const nextCat =
    nextPost && hasUID(nextPost.data.category) ? nextPost.data.category.uid : null

  const postTitleID = slugify(shownPost.data.title as string)

  return (
    <section className="prose prose-lg w-5/6 lg:w-3/4 mx-auto my-24">
      <h1
        id={postTitleID}
        className="text-white font-bold text-2xl lg:text-3xl xl:text-5xl text-center"
      >
        {shownPost.data.title}
      </h1>
      <h2
        className="text-fuchsia-200 text-xl lg:text-2xl text-center mt-10"
      >
        {shownPost.data.date} in <span className="text-sky-300">{categoryName}</span>
      </h2>

      <div className="w-full mx-auto mt-12 md:w-5/6 p-8 xl:w-2/3 border border-gray-200 border-dotted rounded-md">
        <article aria-labelledby={postTitleID}>
          <SliceZone slices={shownPost.data.slices} components={components} />
        </article>
      </div>
      <div className="flex flex-row justify-between mt-10">
        <div className="md:w-1/4 lg:w-1/5 xl:w-1/3">
          {prevPost ? (
            <Link
              href={`/blog/${prevCat}/${prevPost}`}
              aria-label={`Previous: ${deslugify(prevPost.uid)}`}
              className="hover:underline text-lime-300"
            >
              ← <span>Previous</span>
            </Link>
          ) : (
            <span className="sr-only ">No previous posts</span>
          )}
        </div>
        <div className="hidden lg:block md:w-1/2 mx-auto text-center">
          <Link
            href={`/blog/${category}`}
            aria-label={`back to all posts in ${categoryName}`}
            className="hover:underline capitalize text-lime-300"
          >
            {categoryName} Blog Posts
          </Link>
        </div>
        <div className="md:w-1/4 lg:w-1/5 xl:w-1/3 text-right">
          {nextPost ? (
            <Link
              href={`/blog/${nextCat}/${nextPost}`}
              aria-label={`Next: ${deslugify(nextPost.uid)}`}
              className="hover:underline text-lime-300"
            >
              <span>Next</span> →
            </Link>
          ) : (
            <span className="sr-only">No more posts</span>
          )}
        </div>
      </div>
      <div className="mt-4 md:-mt-7 text-center lg:hidden">
        <Link
          href={`/blog/${category}`}
          aria-hidden="true"
          tabIndex={-1}
          className="hover:underline text-lime-300"
        >
          Back to {categoryName}
        </Link>
      </div>
    </section>
  )
}

/**
 *
 * @returns params for fetching a single blog post
 */
export async function generateStaticParams(): Promise<
  {
    category: string
    uid: string
  }[]
> {
  const posts = await getAllPosts()

  const validPosts = (posts ?? []).filter(
    (
      post,
    ): post is typeof post & {
      data: { category: { uid: string } }
    } => post.uid !== undefined && isFilled.contentRelationship(post.data.category),
  )

  return validPosts.map((post) => ({
    category: post.data.category.uid,
    uid: post.uid,
  }))
}
