import { DEFAULT_SITE_NAME } from '@/lib/brand';

export function Footer({ siteName = DEFAULT_SITE_NAME }: { siteName?: string }) {
  return (
    <footer className="border-t bg-muted/40 py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
