'use client';

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <h2 className="text-xl font-semibold mb-2">Đã có lỗi xảy ra</h2>
      <p className="text-sm text-muted-foreground mb-4">{error.message || 'Không thể tải nội dung trang này.'}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:opacity-90"
      >
        Thử lại
      </button>
    </div>
  );
}
