/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // In production, API calls go to the same domain (Vercel handles routing)
  // In development, proxy to localhost:8000
  async rewrites() {
    // If we're in production (Vercel), don't rewrite - use same domain
    if (process.env.VERCEL) {
      return [];
    }
    // In development, proxy to local backend
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
