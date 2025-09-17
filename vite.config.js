import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  server: {
    host: '0.0.0.0',
    port: 5000,
    hmr: true, // Change this line to false disable auto-refreshing.
    strictPort: true
  },
  preview: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true
  }
})
