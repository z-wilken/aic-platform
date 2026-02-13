import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Ignore legacy MVP logic
    "app/api/applications/**",
    "app/api/audit-logs/**",
    "app/api/auditors/**",
    "app/api/audits/**",
    "app/api/dashboard/**",
    "app/api/health/**",
    "app/api/invites/**",
    "app/api/leads/**",
    "app/api/notifications/**",
    "app/api/organizations/**",
    "app/api/requirements/**",
    "app/api/users/**",
    "app/applications/**",
    "app/audits/**",
    "app/leads/**",
    "app/organizations/**",
    "app/users/**",
    "app/verification/**",
    "lib/db.ts",
    "middleware.ts",
    // Default ignores:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
