import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet, noimageindex, nocache',
          },
          {
            key: 'Permissions-Policy',
            value: 'interest-cohort=()', // Blocks FLoC and similar tracking
          },
        ],
      },
    ];
  },
};

export default nextConfig;
