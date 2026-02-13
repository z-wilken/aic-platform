import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "**/next-env.d.ts",
    ],
  },
  // Base configuration for all JS/TS files
  ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),
  
  // Next.js specific configuration for apps
  {
    files: ["apps/**/*.{ts,tsx}"],
    ...compat.extends("next/core-web-vitals", "next/typescript"),
  },

  // Library specific configuration for packages
  {
    files: ["packages/**/*.{ts,tsx}"],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },

  // Global rule overrides
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "react/no-unescaped-entities": "off",
    },
  },
];
