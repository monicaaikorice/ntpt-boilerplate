import * as React from 'react'
import Link from 'next/link'

type CardProps = {
  title: string
  summary: string
  href: string
  date?: string
  category?: string // plain string from Prismic custom type
  onCategoryPage?: boolean // true when you're already on that category's page
}

export default function Card({
  title,
  summary,
  href,
  date,
  category,
  onCategoryPage = false,
}: CardProps) {
  const uid = React.useId()

  // Only show category if we're NOT on its page
  const showCategory = !!category && !onCategoryPage

  const parsedDate = date ? new Date(date) : null
  const prettyDate =
    parsedDate && !isNaN(parsedDate.getTime())
      ? parsedDate.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : date

  return (
    <article
      aria-labelledby={`${uid}-title`}
      aria-describedby={`${uid}-summary`}
      className="border border-gray-200 border-dotted rounded-md p-6"
    >
      <h2 id={`${uid}-title`} className="text-lg font-semibold text-sky-300">
        <Link href={href} className="hover:underline">
          {title}
        </Link>
      </h2>

      {(prettyDate || showCategory) && (
        <div className="mt-1 text-sm text-gray-50">
          {prettyDate && (
            <time dateTime={parsedDate ? parsedDate.toISOString() : date}>
              {prettyDate}
            </time>
          )}
          {prettyDate && showCategory && <span aria-hidden="true"> • </span>}
          {showCategory && (
            <Link
              href={`/blog/${category}`}
              className="hover:underline capitalize"
              aria-label={`View more posts in ${category}`}
            >
              {category}
            </Link>
          )}
        </div>
      )}

      <p id={`${uid}-summary`} className="mt-2 text-sm text-lime-300">
        {summary}
      </p>
    </article>
  )
}
