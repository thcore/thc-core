/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['source.boringavatars.com']
  },
  trailingSlash: true
};

module.exports = nextConfig;