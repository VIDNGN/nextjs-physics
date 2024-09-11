/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "if1tbag1lwvcswcj.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
