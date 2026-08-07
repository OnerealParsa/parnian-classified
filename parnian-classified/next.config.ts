import type { NextConfig } from 'next';

const repo = process.env.NEXT_PUBLIC_BASE_PATH || process.env.GITHUB_REPOSITORY?.split('/')[1] || 'parnian-classified';
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? `/${repo}` : '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
