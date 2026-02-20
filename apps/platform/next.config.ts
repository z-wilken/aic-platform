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
});
