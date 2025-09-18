import { getSummary } from '@/lib/utils/getSummary'
import { isFilled } from '@prismicio/client'
import Card from '@/components/Card'
import { JSX } from 'react'
import { getAllPosts } from '@/lib/blog/getAllPosts'

export const revalidate = 60

/**
 * renders all blog posts
 * @returns rendered blog index page
 */

export default async function BlogIndexPage(): Promise<JSX.Element> {
  const allPosts = await getAllPosts()

  return (
    <section className="prose prose-lg w-5/6 lg:w-3/4 mx-auto my-24">
      <h1
        id="all-blog-posts"
        className="text-white font-bold text-2xl lg:text-3xl xl:text-5xl text-center"
      >
        All Blog Posts
      </h1>

      <span className="sr-only">
        Showing all blog posts
      </span>

      {allPosts && allPosts?.length ? (
        <div
          className={`mx-auto ${
            allPosts && allPosts.length > 1
              ? 'grid gap-12 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-10'
              : 'flex justify-center'
          } w-[85vw] mt-6 md:w-5/6 md:mt-12 xl:mt-20`}
          role="region"
          aria-labelledby="all-blog-posts"
        >
          {allPosts.map((post) => {
            const categoryUID = isFilled.contentRelationship(post.data.category)
              ? post.data.category.uid
              : 'uncategorized'

            return (
              <Card
                key={post.uid}
                title={`${post.data.title}`}
                summary={getSummary(post)}
                href={`/blog/${categoryUID}/${post.uid}`}
                date={post.first_publication_date?.slice(0, 10)}
                category={categoryUID}
              />
            )
          })}
        </div>
      ) : (
        <h2 className="text-2xl text-white">No posts to show.</h2>
      )}
    </section>
  )
}
