import React from 'react'
import Link from 'next/link'
import { deslugify, sluggify } from '@/lib/utils/prismicHelpers'

interface CardProps {
  title: string
  summary: string
  href: string
  date?: string
  category?: string
  onCategoryPage?: boolean
}

export default function Card({
  title,
  summary,
  href,
  date,
  category,
  onCategoryPage = false,
}: CardProps) {
  const categoryName = category ? deslugify(category) : ''

  // Decide whether to show the tape label at all (avoid redundant links for WCAG)
  const showTapeLabel = !onCategoryPage && !!categoryName

  const slugBase = sluggify(title)
  const refId = `${slugBase}`

  return (
    <article
      role="article"
      aria-labelledby={`${refId}-title`}
      aria-describedby={`${refId}-summary`}
      className="z-10 mx-auto w-full max-w-xl rounded-sm overflow-hidden shadow-md shadow-white/50 h-[28rem]"
    >
      {/* TAPE BAR */}
      <div
        className="relative w-full h-[4rem] bg-purple-950"
      >
        {(date || (showTapeLabel && categoryName)) && (
          <div
            className="absolute top-2 left-2 text-lg px-2 py-1 rounded-sm"
          >
            {date && <time className="text-white" dateTime={date}>{date}</time>}
            {showTapeLabel && categoryName && (
              <>
                <span aria-hidden="true"> • </span>
                {href ? (
                  <Link
                    href={href}
                    className="hover:underline"
                    aria-label={`View more posts in ${categoryName}`}
                  >
                    {categoryName}
                  </Link>
                ) : (
                  <span>{categoryName}</span>
                )}
              </>
            )}
          </div>
        )}

        <h2
          id={`${refId}-title`}
          className="absolute bottom-2 left-2 right-2 font-mono text-xl font-semibold text-white px-3 py-1 rounded-sm"
        >
          <Link
            href={href}
            className="`font-medium text-[clamp(1.25rem,2vw,1.5rem)] hover:underline"
            aria-label={`Read more: ${title}`}
            aria-describedby={`${refId}-summary`}
          >
            {title}
          </Link>
        </h2>
      </div>

      {/* BOTTOM SECTION */}
      <div className="flex flex-1 flex-col justify-between p-6 bg-gray-900">
        <p
          id={`${refId}-summary`}
          className="text-[1.25rem] font-primary line-clamp-4"
        >
          {summary}
        </p>
      </div>
    </article>
  )
}
