import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  meta: {
    title: 'David Myers | voracious.dev',
    link: [
      {
        rel: 'icon', type: 'image/png', href: '/nuxt.png',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'true',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap',
      },
    ],
  },
  buildModules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@voraciousdev/nuxt3-content',
    '@nuxtjs/tailwindcss',
  ],
  vueuse: {
    ssrHandlers: true,
  },
})
