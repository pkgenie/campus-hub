/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
