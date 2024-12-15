import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
			{
				protocol: 'https',
				hostname: "deploy-pos-elolimpo-nestjs.onrender.com",
			},
		],
	},
};

export default nextConfig;
