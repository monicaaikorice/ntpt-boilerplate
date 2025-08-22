import { isFilled } from '@prismicio/client'
import { getAllPostsByCategoryUID } from '@/lib/blog/getAllPostsByCategoryUID'
import { getSummary } from '@/lib/utils/getSummary'
import Card from '@/components/Card'
import { getAllCategories } from '@/lib/blog/getAllCategories'
import { deslugify } from '@/lib/utils/prismicHelpers'
import { notFound } from 'next/navigation'

export const revalidate = 60

interface PageParams {
  category: string
}

/**
 * Renders all blog posts in a specific category
 * @param {{ params: { category: string } }} props - The route param for the category UID
 * @returns {Promise<PageParams>} Rendered category post list
 */

export default async function CategoryPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { category } = await params

  if (!category) {
    notFound()
  }

  const posts = await getAllPostsByCategoryUID(category)

  if (!posts || posts.length < 1) {
    notFound()
  }

  const categoryName = deslugify(category)

  return (
    <section className="prose prose-lg w-5/6 lg:w-3/4 mx-auto my-24">
      <h1
        id={`all-posts-in-${category}`}
        className="text-white font-bold text-2xl lg:text-3xl xl:text-5xl text-center"
      >
        All Blog Posts in {categoryName}
      </h1>

      <span className="sr-only">
        Showing all blog posts in {categoryName}
      </span>

      {posts && posts.length > 0 ? (
        <div
          className={`mx-auto ${
            posts.length > 1
              ? 'grid gap-12 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-10'
              : 'flex justify-center'
          } w-[85vw] mt-6 md:w-5/6 md:mt-12 xl:mt-20`}
          role="region"
          aria-labelledby={`all-posts-in-${category}`}
        >
          {posts.map((post) => {
            const categoryUID = isFilled.contentRelationship(post.data.category)
              ? post.data.category.uid
              : 'uncategorized'

            return (
              <Card
                key={post.uid}
                title={`${post.data.title}`}
                summary={getSummary(post)}
                href={`/blog/${categoryUID}/${post.uid}`}
                date={post.last_publication_date?.slice(0, 10)}
                category={`${categoryUID}`}
                onCategoryPage
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

/**
 *
 * @returns params for fetching all blog posts associated with a specific category UID
 */
export async function generateStaticParams(): Promise<{ category: string }[]> {
  const categories = await getAllCategories()
  return (categories ?? []).map((cat) => ({
    category: cat.uid,
  }))
}
