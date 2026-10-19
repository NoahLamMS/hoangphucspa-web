import type { Metadata } from "next";
import { connection } from "next/server";
import { DEFAULT_SITE_NAME } from "@/lib/brand";
import { beVietnam, inter } from "./fonts";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  await connection(); // đọc biến môi trường lúc chạy, không đóng băng lúc build
  return {
    metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"), // canonical/OG tương đối → tuyệt đối
    title: { default: DEFAULT_SITE_NAME, template: `%s | ${DEFAULT_SITE_NAME}` },
    icons: { icon: "/favicon.svg" },
    // Mặc định noindex; chỉ index khi ALLOW_INDEXING=true (chưa chọn domain: luôn noindex).
    robots: process.env.ALLOW_INDEXING === "true" ? undefined : { index: false, follow: false },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${beVietnam.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
