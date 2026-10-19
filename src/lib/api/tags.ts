// Trùng với CacheTags ở backend (docs 07 §5)
export const TAGS = {
  site: "site",
  home: "home",
  services: "services",
  pages: "pages",
  posts: "posts",
  testimonials: "testimonials",
  faqs: "faqs",
  sitemap: "sitemap",
} as const;

export type CacheTag = (typeof TAGS)[keyof typeof TAGS];
