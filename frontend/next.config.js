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


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "hashlab-sro",
    project: "lovepix",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
