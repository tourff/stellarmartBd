/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'], // যদি প্রোডাক্ট ইমেজের জন্য Cloudinary ব্যবহার করেন
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development'
          ? 'http://localhost:5000/api/:path*' // আপনার লোকাল ব্যাকএন্ড পোর্ট অনুযায়ী পরিবর্তন করুন
          : 'https://your-backend-url.vercel.app/api/:path*', // আপনার লাইভ ব্যাকএন্ড ইউআরএল এখানে দিন
      },
    ];
  },
};

module.exports = nextConfig;
