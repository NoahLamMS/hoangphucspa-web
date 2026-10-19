// next/font tải font lúc build và tự host. Đổi font thương hiệu = sửa file này (và src/styles/theme.css).
import { Be_Vietnam_Pro, Inter } from "next/font/google";

export const beVietnam = Be_Vietnam_Pro({
  weight: ["500", "700"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-heading-face",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body-face",
  display: "swap",
});
// Font nào không có subset 'vietnamese' thì next/font báo lỗi lúc build: bỏ subset đó và kiểm tra chữ có dấu.
