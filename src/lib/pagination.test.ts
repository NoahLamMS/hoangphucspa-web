import { describe, expect, it } from "vitest";
import { pageWindow, parsePage } from "./pagination";

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, k) => from + k);

describe("pageWindow", () => {
  it("trả về mọi trang khi tổng nhỏ hơn cửa sổ", () => {
    expect(pageWindow(1, 3)).toEqual([1, 2, 3]);
  });

  it("cửa sổ 6 nút ở đầu danh sách", () => {
    expect(pageWindow(1, 10)).toEqual(range(1, 6));
    expect(pageWindow(3, 20)).toEqual(range(1, 6));
  });

  it("cửa sổ trượt ở giữa", () => {
    expect(pageWindow(7, 20)).toEqual(range(5, 10));
  });

  it("cửa sổ cố định ở cuối danh sách", () => {
    expect(pageWindow(20, 20)).toEqual(range(15, 20));
  });

  it("trả về mảng rỗng khi không có trang", () => {
    expect(pageWindow(0, 0)).toEqual([]);
  });
});

describe("parsePage", () => {
  it("nhận số nguyên dương hợp lệ", () => {
    expect(parsePage("2")).toBe(2);
  });

  it("từ chối giá trị sai định dạng", () => {
    expect(parsePage("0")).toBeNull();
    expect(parsePage("01")).toBeNull();
    expect(parsePage("abc")).toBeNull();
    expect(parsePage(undefined)).toBeNull();
  });
});
