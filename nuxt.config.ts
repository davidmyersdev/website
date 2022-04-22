import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  buildModules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@voraciousdev/nuxt3-content',
    // '@nuxt/content-edge',
    '@nuxtjs/tailwindcss',
  ],
  content: {
    highlight: {
      preload: [
        'bash',
        'css',
        'html',
        'js',
        'json',
        'powershell',
        'ts',
      ],
      theme: 'material-palenight',
    },
  },
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
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: "I'm a full-stack web developer with a voracious appetite for knowledge, practice, and improvement.",
      }
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
