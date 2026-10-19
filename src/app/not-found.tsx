import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <h2 className="text-2xl font-bold mb-2">404 - Không tìm thấy trang</h2>
      <p className="text-sm text-muted-foreground mb-6">Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.</p>
      <Link href="/" className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:opacity-90">
        Về trang chủ
      </Link>
    </div>
  );
}
