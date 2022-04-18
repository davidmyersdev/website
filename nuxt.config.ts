import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  buildModules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@voraciousdev/nuxt3-content',
    '@nuxtjs/tailwindcss',
  ],
  meta: {
    title: 'David Myers | voracious.dev',
    link: [
      {
        rel: 'icon', type: 'image/png', href: '/icon.png',
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
  router: {
    trailingSlash: false,
    options: {
      strict: true,
    },
  },
  ssr: true,
  target: 'static',
  vueuse: {
    ssrHandlers: true,
  },
})
