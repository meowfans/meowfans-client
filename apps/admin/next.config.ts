import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.arijit.xyz'
      },
      {
        protocol: 'https',
        hostname: 'media.meowfans.app'
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      },
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'meowfans-media.sfo3.cdn.digitaloceanspaces.com'
      }
    ]
  }
};

export default nextConfig;
