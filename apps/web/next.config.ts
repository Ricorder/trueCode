import type { NextConfig } from 'next';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: '/trpc/:path*',
				destination: 'http://localhost:8000/trpc/:path*',
			},
		];
	},
	output: 'standalone',
	outputFileTracingRoot: join(__dirname, '../../'),
	sassOptions: {
		silenceDeprecations: ['legacy-js-api'],
	},
	images: {
		remotePatterns: [
			new URL('https://picsum.photos/seed/**'),
			new URL('http://localhost:9001/photos/**'),
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '9000',
				pathname: '/photos/**',
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos',
				pathname: '/seed/**',
			},
			{
				protocol: 'https',
				hostname: 'loremflickr.com',
				pathname: '/250/**',
			},
			{
				protocol: 'https',
				hostname: 'source.unsplash.com',
				pathname: '/250x250/**',
			},
		],
	},
};

export default nextConfig;