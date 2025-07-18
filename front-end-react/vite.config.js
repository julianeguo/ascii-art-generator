import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

const repoName = 'ascii-art-generator';

// https://vite.dev/config/
export default defineConfig({
  base: `/${repoName}/`, 
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      },
    }
  }
})

console.log("✅ Vite config loaded!");