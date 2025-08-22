// slices/TextBlock/index.tsx
import {
  PrismicRichText,
  type SliceComponentProps,
  type JSXMapSerializer,
} from '@prismicio/react';
import type { Slice, RichTextField } from '@prismicio/client';

type TextBlockSlice = Slice<
  'text_block',
  { text_content: RichTextField }, // 👈 field name matches your model
  never
>;

const rt: JSXMapSerializer = {
  heading2: ({ children }) => (
    <h2 className="mt-6 text-2xl font-semibold text-cyan-300">{children}</h2>
  ),
  heading3: ({ children }) => (
    <h3 className="mt-6 text-xl font-semibold text-lime-300">{children}</h3>
  ),
  paragraph: ({ children }) => (
    <p className="mt-4 leading-10 text-white text-[1.5rem]">{children}</p>
  ),
  // ...your other mappings
};

export default function TextBlock({
  slice,
}: SliceComponentProps<TextBlockSlice>) {
  return <PrismicRichText field={slice.primary.text_content} components={rt} />;
}
