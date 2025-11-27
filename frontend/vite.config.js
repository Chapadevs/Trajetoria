import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Use '/' for custom domain, '/Trajetoria/' for GitHub Pages subpath
// Set VITE_BASE_PATH env var to override (e.g., '/' for custom domain)
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/Trajetoria/' : '/'),
})

