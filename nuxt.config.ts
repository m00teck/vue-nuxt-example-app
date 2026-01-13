import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  // Lock to current date for Nuxt 4 stability
  compatibilityDate: '2026-01-13',
  
  // Enforce Nuxt 4 directory patterns (app/, server/, etc.)
  future: {
    compatibilityVersion: 4,
  },

  modules: ['@pinia/nuxt'],

  vite: {
    plugins: [tailwindcss()]
  },

  css: ['~/assets/css/main.css'],

  // Optimization for Remote VM + Node 24
  nitro: {
    compressPublicAssets: true,
    minify: true
  },

  devServer: {
    host: '0.0.0.0', // Required for Docker access
    port: 3000
  },

  typescript: {
    strict: true,
    typeCheck: true
  }
})