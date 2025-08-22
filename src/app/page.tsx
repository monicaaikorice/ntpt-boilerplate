export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold tracking-tight">
        Hello, Universe!
      </h1>
      <p className="mt-2 text-muted-foreground">
        Next {process.env.npm_package_dependencies_next} + React + Prismic CMS + Tailwind v4
      </p>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border p-4">
          <h2 className="font-semibold">A11y-first</h2>
          <p className="text-sm">Semantic HTML, focus styles, reduced motion.</p>
        </div>
        <div className="rounded-2xl border p-4">
          <h2 className="font-semibold">DX</h2>
          <p className="text-sm">TypeScript, ESLint, Prettier, alias @/*.</p>
        </div>
      </section>
    </main>
  );
}
