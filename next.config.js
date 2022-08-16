/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['picsum.photos', 'us.123rf.com', 'firebasestorage.googleapis.com', 'images.unsplash.com']
  },
  i18n
}

module.exports = nextConfig
