'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-xl font-semibold mb-2">Đã có lỗi nghiêm trọng</h2>
        <button
          type="button"
          onClick={() => reset()}
          className="px-4 py-2 text-sm bg-black text-white rounded-md"
        >
          Tải lại
        </button>
      </body>
    </html>
  );
}
