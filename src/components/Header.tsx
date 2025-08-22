'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header
      className="top-0 w-full z-50"
      role="banner"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-white dark:bg-black text-black dark:text-white px-4 py-2 rounded shadow-lg"
      >
        Skip to content
      </a>
      <nav role="navigation">
        <div className="flex flex-wrap items-center justify-between overflow-hidden p-6">
          <div className="flex flex-row items-center my-auto text-xl lg:text-2xl xl:text-3xl font-bold">
            <Link
              href="/"
              aria-label="Homepage"
              className="flex items-center whitespace-nowrap mx-4 text-teal-300 hover:underline"
            >
              Home
            </Link>
            <span aria-hidden="true"> | </span>
            <Link
              href="/blog"
              aria-label="Blog"
              className="flex items-center whitespace-nowrap mx-4 text-amber-300 hover:underline"
            >
              Blog Demo
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
