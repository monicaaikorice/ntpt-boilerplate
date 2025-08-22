'use client';

import Link from 'next/link';

/**
 *
 * @returns rendered page data
 */
export default function NotFound() {
  return (
    <section className="relative min-h-[50vh] flex flex-col items-center justify-center px-4 text-center text-white">
      <h1
        className="z-10 mb-2 my-4 flex text-3xl font-bold md:my-12 lg:my-auto lg:text-5xl"
        aria-label="404 — Page Not Found"
      >
        404 — Page Not Found
      </h1>

      <p className="text-purple-50 z-10 mt-12 mb-6 w-4/5 text-xl lg:w-1/2 lg:text-3xl">
        The page you are looking for cannot be found.
      </p>

      <Link
        href="/"
        className="px-4 py-2 text-xl font-semibold text-white hover:underline"
      >
        Return Home
      </Link>
    </section>
  );
}
