/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // GitHub Pages සඳහා අවශ්‍යයි
  images: {
    unoptimized: true, // Static export නිසා Image Optimization අක්‍රීය කළ යුතුයි
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;