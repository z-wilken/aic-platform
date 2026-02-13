import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Ignore legacy MVP logic
    "app/api/audit-logs/**",
    "app/api/billing/**",
    "app/api/corrections/**",
    "app/api/dashboard/**",
    "app/api/decisions/**",
    "app/api/empathy/**",
    "app/api/explain/**",
    "app/api/health/**",
    "app/api/incidents/**",
    "app/api/insurance/**",
    "app/api/keys/**",
    "app/api/leads/**",
    "app/api/models/**",
    "app/api/notifications/**",
    "app/api/organizations/**",
    "app/api/reports/**",
    "app/api/requirements/**",
    "app/api/settings/**",
    "app/api/upload/**",
    "app/api/users/**",
    "app/appeal/**",
    "app/audits/**",
    "app/certificate/**",
    "app/components/**",
    "app/forgot-password/**",
    "app/incidents/**",
    "app/onboard/**",
    "app/pulse/**",
    "app/reports/**",
    "app/reset-password/**",
    "app/roadmap/**",
    "app/settings/**",
    "app/verify-email/**",
    "lib/db.ts",
    "lib/engine-client.ts",
    "lib/errors.ts",
    "lib/immutability.ts",
    "lib/pdf-generator.ts",
    "lib/report-generator.ts",
    "__tests__/**",
    "tests/**",
    // Default ignores:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
