import Link from 'next/link';
import { DEFAULT_SITE_NAME } from '@/lib/brand';

export function Header({ siteName = DEFAULT_SITE_NAME }: { siteName?: string }) {
  return (
    <header className="border-b bg-background sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-heading text-lg font-bold">
          {siteName}
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <Link href="/gioi-thieu" className="hover:text-primary transition-colors">Giới thiệu</Link>
          <Link href="/dich-vu" className="hover:text-primary transition-colors">Dịch vụ</Link>
          <Link href="/tin-tuc" className="hover:text-primary transition-colors">Tin tức</Link>
          <Link href="/bang-gia" className="hover:text-primary transition-colors">Bảng giá</Link>
        </nav>
      </div>
    </header>
  );
}
