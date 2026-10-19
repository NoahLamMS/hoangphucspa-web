import "server-only";
import { connection } from "next/server";
import type { components } from "./schema";
import type { CacheTag } from "./tags";

export type Schemas = components["schemas"];
const BASE = `${process.env.API_INTERNAL_URL ?? "http://localhost:5080"}/api/v1`;

type Options = { tags: CacheTag[]; revalidate?: number } | { noStore: true };

/** Đọc API ở server. Trả null khi 404; ném lỗi khi 5xx để error.tsx hiển thị. */
export async function apiGet<T>(path: string, options: Options): Promise<T | null> {
  await connection(); // render lúc có request; `next build` không bao giờ gọi API
  const init: RequestInit =
    "noStore" in options
      ? { cache: "no-store" }
      : { next: { tags: options.tags, revalidate: options.revalidate ?? 3600 } };
  const res = await fetch(BASE + path, { ...init, headers: { accept: "application/json" } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`);
  return (await res.json()) as T;
}
