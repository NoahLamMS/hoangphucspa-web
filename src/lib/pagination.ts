export function pageWindow(current: number, total: number, size = 6): number[] {
  if (total <= 0) return [];
  const c = Math.min(Math.max(1, current), total);
  let start =
    total <= size || c <= size
      ? 1
      : c <= total - 2
        ? c - 2
        : c === total - 1
          ? c - 3
          : total - size + 1;
  start = Math.max(1, Math.min(start, total - size + 1));
  const end = Math.min(total, start + size - 1);
  return Array.from({ length: end - start + 1 }, (_, k) => start + k);
}

export const parsePage = (raw: string | undefined): number | null =>
  raw !== undefined && /^[1-9]\d{0,4}$/.test(raw) ? Number(raw) : null;
