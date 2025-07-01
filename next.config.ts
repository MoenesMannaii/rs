import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Not officially supported as a wildcard for all hosts!
      },
      { protocol: 'https', hostname: 'images.pexels.com' },
  { protocol: 'https', hostname: 'cdn.example.com' },
    ],
  },
};

export default nextConfig;
