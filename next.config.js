/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "upload.wikimedia.org",
      "lh3.googleusercontent.com",
      "images.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
