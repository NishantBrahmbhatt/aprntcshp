import type { NextConfig } from "next";

/** Featurebase + app needs; script-src includes Vercel Analytics (dev script host). */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://do.featurebase.app https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://do.featurebase.app",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://*.featurebase.app wss://*.featurebase.app",
  "frame-src https://*.featurebase.app",
  "media-src https://*.featurebase.app https://*.featurebase-attachments.com",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Content-Security-Policy",
            value: CONTENT_SECURITY_POLICY,
          },
        ],
      },
    ];
  },
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
