/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config')
const { rewrites } = require('./rewrites-next.config')
const removeImports = require('next-remove-imports')()

const nextConfig = removeImports({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'lovepix.s3.eu-central-1.amazonaws.com',
      'picsum.photos',
      'us.123rf.com',
      'firebasestorage.googleapis.com',
      'images.unsplash.com',
      'img-19.commentcamarche.net',
      'lh3.googleusercontent.com',
    ],
  },
  i18n,
  output: 'standalone',
  env: {
    smartEmailingHost: '<smart-emailing-host>',
  },
  rewrites,
})

module.exports = nextConfig
