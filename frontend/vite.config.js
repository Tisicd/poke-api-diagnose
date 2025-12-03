import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'subarchesporial-penni-creationary.ngrok-free.dev',
      '.ngrok-free.dev',  // Permite cualquier subdominio de ngrok
      '.ngrok.io',        // Permite también dominios .ngrok.io
    ]
  }
})

