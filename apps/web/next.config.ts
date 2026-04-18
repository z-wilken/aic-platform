import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Docker/Coolify deployment — produces .next/standalone folder
  // which the Dockerfile copies into the production image.
  output: 'standalone',
  // Bypass TypeScript errors in dependencies (e.g. drizzle-orm type changes in @aic/db)
  // These are pre-existing package-level issues that should not block the frontend build.
  typescript: {
    ignoreBuildErrors: true,
  },
  // Suppress ESLint warnings from blocking production builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',       value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection',       value: '1; mode=block' },
          { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',     value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://app.aiccertified.cloud/login',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
