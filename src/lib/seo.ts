import type { Metadata } from 'next';
import { DEFAULT_SITE_NAME } from '@/lib/brand';
import type { SeoData } from './types';

export function constructMetadata(seo?: SeoData | null): Metadata {
  const title = seo?.title ?? DEFAULT_SITE_NAME;
  const description = seo?.description ?? undefined;

  return {
    title,
    description,
    keywords: seo?.keywords ?? undefined,
    openGraph: {
      title,
      description,
      images: seo?.thumbnailUrl ? [{ url: seo.thumbnailUrl }] : undefined,
    },
  };
}
