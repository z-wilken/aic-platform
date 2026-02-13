import { defineConfig } from "eslint/config";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextTs,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
      "next-env.d.ts"
    ],
    rules: {
      "@next/next/no-html-link-for-pages": "off"
    }
  }
]);

export default eslintConfig;
