/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // পুরনো 'domains' এর বদলে আধুনিক 'remotePatterns' ব্যবহার করা হয়েছে
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development'
          ? 'http://localhost:5000/api/:path*' 
          : 'https://your-backend-url.vercel.app/api/:path*', // আপনার আসল ব্যাকএন্ড ইউআরএল এখানে দিন
      },
    ];
  },
};

module.exports = nextConfig;
