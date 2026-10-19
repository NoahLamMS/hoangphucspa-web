import type { ReactNode } from 'react';
import { PublicShell } from '@/components/layout/public-shell';
import { DEFAULT_SITE_NAME } from '@/lib/brand';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <PublicShell siteName={DEFAULT_SITE_NAME}>{children}</PublicShell>;
}
