import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    "app/api/**",
    "app/about/**",
    "app/alpha/**",
    "app/assessment/**",
    "app/badge/**",
    "app/bounty/**",
    "app/business/**",
    "app/citizens/**",
    "app/components/**",
    "app/contact/**",
    "app/data/**",
    "app/docs/**",
    "app/faq/**",
    "app/hooks/**",
    "app/login/**",
    "app/process/**",
    "app/registry/**",
    "app/report/**",
    "app/resources/**",
    "app/tiers/**",
    "app/verify/**",
    "lib/**",
    "middleware.ts",
    "__tests__/**",
    // Default ignores:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
