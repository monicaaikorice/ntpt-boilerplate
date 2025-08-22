// app/providers.tsx
"use client";

import dynamic from "next/dynamic";

// Load it client-only (no SSR) to avoid draftMode errors
const PrismicPreview = dynamic(
  () => import("@prismicio/next").then((mod) => mod.PrismicPreview),
  { ssr: false }
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <PrismicPreview
        repositoryName={process.env.NEXT_PUBLIC_PRISMIC_REPO_NAME!}
      />
    </>
  );
}
