/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.weiyatrading.com',
      },
      {
        protocol: 'http',
        hostname: 'cms.weiyatrading.com',
      },
    ],
    domains: ['cms.weiyatrading.com'],
  },
}

export default nextConfig