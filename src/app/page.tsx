import { getHomePageData } from '@/lib/pages/getHomePageData'
import { components } from '@/slices'
import { SliceZone } from '@prismicio/react'
import { notFound } from 'next/navigation'

export const revalidate = 60

/**
 * Renders home page data
 * @returns rendered page
 */
export default async function HomePage() {
  const homepage = await getHomePageData()

  if (!homepage) {
    notFound()
  }

  return (
    <section className="prose prose-lg w-5/6 lg:w-3/4 mx-auto my-24">
      <h1
        id="page-heading"
        className="text-white font-bold text-2xl lg:text-3xl xl:text-5xl text-center"
      >
        {homepage.data.heading}
      </h1>
      <h2 className="text-gray-50 text-xl lg:text-2xl xl:text-3xl text-center mt-20">
        {homepage.data.subheading}
      </h2>

      <div className="flex flex-col lg:flex-row w-3/4 mx-auto mt-20">
        <div className="w-1/2 border border-gray-200 border-dotted mx-5 rounded-md p-6">
          <h3>A11y-first</h3>
          <p>Semantic HTML, focus styles, reduced motion.</p>
        </div>
        <div className="w-1/2 border border-gray-200 border-dotted mx-5 rounded-md p-6">
          <h3>DX</h3>
          TypeScript, ESLint, Prettier, alias @/*.
        </div>
      </div>
      <article className="prose prose-invert max-w-none text-soft">
        <SliceZone slices={homepage.data.slices} components={components} />
      </article>
    </section>
  )
}
