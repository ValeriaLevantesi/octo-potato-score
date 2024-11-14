import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,

  app: {
    baseURL: '/octo-potato-score/',
    buildAssetsDir: 'assets'
  },

  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],

  typescript: {
    typeCheck: false,
    strict: true
  },

  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }
  },

  compatibilityDate: '2024-11-14'
})