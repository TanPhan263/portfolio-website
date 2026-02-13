import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true
  },
  images: {
    remotePatterns: [
      { hostname: 'pbs.twimg.com' },
      { hostname: 'yt3.googleusercontent.com' },
      { hostname: 'cdn.prod.website-files.com' },
      { hostname: 'assets.aceternity.com' },
      { hostname: 'images.unsplash.com' },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  }
};

export default nextConfig;
