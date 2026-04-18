import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
};

export default withSentryConfig(nextConfig, {
  // Sentry-specific options
  silent: true,
  org: "aic-pulse",
  project: "platform",
  // Skip source map upload if no auth token (e.g. Coolify builds without Sentry configured)
  disableSourceMapUpload: !process.env.SENTRY_AUTH_TOKEN,
});
