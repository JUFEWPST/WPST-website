import { defineConfig } from 'vite';

export default defineConfig({
  // 设置base为相对路径，确保在GitHub Pages等平台上正常工作
  base: './',
  server: {
    port: 3000,
    open: true
  },
  build: {
    // 确保构建时资源能正确解析
    assetsDir: 'assets',
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        team: 'team.html',
        directions: 'directions.html',
        honors: 'honors.html',
        services: 'services.html',
        members: 'members.html'
      }
    }
  }
});
