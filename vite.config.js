import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: '13.200.17.183',
        changeOrigin: true,
        secure: false,
      }
    },
    fs: {
      allow: [
        '..',
        'd:/omkar-gdg-main/ml-project/node_modules/slick-carousel/slick'
      ],
    },
  },
});
