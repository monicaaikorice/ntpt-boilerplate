// lib/linkResolver.ts
import type { LinkResolverFunction } from "@prismicio/client";

export const linkResolver: LinkResolverFunction = (doc) => {
  switch (doc.type) {
    case "homepage":
      return "/";
    case "page":
      return `/${doc.uid}`;
    case "blog_post":
      return `/blog/${doc.uid}`;
    case "category":
      return `/category/${doc.uid}`;
    default:
      return "/";
  }
};
