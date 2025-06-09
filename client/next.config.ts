import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "s.gravatar.com",
      "cdn.auth0.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};


export default nextConfig;

