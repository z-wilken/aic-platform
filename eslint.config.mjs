import js from "@eslint/js";
import ts from "typescript-eslint";

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "react/no-unescaped-entities": "off",
      "no-restricted-imports": ["error", {
        "patterns": [
          {
            "group": ["apps/*/*", "!@/*"],
            "message": "Apps must not import from other apps. Use shared packages instead."
          },
          {
            "group": ["**/apps/*/**"],
            "message": "Direct imports from apps directory are forbidden."
          }
        ]
      }]
    },
  },
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "**/next-env.d.ts",
    ],
  },
];
