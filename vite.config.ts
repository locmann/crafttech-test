import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: '/src/assets',
      data: '/src/data',
      features: '/src/features',
      hooks: '/src/hooks',
      services: '/src/services',
      utils: '/src/utils',
      components: '/src/components',
      types: '/src/types',
    },
  },
  base: 'crafttech-test',
});
