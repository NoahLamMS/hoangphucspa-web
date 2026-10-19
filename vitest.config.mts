import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Không dùng @vitejs/plugin-react: gói này xung đột peer (@babel/core 7 do shadcn vs 8) khi cài không --force.
// Vite tự biên dịch TSX; khi cần test component, bật JSX automatic bằng `oxc: { jsx: { runtime: "automatic" } }`.
export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  oxc: { jsx: { runtime: "automatic" } },
  test: { environment: "jsdom", include: ["src/**/*.test.{ts,tsx}"] },
});
