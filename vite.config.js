import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    allowedHosts: [
      'beb1-115-98-236-35.ngrok-free.app' // 👈 Add your current ngrok hostname here
    ]
  }
})
