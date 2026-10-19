import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // File sinh tự động bởi `npm run gen:api`
    "src/lib/api/schema.d.ts",
  ]),
  {
    // Mã do shadcn sinh ra: không sửa tay, tắt rule React Compiler gây lỗi giả ở carousel.
    files: ["src/components/ui/**"],
    rules: { "react-hooks/set-state-in-effect": "off" },
  },
]);

export default eslintConfig;
