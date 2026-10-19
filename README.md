# hoangphucspa-web

Site công khai của HoangPhucSpa: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui (Radix, nền Neutral). Dữ liệu đọc từ API `hoangphucspa-backend`; app này không chạm database.

Giai đoạn hiện tại là skeleton chạy local: trang chủ chỉ hiển thị `API: <trạng thái>` lấy từ `/api/v1/health`.

## Yêu cầu

- Node 24 (`.nvmrc`): `source ~/.nvm/nvm.sh && nvm use 24`
- Backend chạy ở `http://localhost:5080` (xem README của `hoangphucspa-backend`)

## Lệnh thường dùng

```bash
npm install
cp .env.example .env.local      # rồi điền REVALIDATE_SECRET (trùng khoá Web:RevalidateSecret của backend)
npm run dev                     # http://localhost:3000
npm run lint
npm run typecheck               # chạy `next typegen` rồi `tsc --noEmit`
npm run test                    # Vitest (jsdom)
npm run build                   # không cần API chạy
npm run gen:api                 # sinh src/lib/api/schema.d.ts từ OpenAPI (cần API đang chạy)
```

`src/lib/api/schema.d.ts` là file sinh tự động, được giữ trong repo và bị ESLint bỏ qua. Chạy lại `npm run gen:api` mỗi khi API đổi hợp đồng.

## Biến môi trường

Xem `.env.example` (chỉ có tên biến, không có giá trị thật). `.env.local` không được commit.

| Biến | Ý nghĩa |
|---|---|
| `API_INTERNAL_URL` | Địa chỉ API cho Server Component |
| `API_ORIGIN` | Đích của rewrite `/api`, `/images`, `/media` khi chạy dev |
| `REVALIDATE_SECRET` | Secret của webhook `POST /internal/revalidate` (header `x-revalidate-secret`) |
| `SITE_URL` | Domain công khai, đọc lúc build (canonical, danh sách ảnh cho phép) |
| `GA_MEASUREMENT_ID` | GA4, tuỳ chọn, để trống ở local |
| `ALLOW_INDEXING` | Chỉ đặt `true` khi đã chọn domain chính thức; mặc định noindex và `robots.txt` chặn toàn bộ |

## Cấu trúc

- `src/app/layout.tsx`: `<html lang="vi">`, font, metadata gốc (noindex mặc định).
- `src/app/(public)/page.tsx`: trang chủ skeleton.
- `src/app/internal/revalidate/route.ts`: webhook xoá cache theo tag, sai secret trả 404.
- `src/lib/api/`: `server.ts` (`apiGet`), `tags.ts`, `schema.d.ts`.
- `src/lib/brand.ts`: tên thương hiệu mặc định trung lập; giá trị thật sẽ đến từ SiteSettings của API.
- `src/components/ui/`: component shadcn/ui.

## Theme

Màu và font thương hiệu chỉ nằm ở hai file: `src/styles/theme.css` và `src/app/fonts.ts`. Component không chứa mã màu hay tên font.

## Ghi chú

- `next.config.ts` không bật `cacheComponents` và `partialPrefetching` (template mới bật sẵn): trang dùng mô hình `fetch` có tag và `connection()` theo docs.
- Chưa dùng `@vitejs/plugin-react` trong Vitest vì xung đột peer dependency khi cài không `--force`; khi cần test component, cấu hình JSX đã có trong `vitest.config.mts`.
