import { defineConfig } from 'vite';

export default defineConfig({
  // 设置base为相对路径，确保在GitHub Pages等平台上正常工作
  base: './',
  build: {
    // 确保构建时资源能正确解析
    assetsDir: 'assets',
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
});
