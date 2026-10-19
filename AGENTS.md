# hoangphucspa-web — Agent Guide (Quy tắc phát triển toàn diện)

Repo: `hoangphucspa-web` (Website công khai cho khách hàng).
Stack: **Next.js 16 (App Router)** · **React 19** · **Tailwind CSS 4** · **shadcn/ui (Radix UI)** · **TypeScript**.
Cổng dev: 3000.

---

## I. NGUYÊN TẮC LÀM VIỆC CỐT LÕI (BẮT BUỘC VỚI MỌI AGENT)

1. **Tuyệt đối KHÔNG tự ý chạy lệnh Git:** Cấm chạy `git commit`, `git push`, `git checkout`, `git reset`. Người dùng tự thực hiện mọi thao tác Git. Hoàn thành việc chỉ đưa ra **Gợi ý lệnh commit**.
2. **Verify trước khi bàn giao:** Mọi thay đổi bắt buộc phải pass bộ kiểm tra:
   ```bash
   npm run lint && npm run typecheck && npm run test && npm run build
   ```
3. **Phạm vi thay đổi (Change Scope):**
   - Thay đổi đúng trọng tâm, tối thiểu số dòng code cần thiết. Không tiện tay refactor, đổi tên, format code ngoài vùng yêu cầu.
   - Thấy lỗi khác ngoài yêu cầu: Báo lại cho người dùng, không tự ý sửa kèm.
   - Xóa code: Chỉ xóa khi tìm kiếm toàn dự án (`rg`) xác nhận có 0 tham chiếu.
4. **Không hard-code thương hiệu:**
   - Đọc thông tin từ `GET /site` qua hàm `apiGet()`.
   - Màu sắc và font chỉ định nghĩa duy nhất tại `src/styles/theme.css` và `src/app/fonts.ts`. **CẤM VIẾT MÃ MÀU HEX TRẦN TRONG COMPONENT**.
5. **Bảo mật:** Không đặt secret trong mã nguồn. `REVALIDATE_SECRET` chỉ đặt trong `.env.local`.

---

## II. RANH GIỚI THƯ MỤC & IMPORT (IMPORT BOUNDARIES)

1. **Chiều phụ thuộc:** `app → components → lib`.
   - `lib` là tầng hạ tầng, không import ngược lên `components` hay `app`.
   - `components/ui` là component nguyên tử (shadcn), không import logic từ các component tính năng khác.
2. **Quy tắc Alias:**
   - Luôn sử dụng alias `@/` cho mọi import ngoài thư mục hiện tại (`@/components`, `@/lib`, `@/styles`).

---

## III. NEXT.JS 16 APP ROUTER & RENDERING RULES

1. **Mặc định là Server Component:**
   - Mọi trang (`page.tsx`) và layout (`layout.tsx`) mặc định là Server Component để tối ưu SEO và tốc độ tải trang ban đầu.
   - **Client Component:** Chỉ gắn directive `'use client'` khi bắt buộc có tương tác client (state `useState`, `useEffect`, event listener, dialog open/close, carousel auto-play, scroll listener).
2. **Lấy dữ liệu (Data Fetching):**
   - Chỉ dùng hàm `apiGet<T>()` từ `@/lib/api/server.ts` (được bảo vệ bởi `import 'server-only'`).
   - Cấm import Axios hoặc dùng `fetch()` tự do trong Server Component.
   - Gắn thẻ cache tag từ `@/lib/api/tags.ts` (`TAGS.services`, `TAGS.posts`, `TAGS.home`, `TAGS.site`, `TAGS.sitemap`) để API backend có thể gọi webhook `/internal/revalidate` làm tươi cache tức thì khi CMS sửa đổi.
3. **Async Metadata & SEO:**
   - Tiêu đề trang, OpenGraph, canonical URL lấy qua hàm `generateMetadata()`.
   - Luôn gọi `await connection()` trong `generateMetadata()` và layout để đọc biến môi trường tại thời điểm runtime, tránh bị đóng băng dữ liệu lúc build.
   - Mặc định toàn site là `noindex, nofollow` cho đến khi biến môi trường `ALLOW_INDEXING="true"` được bật chính thức.
4. **Xử lý Hình ảnh (`next/image`):**
   - Mọi hình ảnh phải dùng thẻ `<Image />` từ `next/image` (ngoại trừ icon SVG nội tuyến).
   - Bắt buộc có thuộc tính `alt` mô tả nội dung ảnh (hoặc lấy từ `altText` / tên bài viết), không để trống.
   - Ảnh banner / LCP: Đặt `priority` hoặc `loading="eager"` để tăng tốc độ hiển thị.

---

## IV. UI, STYLING & COMPONENT RULES

1. **Thứ tự chọn component:**
   - Component dùng chung (`@/components/common/*`) → Component UI shadcn (`@/components/ui/*`) → Thẻ HTML ngữ nghĩa (`<main>`, `<article>`, `<nav>`, `<header>`, `<footer>`).
2. **Carousel & Slider:**
   - Dùng Embla Carousel qua `@/components/ui/carousel.tsx`.
   - Tự động chạy phải tạm dừng khi hover chuột và tôn trọng tùy chọn `prefers-reduced-motion` của người dùng.
3. **Nội dung HTML phong phú từ CMS:**
   - Bắt buộc bọc qua component `<RichContent html={...} />` (`@/components/common/rich-content.tsx`).
   - Tuân thủ quy tắc CSS class `.content` (`src/styles/content.css`): ảnh `max-width: 100%`, bảng tự cuộn ngang khi quá rộng, iframe video tự co theo tỷ lệ 16:9.
4. **Format ngày & số:**
   - Format ngày dùng `formatDate()` từ `@/lib/format.ts` (chuẩn múi giờ `Asia/Ho_Chi_Minh`, định dạng `dd/MM/yyyy`).
   - Format tiền tệ dùng `Intl.NumberFormat('vi-VN')`.

---

## V. TYPES & CODE QUALITY

1. **Tuyệt đối cấm dùng `any` và `unknown` không kiểm tra:**
   - Mọi biến, props, hàm phải có type cụ thể.
   - Kiểu DTO / Schema lấy từ `@/lib/api/schema.d.ts` (sinh từ OpenAPI backend qua `npm run gen:api`).
2. **Cấm dùng `eslint-disable`:** Xử lý triệt để nguyên nhân gốc.
3. **Cấm đổi biến thừa thành `_x` để lách lint:** Xóa hẳn tham số thừa.
4. **JSX & Toán tử logic:**
   - Ưu tiên `Boolean(cond) && <Component />` thay vì `cond ? <Component /> : null`.
   - Với số đếm: Kiểm tra tường minh `count > 0` hoặc `Boolean(count)` để tránh render ra số `0`.
   - Tránh ternary lồng nhau: Dùng early return hoặc mapping object.
5. **Loại bỏ `console.log`:** Xóa sạch mọi log debug trước khi bàn giao.
6. **Ngôn ngữ:** Giao diện 100% tiếng Việt, đúng chính tả, đủ dấu.

---

## VI. FEATURE WORKFLOW PLAYBOOK

### Luồng I: Xây dựng Route / Trang mới
1. **I-0. Chuẩn bị:** Khảo sát API contract backend, các DTO trả về.
2. **I-1. Route:** Tạo thư mục route trong `src/app/(public)/<duong-dan>/page.tsx`.
3. **I-2. Fetching:** Đọc dữ liệu qua `apiGet()` trong Server Component kèm `tags`.
4. **I-3. UI & Component:** Tách các component hiển thị vào `src/components/<feature>/`. Dựng layout responsive mobile-first.
5. **I-4. SEO:** Viết hàm `generateMetadata()` cho route.
6. **I-5. Verify:** Chạy `npm run lint && npm run typecheck && npm run test && npm run build`.

### Luồng J: Sửa Route hiện có
1. **J-0. Định vị:** Tìm đúng file `page.tsx` hoặc component liên quan.
2. **J-1. Sửa phạm vi hẹp:** Sửa đúng logic được yêu cầu. Không làm thay đổi giao diện các trang khác.
3. **J-2. Verify:** Chạy lại toàn bộ kiểm tra build và test.

---

## VII. GỢI Ý COMMIT MESSAGE

Khi hoàn thành task, luôn gợi ý commit message theo định dạng:
```text
<type>(<module>): <mô tả ngắn>

- Gạch đầu dòng thay đổi UI (nếu có)
- Gạch đầu dòng thay đổi logic code / xử lý API
```
