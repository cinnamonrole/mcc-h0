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
  },
  // GitHub Pages configuration
  basePath: process.env.NODE_ENV === 'production' ? '/mcc-h0' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/mcc-h0/' : '',
  trailingSlash: true,
  output: 'export',
}

export default nextConfig