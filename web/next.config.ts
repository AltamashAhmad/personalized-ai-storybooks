import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/book/:slug',
        destination: '/books/:slug',
        permanent: true,
      },
      {
        source: '/ar/book/:slug',
        destination: '/ar/books/:slug',
        permanent: true,
      },
      {
        source: '/books',
        destination: '/all-books',
        permanent: true,
      },
      {
        source: '/ar/books',
        destination: '/ar/all-books',
        permanent: true,
      },
      {
        source: '/ar/create/formats',
        destination: '/create/formats',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            // Permissive-but-present: 'unsafe-inline' is required by Next.js for
            // scripts/styles, 'unsafe-eval' keeps next dev HMR working. Tighten
            // once all third-party sources are inventoried.
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self'",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
