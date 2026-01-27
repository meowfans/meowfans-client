import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@workspace/ui'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc'
      },
      {
        protocol: 'https',
        hostname: 'meowfans-media.sfo3.cdn.digitaloceanspaces.com'
      },
      {
        hostname: 'randomuser.me',
        protocol: 'https'
      }
    ]
  }
};

export default nextConfig;
