/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [new URL('https://i.scdn.co/image/**'), new URL("https://image-cdn-ak.spotifycdn.com/image/**"), new URL("https://mosaic.scdn.co/**")],
	}
};

export default nextConfig;
