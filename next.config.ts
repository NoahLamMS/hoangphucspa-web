import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const apiOrigin = process.env.API_ORIGIN ?? "http://localhost:5080";
// Đọc lúc BUILD: đổi domain thì phải build lại image web. Không hard-code domain trong file này.
const site = new URL(process.env.SITE_URL ?? "http://localhost:3000");

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  images: {
    remotePatterns: [
      new URL(`${site.origin}/images/**`), // ảnh upload của chính domain này
      new URL(`${site.origin}/media/**`),
      ...(isDev ? [new URL("http://localhost:5080/**")] : []),
    ],
    dangerouslyAllowLocalIP: isDev, // Next.js 16 chặn tải ảnh từ IP nội bộ; chỉ mở ở máy dev
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    // Chỉ có tác dụng ở dev. Production: reverse proxy chuyển /api, /images, /media trước khi tới Next.js.
    return [
      { source: "/api/:path*", destination: `${apiOrigin}/api/:path*` },
      { source: "/images/:path*", destination: `${apiOrigin}/images/:path*` },
      { source: "/media/:path*", destination: `${apiOrigin}/media/:path*` },
    ];
  },
  logging: { fetches: { fullUrl: isDev } }, // in HIT/MISS của Data Cache ra terminal khi dev
  // Tailwind v4 qua loader Turbopack do create-next-app sinh ra.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
