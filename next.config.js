/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    BASE_API: process.env.API_BASE_URL,
    CC_API_KEY: process.env.CC_API_KEY,
    BSC_MAINNET: process.env.BSC_MAINNET,
    ETH_MAINNET: process.env.ETH_MAINNET,
    GLMR_MAINNET: process.env.GLMR_MAINNET,
    NFT_SCAN_API_KEY: process.env.NFT_SCAN_API_KEY,
  },
  images: {
    domains: ['nic4ji-ehkcedkbcgkhcxx.shoppynext.com', 'logo.nftscan.com', 'lh3.googleusercontent.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}
