/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'assets.aceternity.com',
            port: '',
            // pathname: '/templates/**',
          },
        ],
      },
};

export default nextConfig;
