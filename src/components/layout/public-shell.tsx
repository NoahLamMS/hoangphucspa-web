import type { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { DEFAULT_SITE_NAME } from '@/lib/brand';

export function PublicShell({ children, siteName = DEFAULT_SITE_NAME }: { children: ReactNode; siteName?: string }) {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:p-2 focus:bg-background focus:border"
      >
        Bỏ qua tới nội dung
      </a>
      <Header siteName={siteName} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer siteName={siteName} />
    </div>
  );
}
