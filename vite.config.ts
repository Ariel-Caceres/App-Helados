import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Ho`ysã',
        short_name: 'Ho`ysã',

        description: 'Mi aplicación React para manejo de negocio de venta de productos fríos',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192-v2.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512-v2.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })

  ],
})
