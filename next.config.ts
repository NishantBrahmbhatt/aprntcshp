import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/cv-resources",
        destination: "/resources",
        permanent: true,
      },
      {
        source: "/cv-resources/",
        destination: "/resources",
        permanent: true,
      },
    ];
  },
  env: {
    NEXT_PUBLIC_LAST_UPDATED: new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  },
};

export default nextConfig;
