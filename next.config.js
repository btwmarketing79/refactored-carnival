/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/new-telegram-finder/' : '',
    images: {
      unoptimized: true,
    },
  };
  
  module.exports = nextConfig;