import type { MetadataRoute } from 'next';
import { connection } from 'next/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const site = process.env.SITE_URL ?? 'http://localhost:3000';

  return [
    {
      url: site,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${site}/gioi-thieu`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${site}/dich-vu`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${site}/tin-tuc`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${site}/bang-gia`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
