import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/gestion-locative",
        destination: "/nos-services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
