// tailwind.config.mjs
import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    // Next.js App Router:
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",  // keep if you have /pages
    "./index.html",                      // keep if you ship any static HTML (Vite)
  ],
  darkMode: "class",
  theme: {
    extend: {
      /* Bridge CSS vars -> Tailwind colors so you can do bg-background, text-foreground */
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        // let your CSS var drive the stack, but keep Tailwind defaults as fallback
        sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
}

export default config
