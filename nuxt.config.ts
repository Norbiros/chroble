// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt configuration
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-03-09',
  typescript: {
    typeCheck: true,
  },
  nitro: {
    experimental: {
      openAPI: true,
    },
  },

  // Misc
  css: ['~/assets/css/main.css'],

  // Modules list
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxthub/core',
    'nuxt-auth-utils',
    '@nuxtjs/seo',
  ],

  // Module related configuration
  eslint: {
    config: {
      standalone: false,
    },
  },

  devtools: { enabled: true },

  hub: {
    database: true,
  },

  site: {
    url: 'https://kingdomdle.nuxt.dev/',
    name: 'Kingdomdle',
    description: 'Zgaduj słowa związane z królestwem Bolesława Chrobrego i pokaż dominacje nad innymi uczniami 31 Liceum!',
    defaultLocale: 'pl',
  },
})
