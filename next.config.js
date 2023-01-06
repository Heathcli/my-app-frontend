/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
module.exports = withLess({})
