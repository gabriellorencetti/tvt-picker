/* eslint-disable no-undef */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'artworks.thetvdb.com'
      }
    ]
  }
};

module.exports = nextConfig;
