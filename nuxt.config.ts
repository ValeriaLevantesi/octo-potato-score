import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: '/octo-potato-score/',
    buildAssetsDir: 'assets'
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss']
})