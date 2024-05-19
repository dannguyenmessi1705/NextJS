/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vrnjplundvwdtwcwyzzr.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  output: "export", // Tạo ra các file HTML tĩnh cho mỗi route, với điều kiện tất cả các component đã là Static Site Rendering
};

export default nextConfig;
