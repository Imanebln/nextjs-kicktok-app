/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,

  images: {
    domains: [
      "upload.wikimedia.org",
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "media.licdn.com",
    ],
  },
};

module.exports = nextConfig;
