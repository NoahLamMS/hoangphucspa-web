// Chỉ API gọi được (reverse proxy chặn /internal/* từ Internet)
import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { TAGS } from "@/lib/api/tags";

const ALLOWED = new Set<string>(Object.values(TAGS));

function sameSecret(given: string | null, expected: string | undefined): boolean {
  if (!given || !expected) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b); // so sánh thời gian cố định
}

export async function POST(req: Request) {
  if (!sameSecret(req.headers.get("x-revalidate-secret"), process.env.REVALIDATE_SECRET)) {
    return new Response(null, { status: 404 }); // không để lộ endpoint tồn tại
  }
  const body = (await req.json().catch(() => null)) as { tags?: unknown } | null;
  const tags = Array.isArray(body?.tags)
    ? body.tags.filter((t): t is string => typeof t === "string" && ALLOWED.has(t))
    : [];
  for (const tag of tags) revalidateTag(tag, { expire: 0 }); // hết hạn ngay: request kế tiếp lấy dữ liệu mới
  return Response.json({ revalidated: tags });
}
