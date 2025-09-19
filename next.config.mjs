/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 设置基础路径，如果部署在子目录下可以取消注释并修改
  // basePath: '/your-subdirectory',
  // assetPrefix: '/your-subdirectory',
  
  // 确保所有路由都生成 HTML 文件
  distDir: 'out',
  
  // 禁用一些在静态导出时不兼容的功能
  experimental: {
    // 确保客户端路由正常工作
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
