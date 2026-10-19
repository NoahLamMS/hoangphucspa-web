import type { MetadataRoute } from "next";
import { connection } from "next/server";

export default async function robots(): Promise<MetadataRoute.Robots> {
  await connection();
  // Staging, dev, clone chưa công bố: chặn crawler. Sitemap thêm sau (chưa có sitemap.ts).
  if (process.env.ALLOW_INDEXING !== "true") return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/", "/internal/", "/search"] },
  };
}
