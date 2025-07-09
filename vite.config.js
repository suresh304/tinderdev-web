import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'




// No need to import tailwindcss separately here – handled via PostCSS
export default defineConfig({
  plugins: [react(),tailwindcss()],
})
