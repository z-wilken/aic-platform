import { defineConfig } from "eslint/config";

const eslintConfig = defineConfig([
  {
    ignores: [
      "apps/**",
      "packages/**",
      "node_modules/**",
      ".next/**",
      "dist/**"
    ]
  }
]);

export default eslintConfig;
