import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {  //this is the proxy configuration, to avoid CORS issues
      '/api': {
        target: 'http://localhost:5000', // Replace with your backend server URL
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
