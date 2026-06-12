/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otimização de imagens do Supabase
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
