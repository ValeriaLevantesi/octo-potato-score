import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap'
        }
      ]
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      tailwindcss: {
        cssPath: '~/assets/css/main.css',
        configPath: 'tailwind.config.ts',
      }
    }
  },

  typescript: {
    typeCheck: true,
    shim: false,
    strict: true
  },

  plugins: [
    {
      src: '~/plugins/state',
      mode: 'client'
    }
  ],

  compatibilityDate: '2024-11-13',

  nitro: {
    preset: 'vercel'
  }
})