import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
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
