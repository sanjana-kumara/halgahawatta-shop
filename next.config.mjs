/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Build එකේදී එන පොඩි පොඩි errors ගණන් ගන්න එපා කියනවා
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;