import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  nitro: {
    preset: process.env.VERCEL ? 'vercel' : 'node-server'
  },

  compatibilityDate: '2024-04-03',

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  ssr: true
})